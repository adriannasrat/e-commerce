import StorefrontDialog from "./StorefrontDialog";
import { useState } from "react";
import { DialogContent, DialogTitle, IconButton } from "@mui/material";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import Bookmark from "@mui/icons-material/Bookmark";
import ForumOutlined from "@mui/icons-material/ForumOutlined";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import CreditCardOutlined from "@mui/icons-material/CreditCardOutlined";
import Close from "@mui/icons-material/Close";
import { readSavedProducts, writeSavedProducts } from "./savedProducts";

const messages = {
  delivery: [
    "Delivery details",
    "This is a portfolio collection. Shipping dates and delivery services are not available for these concept products.",
  ],
  pickup: [
    "Pickup availability",
    "These headphones are concept products. There are no physical stores or pickup locations.",
  ],
  checkout: [
    "Express checkout",
    "You can explore the demo bag, but payments and checkout are not enabled. No payment details are collected.",
  ],
  help: [
    "Here to help",
    "Explore the product information below, or compare another model in the collection. Live customer support is not available in this portfolio preview.",
  ],
};

export default function ProductPurchaseOptions({ product, onAddToBag }) {
  const [dialog, setDialog] = useState(null);
  const [saved, setSaved] = useState(readSavedProducts);
  const isSaved = saved.includes(product.id);
  function toggleSave() {
    const next = isSaved
      ? saved.filter((id) => id !== product.id)
      : [...saved, product.id];
    setSaved(next);
    writeSavedProducts(next);
  }
  return (
    <div className="product-purchase" data-reveal="up">
      <div className="product-fulfilment">
        <div>
          <LocalShippingOutlined />
          <div>
            <strong>Delivery</strong>
            <p>Concept collection</p>
            <button onClick={() => setDialog("delivery")}>
              View delivery details <AddCircleOutline />
            </button>
          </div>
        </div>
        <div>
          <ShoppingBagOutlined />
          <div>
            <strong>Pickup</strong>
            <button onClick={() => setDialog("pickup")}>
              Check availability <AddCircleOutline />
            </button>
          </div>
        </div>
      </div>
      <div className="product-purchase-buttons">
        <button
          className="bag-button product-express"
          onClick={() => setDialog("checkout")}
        >
          <CreditCardOutlined /> Express checkout
        </button>
        <button className="bag-button" onClick={() => onAddToBag?.(product.id)}>
          Add to bag
        </button>
      </div>
      <div className="product-save">
        <strong>Need a moment?</strong>
        <p>
          Save this model on this device and come back when you’re ready to find
          your sound.
        </p>
        <button aria-pressed={isSaved} onClick={toggleSave}>
          {isSaved ? <Bookmark /> : <BookmarkBorder />}
          {isSaved ? "Saved for later" : "Save for later"}
        </button>
      </div>
      <div className="product-help">
        <ForumOutlined />
        <span>
          <strong>Need some help?</strong>{" "}
          <button onClick={() => setDialog("help")}>
            Contact us <ArrowOutward />
          </button>
        </span>
      </div>
      <StorefrontDialog
        open={Boolean(dialog)}
        onClose={() => setDialog(null)}
        aria-labelledby="product-service-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="product-service-title">
          {messages[dialog]?.[0]}
          <IconButton
            aria-label="Close information"
            onClick={() => setDialog(null)}
            sx={{ float: "right" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <p>{messages[dialog]?.[1]}</p>
        </DialogContent>
      </StorefrontDialog>
    </div>
  );
}
