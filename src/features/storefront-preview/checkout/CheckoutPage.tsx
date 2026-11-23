import { type FormEvent, type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStyles from "@mui/material/GlobalStyles";
import ArrowForward from "@mui/icons-material/ArrowForward";
import LockOutlined from "@mui/icons-material/LockOutlined";
import HeadphoneImage from "../HeadphoneImage";
import type { Cutout } from "../catalogueMedia";
import { useAuth } from "../auth/AuthContext";
import { formatPrice } from "../products";
import { paths } from "../routes";
import { Spinner } from "../ui/Loading";
import { checkoutStyles } from "./checkout.styles";
import { type DeliveryId, type Order, deliveries, deliveryPrice } from "./orderDetails";
import { TEST_CARD, goToPayment } from "./payment";

interface Product {
  id: string;
  name: string;
  finishName: string;
  price: number;
  image: Cutout;
}
export interface Bag {
  items: { product: Product; quantity: number }[];
  count: number;
  total: number;
  loading: boolean;
  checkout: (delivery: DeliveryId) => Promise<Order>;
}
interface Auth {
  user: { id: number; email: string } | null | undefined;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signInToDemo: () => Promise<void>;
}

const returnHere = `${paths.signUp}?return=${encodeURIComponent(paths.checkout)}`;

// Email first, then the password, as in most checkouts. Forgetting a password
// keeps the visitor here, with the demo one click away.
function CheckoutSignIn() {
  const { signIn, signInToDemo } = useAuth() as Auth;
  const [email, setEmail] = useState("");
  const [askPassword, setAskPassword] = useState(false);
  const [message, setMessage] = useState("");
  // Which way of signing in is working: "password", "demo" or none.
  const [busy, setBusy] = useState("");

  async function attempt(way: string, work: () => Promise<void>) {
    setBusy(way);
    setMessage("");
    try {
      await work();
    } catch (error) {
      setMessage((error as Error).message);
      setBusy("");
    }
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!askPassword) return setAskPassword(true);
    const password = (event.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
    attempt("password", () => signIn({ email, password }));
  }

  return (
    <div className="cp-signin">
      <h1 id="checkout-title" tabIndex={-1}>Sign in for faster checkout.</h1>
      <div className="cp-signin-columns">
        <div className="cp-signin-account">
          <h2>Check out with your RESONANCE account</h2>
          <form onSubmit={submit} aria-label="Sign in to check out">
            <div className="cp-field">
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email address"
                aria-label="Email address"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {!askPassword && (
                <button type="submit" aria-label="Continue"><ArrowForward /></button>
              )}
            </div>
            {askPassword && (
              <div className="cp-field">
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  aria-label="Password"
                  required
                  autoFocus
                />
                <button type="submit" aria-label="Sign in" disabled={Boolean(busy)} aria-busy={busy === "password"}>
                  {busy === "password" ? <Spinner /> : <ArrowForward />}
                </button>
              </div>
            )}
          </form>
          <button
            type="button"
            className="cp-link"
            onClick={() => setMessage("Password recovery is not available yet. Try the demo to check out now.")}
          >
            Forgot password?
          </button>
          <a className="cp-link" href={returnHere}>Create an account</a>
          <p className="cp-message" role="status">{message}</p>
        </div>
        <div className="cp-signin-demo">
          <h2>Try the demo</h2>
          <p>Check out with an account made just for you. No email or password needed.</p>
          <button
            type="button"
            className="cp-primary"
            disabled={Boolean(busy)}
            aria-busy={busy === "demo"}
            onClick={() => attempt("demo", signInToDemo)}
          >
            {busy === "demo" && <Spinner />}
            Continue with the demo
          </button>
        </div>
      </div>
    </div>
  );
}

function Option(props: {
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
  title: string;
  detail: string;
  aside?: string;
}) {
  return (
    <label className="cp-option">
      <input
        type="radio"
        name={props.name}
        value={props.value}
        checked={props.checked}
        disabled={props.disabled}
        onChange={props.onChange ?? (() => {})}
      />
      <span>
        <strong>{props.title}</strong>
        <span>{props.detail}</span>
      </span>
      {props.aside && <span className="cp-option-aside">{props.aside}</span>}
    </label>
  );
}

function Summary({ bag, deliveryOre, children }: { bag: Bag; deliveryOre: number; children: ReactNode }) {
  return (
    <aside className="cp-summary" aria-label="Order summary">
      <h2>Order summary</h2>
      <ul>
        {bag.items.map(({ product, quantity }) => (
          <li key={product.id}>
            <span className="cp-thumb"><HeadphoneImage image={product.image} decorative /></span>
            <span className="cp-line">
              <strong>{product.name}</strong>
              <span>{product.finishName} · Qty {quantity}</span>
            </span>
            <span>{formatPrice(product.price * quantity)}</span>
          </li>
        ))}
      </ul>
      <dl>
        <div><dt>Subtotal</dt><dd>{formatPrice(bag.total)}</dd></div>
        <div><dt>Delivery</dt><dd>{deliveryPrice(deliveryOre, formatPrice)}</dd></div>
        <div className="cp-total"><dt>Total</dt><dd>{formatPrice(bag.total + deliveryOre / 100)}</dd></div>
      </dl>
      {children}
    </aside>
  );
}

function CheckoutForm({ bag, placing, setPlacing }: { bag: Bag; placing: boolean; setPlacing: (value: boolean) => void }) {
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState<DeliveryId>("standard");
  const [error, setError] = useState("");

  async function place() {
    setPlacing(true);
    setError("");
    try {
      const order = await bag.checkout(delivery);
      if (order.checkout_url) goToPayment(order.checkout_url);
      else navigate(paths.order(order.id));
    } catch (failure) {
      setError((failure as Error).message);
      setPlacing(false);
    }
  }

  return (
    <div className="cp-checkout">
      <h1 id="checkout-title" tabIndex={-1}>Checkout.</h1>
      <div className="cp-checkout-columns">
        <div className="cp-steps">
          <section aria-labelledby="checkout-delivery">
            <h2 id="checkout-delivery"><span>1</span>Where should we send it?</h2>
            <div className="cp-address">
              <strong>Demo Visitor</strong>
              <span>Storgatan 1</span>
              <span>111 22 Stockholm</span>
            </div>
            {(Object.keys(deliveries) as DeliveryId[]).map((id) => (
              <Option
                key={id}
                name="delivery"
                value={id}
                checked={delivery === id}
                onChange={() => setDelivery(id)}
                title={deliveries[id].title}
                detail={deliveries[id].detail}
                aside={deliveryPrice(deliveries[id].priceOre, formatPrice)}
              />
            ))}
          </section>
          <section aria-labelledby="checkout-payment">
            <h2 id="checkout-payment"><span>2</span>How would you like to pay?</h2>
            <Option
              name="payment"
              value="card"
              checked
              title="Card, with Stripe"
              detail="You pay on Stripe's secure page. Card details never reach this site."
            />
            <p className="cp-test-card">
              Stripe runs in test mode, so no real card is charged. Pay with the test card{" "}
              <strong>{TEST_CARD}</strong>, any future expiry date and any CVC.
            </p>
          </section>
        </div>
        <Summary bag={bag} deliveryOre={deliveries[delivery].priceOre}>
          <button type="button" className="cp-primary cp-wide" disabled={placing} aria-busy={placing} onClick={place}>
            {placing && <Spinner />}
            Continue to payment
          </button>
          {error && <p role="alert">{error}</p>}
          <p className="cp-note"><LockOutlined /> Secure payment with Stripe in test mode.</p>
        </Summary>
      </div>
    </div>
  );
}

export default function CheckoutPage({ bag }: { bag: Bag }) {
  const { user } = useAuth() as Auth;
  const ready = user !== undefined && !bag.loading;
  // Placing an order empties the bag a moment before the order page opens.
  const [placing, setPlacing] = useState(false);
  const root = useRef<HTMLElement>(null);
  const signedIn = Boolean(user);
  useLayoutEffect(() => {
    if (!ready) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    root.current?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
  }, [ready, signedIn]);

  return (
    <section className="cp" aria-labelledby="checkout-title" ref={root}>
      <GlobalStyles styles={checkoutStyles} />
      {!ready ? null : bag.count === 0 && !placing ? (
        <div className="cp-empty">
          <h1 id="checkout-title" tabIndex={-1}>Your bag is empty.</h1>
          <p>Add something you love, then check out here.</p>
          <a className="cp-primary" href={paths.store}>Explore headphones</a>
        </div>
      ) : user ? (
        <CheckoutForm bag={bag} placing={placing} setPlacing={setPlacing} />
      ) : (
        <CheckoutSignIn />
      )}
    </section>
  );
}
