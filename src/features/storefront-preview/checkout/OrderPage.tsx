import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import GlobalStyles from "@mui/material/GlobalStyles";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import HeadphoneImage from "../HeadphoneImage";
import type { Cutout } from "../catalogueMedia";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { formatPrice, products } from "../products";
import { paths } from "../routes";
import { checkoutStyles } from "./checkout.styles";
import { PaymentActions } from "./PendingPayment";
import {
  type Order,
  arrival,
  deliveries,
  deliveryPrice,
  formatDate,
  orderNumber,
  orderStages,
} from "./orderDetails";

interface CatalogueProduct {
  apiId: number;
  finishName: string;
  image: Cutout;
}

const statusLabel = {
  pending: "Awaiting payment",
  paid: "Paid",
  cancelled: "Cancelled",
};

// What the page says at each step. A visitor back from Stripe waits a moment
// for its confirmation, which arrives separately through the webhook.
function headline(order: Order, returnedFromStripe: boolean) {
  if (order.status === "paid") return ["Your order is placed.", ""];
  if (order.status === "cancelled") {
    return [
      "This order was cancelled.",
      "The payment was cancelled or not completed in time, so nothing was charged.",
    ];
  }
  return returnedFromStripe
    ? [
        "Confirming your payment.",
        "This takes a few seconds. The page updates by itself.",
      ]
    : [
        "Complete your payment.",
        "Your items are reserved for 30 minutes while you pay.",
      ];
}

function OrderDetails({
  order,
  returnedFromStripe,
}: {
  order: Order;
  returnedFromStripe: boolean;
}) {
  const placedAt = new Date(order.placed_at);
  const delivery = deliveries[order.delivery];
  const [title, detail] = headline(order, returnedFromStripe);
  return (
    <div className="cp-placed">
      <h1 id="order-title" tabIndex={-1}>
        {title}
      </h1>
      <p className="cp-placed-lead" aria-live="polite">
        Order <strong>{orderNumber(order.id)}</strong> · {formatDate(placedAt)}
        {detail && (
          <>
            <br />
            {detail}
          </>
        )}
      </p>
      {order.status !== "cancelled" && (
        <ol className="cp-progress" aria-label="Order progress">
          {orderStages(order.status).map(({ label, done }) => (
            <li key={label} data-done={done}>
              <span className="cp-dot" />
              {label}
              {done && <span className="preview-sr-only"> (done)</span>}
            </li>
          ))}
        </ol>
      )}
      <div className="cp-placed-card">
        <div className="cp-placed-delivery">
          <LocalShippingOutlined />
          <span>
            <strong>Arrives {arrival(placedAt, order.delivery)}</strong>
            <span>{delivery.title} to Storgatan 1, Stockholm</span>
          </span>
          <span className="cp-status">{statusLabel[order.status]}</span>
        </div>
        <ul>
          {order.items.map((item) => {
            const product = (products as CatalogueProduct[]).find(
              ({ apiId }) => apiId === item.product_id,
            );
            return (
              <li key={item.product_id}>
                <span className="cp-thumb cp-thumb--large">
                  {product && (
                    <HeadphoneImage image={product.image} decorative />
                  )}
                </span>
                <span className="cp-line">
                  <strong>{item.title}</strong>
                  <span>
                    {product ? `${product.finishName} · ` : ""}Qty {item.amount}
                  </span>
                </span>
                <span>
                  {formatPrice((item.unit_price_ore * item.amount) / 100)}
                </span>
              </li>
            );
          })}
        </ul>
        <dl>
          <div>
            <dt>Delivery</dt>
            <dd>{deliveryPrice(order.delivery_ore, formatPrice)}</dd>
          </div>
          <div className="cp-total">
            <dt>Total</dt>
            <dd>{formatPrice(order.total_ore / 100)}</dd>
          </div>
        </dl>
      </div>
      {order.status === "pending" && !returnedFromStripe ? (
        <div className="cp-placed-payment">
          <PaymentActions orderId={order.id} />
        </div>
      ) : (
        <div className="cp-placed-actions">
          <a className="cp-primary" href={paths.store}>
            Continue shopping
          </a>
        </div>
      )}
      <p className="cp-note">
        Payments run through Stripe in test mode. No real card is charged and
        nothing is shipped.
      </p>
    </div>
  );
}

function Message({
  title,
  detail,
  href,
  action,
}: {
  title: string;
  detail: string;
  href: string;
  action: string;
}) {
  return (
    <div className="cp-empty">
      <h1 id="order-title" tabIndex={-1}>
        {title}
      </h1>
      <p>{detail}</p>
      <a className="cp-primary" href={href}>
        {action}
      </a>
    </div>
  );
}

export default function OrderPage({ id }: { id: string }) {
  const { user } = useAuth() as { user: { id: number } | null | undefined };
  const order = useQuery({
    queryKey: ["order", user?.id, id],
    queryFn: () => api<Order>("GET", `/orders/${encodeURIComponent(id)}`),
    enabled: Boolean(user),
    retry: false,
    // Until Stripe confirms or the hold expires, the order is checked again.
    refetchInterval: (query) =>
      query.state.data?.status === "pending" ? 2000 : false,
  });
  const returnedFromStripe =
    new URLSearchParams(useLocation().search).get("payment") === "done";
  const root = useRef<HTMLElement>(null);
  const shown = user === null || order.isSuccess || order.isError;
  useLayoutEffect(() => {
    if (!shown) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    root.current
      ?.querySelector<HTMLElement>("h1")
      ?.focus({ preventScroll: true });
  }, [shown]);

  const signIn = `${paths.signIn}?return=${encodeURIComponent(paths.order(id))}`;
  return (
    <section className="cp" aria-labelledby="order-title" ref={root}>
      <GlobalStyles styles={checkoutStyles} />
      {user === null ? (
        <Message
          title="Sign in to see this order."
          detail="Orders are only shown to the account that placed them."
          href={signIn}
          action="Sign in"
        />
      ) : order.isSuccess ? (
        <OrderDetails
          order={order.data}
          returnedFromStripe={returnedFromStripe}
        />
      ) : order.isError ? (
        <Message
          title="Order not found."
          detail="This order does not exist, or belongs to another account."
          href={paths.store}
          action="Back to the collection"
        />
      ) : null}
    </section>
  );
}
