import StorefrontDialog from "./StorefrontDialog";
import { collectionHref } from "./collections/collections";
import React, { useLayoutEffect, useRef, useState } from "react";
import { IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HeadphoneImage from "./HeadphoneImage";
import ProductPlaceholder from "./ProductPlaceholder";
import ScrollReveal from "./ScrollReveal";
import { formatPrice } from "./products";
import ProductPurchaseOptions from "./ProductPurchaseOptions";
import ProductInformation from "./ProductInformation";
import RelatedProducts from "./RelatedProducts";

const finishColors = {
  Graphite: "#363735",
  Chalk: "#eeede7",
  Silver: "#b6b8ba",
  Crimson: "#a92c38",
  Onyx: "#1f1f21",
  Espresso: "#3b2621",
};

const finishesByCategory = {
  "over-ear": ["Graphite", "Chalk", "Silver", "Onyx"],
  "in-ear": ["Graphite", "Chalk", "Crimson", "Espresso", "Onyx"],
};

export default function ProductDetail({ product, onAddToBag }) {
  const title = useRef(null);
  const [imageView, setImageView] = useState("full");
  const [zoom, setZoom] = useState(false);
  const [failedImages, setFailedImages] = useState({});
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const category =
    product.image.category === "over-ear" ? "Over-ear" : "In-ear";
  const finishes = finishesByCategory[product.image.category];

  useLayoutEffect(() => {
    title.current.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
    setImageView("full");
    setZoom(false);
  }, [product.id]);

  const photo = failedImages[product.id] ? (
    <ProductPlaceholder finish={product.image.finish} />
  ) : (
    <HeadphoneImage
      image={product.image}
      onError={() =>
        setFailedImages((previous) => ({ ...previous, [product.id]: true }))
      }
    />
  );

  return (
    <div className="product-detail">
      <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
        <a href={collectionHref(product.image.category)}>
          {category} collection
        </a>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>
      <div className="product-detail-layout">
        <ScrollReveal className="product-detail-summary" delay={80}>
          <p className="product-detail-eyebrow">
            RESONANCE / {category.toUpperCase()}
          </p>
          <h1 ref={title} tabIndex={-1}>
            {product.name}
          </h1>
          <p className="product-detail-tagline">{product.tagline}</p>
          <p className="product-detail-price">
            {formatPrice(product.price)} <span>Demo price</span>
          </p>
          <div className="product-detail-finishes">
            <h2>Find your finish.</h2>
            <p>
              {product.finishName} <span>— {product.name}</span>
            </p>
            <div role="group" aria-label="Product colours">
              {finishes.map((finish) => (
                <button
                  key={finish}
                  type="button"
                  disabled={finish !== product.finishName}
                  aria-pressed={finish === product.finishName}
                  aria-label={`${finish}${finish !== product.finishName ? " — unavailable" : ""}`}
                >
                  <span
                    className="product-detail-swatch"
                    style={{ "--finish-color": finishColors[finish] }}
                  />
                  <span>{finish}</span>
                </button>
              ))}
            </div>
            <small>
              Only {product.finishName} is available for this model.
            </small>
          </div>
          <ProductPurchaseOptions product={product} onAddToBag={onAddToBag} />
        </ScrollReveal>
        <ScrollReveal className="product-detail-gallery">
          <button
            className="product-detail-photo"
            data-view={imageView}
            onClick={() => setZoom(true)}
            aria-label={`Enlarge ${product.name} image`}
            aria-haspopup="dialog"
          >
            {photo}
            <span className="product-detail-enlarge">
              Take a closer look <span aria-hidden="true">+</span>
            </span>
          </button>
          <div
            className="product-detail-thumbnails"
            role="group"
            aria-label="Product image view"
          >
            {["full", "detail"].map((view) => (
              <button
                key={view}
                aria-label={
                  view === "full" ? "Full product view" : "Close-up view"
                }
                aria-pressed={imageView === view}
                onClick={() => setImageView(view)}
              >
                <span className={`product-detail-thumbnail-${view}`}>
                  <HeadphoneImage image={product.image} decorative />
                </span>
              </button>
            ))}
          </div>
          <p>
            {product.name} / {product.finishName}
          </p>
        </ScrollReveal>
      </div>
      <ProductInformation product={product} category={category} />
      <RelatedProducts key={product.id} product={product} />
      <StorefrontDialog
        open={zoom}
        onClose={() => setZoom(false)}
        fullWidth
        maxWidth="md"
        aria-labelledby="product-zoom-title"
        transitionDuration={reducedMotion ? 0 : 250}
        PaperProps={{ className: "product-detail-zoom" }}
      >
        <IconButton
          aria-label="Close enlarged image"
          onClick={() => setZoom(false)}
        >
          <CloseIcon />
        </IconButton>
        <h2 id="product-zoom-title">{product.name} enlarged image</h2>
        {photo}
      </StorefrontDialog>
    </div>
  );
}
