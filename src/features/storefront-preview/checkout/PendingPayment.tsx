import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import GlobalStyles from "@mui/material/GlobalStyles";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { formatPrice } from "../products";
import { paths } from "../routes";
import { checkoutStyles } from "./checkout.styles";
import { type Order, orderNumber } from "./orderDetails";
import { goToPayment } from "./payment";
import { Spinner } from "../ui/Loading";

// The signed-in visitor's order that waits for payment, if there is one.
export function usePendingOrder() {
  const { user } = useAuth() as { user: { id: number } | null | undefined };
  const orders = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => api<Order[]>("GET", "/orders"),
    enabled: Boolean(user),
  });
  return orders.data?.find((order) => order.status === "pending");
}

// The two ways on from an order that waits for payment: back to Stripe's page,
// or cancel it. The bag keeps every item either way.
export function PaymentActions({ orderId }: { orderId: number }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Which button is working: "resume", "cancel" or none.
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  async function run(action: string, work: () => Promise<void>) {
    setBusy(action);
    setError("");
    try {
      await work();
    } catch (failure) {
      setError((failure as Error).message);
      setBusy("");
    }
  }
  const resume = () =>
    run("resume", async () => {
      const { checkout_url: url } = await api<{ checkout_url: string }>(
        "POST",
        `/orders/${orderId}/payment`,
      );
      goToPayment(url);
    });
  const cancel = () =>
    run("cancel", async () => {
      await api("POST", `/orders/${orderId}/cancel`);
      await Promise.all(
        ["cart", "orders", "order", "catalogue"].map((key) =>
          queryClient.invalidateQueries({ queryKey: [key] }),
        ),
      );
      navigate(paths.bag);
    });

  return (
    <>
      <div className="cp-payment-actions">
        <button type="button" className="cp-primary" disabled={Boolean(busy)} aria-busy={busy === "resume"} onClick={resume}>
          {busy === "resume" && <Spinner />}
          Continue to payment
        </button>
        <button type="button" className="cp-secondary" disabled={Boolean(busy)} aria-busy={busy === "cancel"} onClick={cancel}>
          {busy === "cancel" && <Spinner />}
          Cancel payment
        </button>
      </div>
      <p className="cp-payment-hint">
        Cancelling keeps everything in your bag, where you can change it.
      </p>
      {error && <p role="alert">{error}</p>}
    </>
  );
}

// Shown in the bag while its payment is open on Stripe. The bag itself lists
// the items, so this only says what waits and how to go on.
export function WaitingPayment({ order }: { order: Order }) {
  return (
    <aside className="cp cp-waiting" aria-labelledby="waiting-title">
      <GlobalStyles styles={checkoutStyles} />
      <h2 id="waiting-title">Your payment is waiting.</h2>
      <p>
        <a href={paths.order(order.id)}>{orderNumber(order.id)}</a> ·{" "}
        {formatPrice(order.total_ore / 100)}. Your items stay reserved for 30
        minutes. Changing the bag closes this payment.
      </p>
      <PaymentActions orderId={order.id} />
    </aside>
  );
}
