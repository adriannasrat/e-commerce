import { useState } from "react";
import { IconButton, useMediaQuery } from "@mui/material";
import AddRounded from "@mui/icons-material/AddRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import HeadphoneImage from "../HeadphoneImage";
import StorefrontDialog from "../StorefrontDialog";
import { products } from "../products";
import Photo from "./Photo";
import Shelf from "./Shelf";

// "Get to know" cards: tall image cards with a headline, each opening a
// detail sheet from its plus button.
export default function FeatureCards({ title, cards }) {
  const [open, setOpen] = useState(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const card = cards.find(({ id }) => id === open);

  return (
    <>
      <Shelf className="rx-features" title={title} label={title}>
        {cards.map(({ id, eyebrow, title: heading, model, tone, photo }) => {
          const product = products.find((item) => item.id === model);
          return (
            <article
              key={id}
              className={`rx-feature rx-feature--${tone}`}
              aria-labelledby={`feature-${id}`}
            >
              {photo ? (
                <Photo className="rx-feature-photo" photo={photo} decorative />
              ) : (
                <HeadphoneImage
                  className="rx-feature-art"
                  image={product.image}
                  decorative
                />
              )}
              <p>{eyebrow}</p>
              <h3 id={`feature-${id}`}>{heading}</h3>
              <button
                type="button"
                className="rx-feature-more"
                aria-label={`More about ${eyebrow.toLowerCase()}`}
                aria-haspopup="dialog"
                onClick={() => setOpen(id)}
              >
                <AddRounded />
              </button>
            </article>
          );
        })}
      </Shelf>
      <StorefrontDialog
        open={Boolean(card)}
        onClose={() => setOpen(null)}
        fullWidth
        maxWidth="sm"
        aria-labelledby="feature-dialog-title"
        transitionDuration={reducedMotion ? 0 : undefined}
      >
        {card && (
          <div className="rx-feature-dialog">
            <IconButton
              className="rx-feature-dialog-close"
              aria-label="Close"
              onClick={() => setOpen(null)}
            >
              <CloseRounded />
            </IconButton>
            <p className="rx-eyebrow">{card.eyebrow}</p>
            <h2 id="feature-dialog-title">{card.title}</h2>
            <p>{card.detail}</p>
          </div>
        )}
      </StorefrontDialog>
    </>
  );
}
