import StorefrontDialog from "./StorefrontDialog";
import { collectionHref } from "./collections/collections";
import React, { useLayoutEffect, useRef, useState } from "react";
import { IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HeadphoneImage from "./HeadphoneImage";
import ProductPlaceholder from "./ProductPlaceholder";
import ScrollReveal from "./ScrollReveal";
import { finishColors, formatPrice, newModels } from "./products";
import LocalNav from "./ui/LocalNav";
import Photo from "./ui/Photo";
import { productViews } from "./lifestyleImages";
import ProductPurchaseOptions from "./ProductPurchaseOptions";
import ProductInformation from "./ProductInformation";
import RelatedProducts from "./RelatedProducts";

const finishesByCategory = {
  "over-ear": ["Graphite", "Chalk", "Silver", "Onyx", "Ocean", "Sage", "Sand"],
  "in-ear": ["Graphite", "Chalk", "Crimson", "Espresso", "Onyx", "Carbon", "Slate"],
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

  const extraViews = productViews[product.id] || [];
  const views = [
    { id: "full", label: "Full product view" },
    { id: "detail", label: "Close-up view" },
    ...extraViews,
  ];
  const extra = extraViews.find((view) => view.id === imageView);
  const stage = extra?.photo ? (
    <Photo photo={extra.photo} eager />
  ) : extra?.cutout ? (
    <HeadphoneImage image={extra.cutout} />
  ) : (
    photo
  );

  return (
    <div className="product-detail">
      <LocalNav
        title={product.name}
        href={collectionHref(product.image.category)}
        links={[
          [`All ${category}`, collectionHref(product.image.category)],
          ["Compare", collectionHref(product.image.category, "compare")],
        ]}
        buy={{
          text: "Buy",
          label: `Buy ${product.name}`,
          onClick: () => onAddToBag?.(product.id),
        }}
      />
      <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
        <a href={collectionHref(product.image.category)}>
          {category} collection
        </a>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>
      <div className="product-detail-layout">
        <div className="product-detail-summary">
          <p
            data-reveal="up"
            className={
              newModels.includes(product.id)
                ? "product-detail-eyebrow rx-new"
                : "product-detail-eyebrow"
            }
          >
            {newModels.includes(product.id)
              ? "New"
              : `${category} · ${product.image.category === "over-ear" ? "Form" : "Pocket"} series`}
          </p>
          <h1 ref={title} tabIndex={-1} data-reveal="up">
            {product.name}
          </h1>
          <p className="product-detail-tagline" data-reveal="up">{product.tagline}</p>
          <p className="product-detail-price" data-reveal="up">
            {formatPrice(product.price)} <span>Demo price</span>
          </p>
          <div className="product-detail-finishes" data-reveal="up">
            <h2>
              Finish. <span>Pick your favourite.</span>
            </h2>
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
        </div>
        <ScrollReveal className="product-detail-gallery" variant="zoom">
          <button
            className="product-detail-photo"
            data-view={imageView}
            data-kind={extra?.photo ? "photo" : "cutout"}
            onClick={() => setZoom(true)}
            aria-label={`Enlarge ${product.name} image`}
            aria-haspopup="dialog"
          >
            <span className="product-detail-stage" key={imageView}>
              {stage}
            </span>
            <span className="product-detail-enlarge">
              Take a closer look <span aria-hidden="true">+</span>
            </span>
          </button>
          <div
            className="product-detail-thumbnails"
            role="group"
            aria-label="Product image view"
          >
            {views.map((view) => (
              <button
                key={view.id}
                aria-label={view.label}
                aria-pressed={imageView === view.id}
                onClick={() => setImageView(view.id)}
              >
                <span
                  className={`product-detail-thumbnail-${view.id}${view.photo ? " product-detail-thumbnail-photo" : ""}`}
                >
                  {view.photo ? (
                    <Photo photo={view.photo} decorative />
                  ) : (
                    <HeadphoneImage
                      image={view.cutout || product.image}
                      decorative
                    />
                  )}
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
        <div
          className="product-detail-zoom-stage"
          data-kind={extra?.photo ? "photo" : "cutout"}
        >
          {stage}
        </div>
      </StorefrontDialog>
    </div>
  );
}
