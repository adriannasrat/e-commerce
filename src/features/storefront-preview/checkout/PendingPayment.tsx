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
// or cancel it, which puts every item back in the bag to change.
export function PaymentActions({ orderId }: { orderId: number }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function run(work: () => Promise<void>) {
    setBusy(true);
    setError("");
    try {
      await work();
    } catch (failure) {
      setError((failure as Error).message);
      setBusy(false);
    }
  }
  const resume = () =>
    run(async () => {
      const { checkout_url: url } = await api<{ checkout_url: string }>(
        "POST",
        `/orders/${orderId}/payment`,
      );
      goToPayment(url);
    });
  const cancel = () =>
    run(async () => {
      await api("POST", `/orders/${orderId}/cancel`);
      await Promise.all(
        ["cart", "orders", "order"].map((key) =>
          queryClient.invalidateQueries({ queryKey: [key] }),
        ),
      );
      navigate(paths.bag);
    });

  return (
    <>
      <div className="cp-payment-actions">
        <button type="button" className="cp-primary" disabled={busy} onClick={resume}>
          Continue to payment
        </button>
        <button type="button" className="cp-secondary" disabled={busy} onClick={cancel}>
          Cancel payment
        </button>
      </div>
      <p className="cp-payment-hint">
        Cancelling puts everything back in your bag, where you can change it.
      </p>
      {error && <p role="alert">{error}</p>}
    </>
  );
}

// Shown on the bag and checkout pages while an order waits for payment, so
// leaving Stripe's page never makes the items seem to disappear.
export function WaitingPayment({ order }: { order: Order }) {
  const count = order.items.reduce((sum, item) => sum + item.amount, 0);
  return (
    <aside className="cp cp-waiting" aria-labelledby="waiting-title">
      <GlobalStyles styles={checkoutStyles} />
      <h2 id="waiting-title">Your order is waiting for payment.</h2>
      <p>
        <a href={paths.order(order.id)}>{orderNumber(order.id)}</a> ·{" "}
        {count} {count === 1 ? "item" : "items"} ·{" "}
        {formatPrice(order.total_ore / 100)}. The items stay reserved for 30
        minutes.
      </p>
      <PaymentActions orderId={order.id} />
    </aside>
  );
}
