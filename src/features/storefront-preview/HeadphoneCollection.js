import ScrollReveal from "./ScrollReveal";
import React, { useState } from "react";
import ViewColumnOutlined from "@mui/icons-material/ViewColumnOutlined";
import GraphicEqRounded from "@mui/icons-material/GraphicEqRounded";
import CompareArrowsRounded from "@mui/icons-material/CompareArrowsRounded";
import BookmarkBorderRounded from "@mui/icons-material/BookmarkBorderRounded";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import ModelCompare from "./shopping/ModelCompare";
import { collectionHref } from "./collections/collections";
import HeadphoneImage from "./HeadphoneImage";
import { products, formatPrice, newModels } from "./products";
import { productHref } from "./usePreviewRoute";
import ChapterNav from "./ui/ChapterNav";
import ModelCard from "./ui/ModelCard";
import Shelf from "./ui/Shelf";

const latest = [
  ...products.filter((product) => newModels.includes(product.id)),
  ...products.filter((product) => !newModels.includes(product.id)),
];

const darkCards = ["silver", "black", "in-ear-black", "form-04", "pocket-05"];

const help = [
  {
    Icon: CompareArrowsRounded,
    eyebrow: "Fit guide",
    title: "Over-ear or in-ear? Compare any two.",
    href: "#compare-headphones",
  },
  {
    Icon: GraphicEqRounded,
    eyebrow: "Listening journal",
    title: "Find a pair for the way you listen.",
    href: "#preview-stories",
  },
  {
    Icon: BookmarkBorderRounded,
    eyebrow: "Save for later",
    title: "Keep a shortlist on this device.",
    href: "#bag",
  },
  {
    Icon: PersonOutlineRounded,
    eyebrow: "Your account",
    title: "Sign in to see your space.",
    href: "#sign-in",
  },
];

export default function HeadphoneCollection({ onAddToBag }) {
  const [fit, setFit] = useState("All");
  const visible = products.filter(
    (model) => fit === "All" || model.image.category === fit,
  );
  return (
    <section
      className="preview-collection"
      id="preview-direction"
      aria-labelledby="preview-direction-title"
    >
      <div className="store-head rx-wrap">
        <h1
          tabIndex={-1}
          id="preview-direction-title"
          className="rx-page-title"
          data-reveal="up"
        >
          The collection.
        </h1>
        <div className="store-head-aside" data-reveal="up">
          <p>The best way to find the pair that feels like you.</p>
          <a className="rx-link" href="#compare-headphones">
            Compare any two
          </a>
          <a className="rx-link" href="#preview-stories">
            Read the listening journal
          </a>
        </div>
      </div>

      <ChapterNav
        label="Shop by model"
        items={[
          ...products.map((product) => ({
            href: productHref(product.id),
            label: product.name,
            image: product.image,
            isNew: newModels.includes(product.id),
          })),
          {
            href: "#compare-headphones",
            label: "Compare",
            Icon: ViewColumnOutlined,
          },
          { href: "#bag", label: "Bag", Icon: ShoppingBagOutlined },
        ]}
      />

      <Shelf
        className="store-latest"
        title="The latest."
        lead="Take a look at what’s new, right now."
      >
        {latest.map((product) => {
          const isNew = newModels.includes(product.id);
          const dark = darkCards.includes(product.id);
          return (
            <a
              key={product.id}
              href={productHref(product.id)}
              className={`rx-card store-card${dark ? " rx-card--dark" : ""}`}
              aria-label={`${product.name}. ${product.tagline} From ${formatPrice(product.price)}`}
            >
              <span className={isNew ? "rx-new" : "store-card-series"}>
                {isNew
                  ? "New"
                  : product.image.category === "over-ear"
                    ? "Form series"
                    : "Pocket series"}
              </span>
              <strong>{product.name}</strong>
              <span className="store-card-tagline">{product.tagline}</span>
              <span className="store-card-price">
                From {formatPrice(product.price)}
              </span>
              <HeadphoneImage image={product.image} decorative />
            </a>
          );
        })}
      </Shelf>

      <section
        className="rx-section rx-section--gray store-all"
        aria-labelledby="store-all-title"
      >
        <div className="rx-wrap">
          <div className="rx-section-head" data-reveal="up">
            <h2 className="rx-section-title" id="store-all-title">
              All models.
            </h2>
            <div
              className="shop-filters rx-segmented"
              role="group"
              aria-label="Filter by fit"
            >
              {[
                ["All", "All"],
                ["over-ear", "Over-ear"],
                ["in-ear", "In-ear"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  aria-pressed={fit === value}
                  onClick={() => setFit(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="preview-product-grid">
            {visible.map((product, index) => (
              <ScrollReveal
                key={product.id}
                variant="item"
                className="preview-product-card"
                id={
                  index ===
                  visible.findIndex(
                    (item) => item.image.category === product.image.category,
                  )
                    ? `preview-${product.image.category}`
                    : undefined
                }
              >
                <ModelCard product={product} onAddToBag={onAddToBag} />
              </ScrollReveal>
            ))}
          </div>
          <p className="store-series-links" data-reveal="fade">
            <a className="rx-link" href={collectionHref("over-ear")}>
              Explore the Form series
            </a>
            <a className="rx-link" href={collectionHref("in-ear")}>
              Explore the Pocket series
            </a>
          </p>
        </div>
      </section>

      <ModelCompare />

      <Shelf
        className="store-help"
        title="Help is here."
        lead="Whenever and however you need it."
      >
        {help.map(({ Icon, eyebrow, title, href }) => (
          <a key={href} className="rx-card store-help-card" href={href}>
            <span className="rx-eyebrow">{eyebrow}</span>
            <strong>{title}</strong>
            <Icon aria-hidden="true" />
          </a>
        ))}
      </Shelf>

      <p className="preview-collection-note rx-wrap" data-reveal="fade">
        A fictional collection for this design demo. Model names and prices are
        illustrative. No purchases are available.
      </p>
    </section>
  );
}
