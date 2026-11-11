import StorefrontDialog from "../StorefrontDialog";
import { useLayoutEffect, useRef, useState } from "react";
import { DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HeadphoneImage from "../HeadphoneImage";
import { productHref } from "../usePreviewRoute";
import { formatPrice } from "../products";
import { MAX_QUANTITY } from "./bagState";

import BagDiscovery from "./BagDiscovery";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { paths } from "../routes";

function CheckoutActions({ onSelect }) {
  return (
    <div className="bag-checkout-actions">
      <button
        className="bag-button"
        onClick={() => onSelect("Express checkout")}
      >
        Express checkout
      </button>
      <button className="bag-button" onClick={() => onSelect("Check out")}>
        Check out
      </button>
    </div>
  );
}

export default function BagPage({ bag }) {
  const heading = useRef(null);
  const [checkout, setCheckout] = useState(false);
  const [order, setOrder] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  async function placeOrder() {
    setPlacing(true);
    setCheckoutError("");
    try {
      setOrder(await bag.checkout());
    } catch (error) {
      setCheckoutError(error.message);
    } finally {
      setPlacing(false);
    }
  }
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    heading.current.focus({ preventScroll: true });
  }, []);
  return (
    <section className="bag-page" aria-labelledby="bag-title">
      <header className="bag-page-heading" data-reveal="up">
        <h1 ref={heading} tabIndex={-1} id="bag-title">
          {bag.count
            ? `Your bag total is ${formatPrice(bag.total)}.`
            : "Your bag is empty."}
        </h1>
        <p>
          {bag.count
            ? "Good taste. Great company."
            : "Your next favourite is waiting."}
        </p>
        {bag.count ? (
          <CheckoutActions onSelect={setCheckout} />
        ) : (
          <a className="bag-button" href={paths.store}>
            Explore headphones
          </a>
        )}
      </header>
      <p className="bag-sr-only" role="status">
        {bag.count} items in your bag. Total {formatPrice(bag.total)}.
      </p>
      {bag.items.map(({ product, quantity }) => (
        <article
          className="bag-row"
          key={product.id}
          aria-label={product.name}
          data-reveal="item"
        >
          <a
            className="bag-row-image"
            href={productHref(product.id)}
            aria-label={`View ${product.name}`}
          >
            <HeadphoneImage image={product.image} decorative />
          </a>
          <div className="bag-row-description">
            <a href={productHref(product.id)}>
              <h2>{product.name}</h2>
            </a>
            <p>
              {product.finishName} / {product.image.category}
            </p>
            <p className="bag-row-tagline">{product.tagline}</p>
          </div>
          <label className="bag-quantity">
            Quantity
            <select
              aria-label={`Quantity for ${product.name}`}
              value={quantity}
              onChange={(event) =>
                bag.setQuantity(product.id, Number(event.target.value))
              }
            >
              {Array.from({ length: MAX_QUANTITY }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </label>
          <div className="bag-row-price">
            <strong>{formatPrice(product.price * quantity)}</strong>
            <button
              onClick={() => bag.remove(product.id)}
              aria-label={`Remove ${product.name}`}
            >
              Remove
            </button>
          </div>
          <div className="bag-item-services">
            <a href={productHref(product.id)}>View product details</a>
            <div>
              <span>
                <ShoppingBagOutlined />
                Pickup unavailable
              </span>
              <span>
                <LocalShippingOutlined />
                Delivery unavailable
              </span>
            </div>
          </div>
        </article>
      ))}
      {bag.count > 0 && (
        <div className="bag-summary" data-reveal="up">
          <div>
            <span>Subtotal</span>
            <span>{formatPrice(bag.total)}</span>
          </div>
          <div>
            <span>Delivery</span>
            <span>Not available in this demo</span>
          </div>
          <div className="bag-summary-total">
            <strong>Total</strong>
            <strong>{formatPrice(bag.total)}</strong>
          </div>
          <CheckoutActions onSelect={setCheckout} />
          <a href={paths.store}>Continue exploring</a>
        </div>
      )}
      {bag.count > 0 && <BagDiscovery bag={bag} />}
      <StorefrontDialog
        open={Boolean(checkout)}
        onClose={() => setCheckout(false)}
        aria-labelledby="demo-checkout-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="demo-checkout-title">
          {checkout || "Checkout"}
          <IconButton
            aria-label="Close checkout information"
            onClick={() => setCheckout(false)}
            sx={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {order ? (
            <p role="status">
              Order {order.id} is placed. Total {formatPrice(order.total_ore / 100)}. This
              is a demo, so no payment was taken.
            </p>
          ) : bag.signedIn ? (
            <>
              <p>
                Place your order for {formatPrice(bag.total)}. This is a demo, so no
                payment is taken.
              </p>
              {checkoutError && <p role="alert">{checkoutError}</p>}
              <button
                type="button"
                className="bag-button"
                disabled={placing}
                onClick={placeOrder}
              >
                Place order
              </button>
            </>
          ) : (
            <>
              <p>Sign in to place your order. Your bag comes with you.</p>
              <a className="bag-button" href={paths.signIn}>
                Sign in
              </a>
            </>
          )}
        </DialogContent>
      </StorefrontDialog>
    </section>
  );
}
