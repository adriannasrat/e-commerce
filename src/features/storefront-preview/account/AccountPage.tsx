import { useLayoutEffect, useRef, useState } from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import ChevronRight from "@mui/icons-material/ChevronRight";
import HeadphoneImage from "../HeadphoneImage";
import type { Cutout } from "../catalogueMedia";
import { useAuth } from "../auth/AuthContext";
import { checkoutStyles } from "../checkout/checkout.styles";
import { type Order, formatDate, orderNumber, statusLabel } from "../checkout/orderDetails";
import { useOrders } from "../checkout/useOrders";
import { formatPrice, products } from "../products";
import { paths, withReturn } from "../routes";
import { Spinner } from "../ui/Loading";
import { accountStyles } from "./account.styles";

interface Auth {
  user: { id: number; email: string } | null | undefined;
  signOut: () => Promise<void>;
}
interface CatalogueProduct {
  apiId: number;
  image: Cutout;
}

// Demo accounts are made for one visit and removed when the visitor signs out.
const isDemo = (email: string) => /^demo-[a-f0-9]+@resonance\.test$/.test(email);

function OrderSummary({ order }: { order: Order }) {
  const count = order.items.reduce((sum, item) => sum + item.amount, 0);
  const pictures = order.items
    .map((item) => (products as CatalogueProduct[]).find(({ apiId }) => apiId === item.product_id))
    .filter((product): product is CatalogueProduct => Boolean(product))
    .slice(0, 3);
  return (
    <a className="ac-order" href={paths.order(order.id)}>
      <span className="ac-order-head">
        <strong>{orderNumber(order.id)}</strong>
        <span>{formatDate(new Date(order.placed_at))}</span>
        <span className="cp-status" data-status={order.status}>
          {statusLabel[order.status]}
        </span>
      </span>
      <span className="ac-order-body">
        <span className="ac-order-thumbs" aria-hidden="true">
          {pictures.map((product) => (
            <span className="cp-thumb" key={product.apiId}>
              <HeadphoneImage image={product.image} decorative />
            </span>
          ))}
        </span>
        <span className="ac-order-items">
          {order.items.map((item) => item.title).join(", ")}
          <span>
            {count} {count === 1 ? "item" : "items"} · {formatPrice(order.total_ore / 100)}
          </span>
        </span>
        <ChevronRight className="ac-order-arrow" aria-hidden="true" />
      </span>
    </a>
  );
}

function OrderHistory() {
  const orders = useOrders();
  if (orders.isPending) {
    return (
      <p className="ac-note" role="status">
        <Spinner />
        Loading your orders…
      </p>
    );
  }
  if (orders.isError) {
    return (
      <div className="ac-note" role="alert">
        <p>We could not load your orders.</p>
        <button type="button" className="cp-secondary" onClick={() => orders.refetch()}>
          Try again
        </button>
      </div>
    );
  }
  if (!orders.data.length) {
    return (
      <div className="ac-note">
        <p>No orders yet. When you check out, your orders appear here.</p>
        <a className="cp-primary" href={paths.store}>
          Explore headphones
        </a>
      </div>
    );
  }
  return (
    <ol className="ac-orders" aria-label="Your orders, newest first">
      {orders.data.map((order) => (
        <li key={order.id}>
          <OrderSummary order={order} />
        </li>
      ))}
    </ol>
  );
}

// The signed-in visitor's details and every order they have placed, newest
// first, each leading to its own order page.
export default function AccountPage() {
  const { user, signOut } = useAuth() as Auth;
  const [message, setMessage] = useState("");
  const root = useRef<HTMLElement>(null);
  const ready = user !== undefined;
  useLayoutEffect(() => {
    if (!ready) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    root.current?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
  }, [ready, user?.id]);

  return (
    <section className="cp ac" aria-labelledby="account-title" ref={root}>
      <GlobalStyles styles={checkoutStyles} />
      <GlobalStyles styles={accountStyles} />
      {!ready ? null : user ? (
        <>
          <header className="ac-header">
            <h1 id="account-title" tabIndex={-1}>
              Your account.
            </h1>
            <p>
              Signed in as <strong>{user.email}</strong>
            </p>
            {isDemo(user.email) && (
              <p className="ac-demo">
                This is a demo account. Signing out removes it with its bag and orders.
              </p>
            )}
            <button
              type="button"
              className="cp-secondary"
              onClick={() => signOut().catch((error: Error) => setMessage(error.message))}
            >
              Sign out
            </button>
            {message && <p role="alert">{message}</p>}
          </header>
          <section aria-labelledby="orders-title">
            <h2 id="orders-title">Orders</h2>
            <OrderHistory />
          </section>
        </>
      ) : (
        <div className="cp-empty">
          <h1 id="account-title" tabIndex={-1}>
            Sign in to see your account.
          </h1>
          <p>Your orders and details are kept here.</p>
          <a className="cp-primary" href={withReturn(paths.signIn, paths.account)}>
            Sign in
          </a>
        </div>
      )}
    </section>
  );
}
