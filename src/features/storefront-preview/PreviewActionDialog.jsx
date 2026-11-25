import CatalogSearch from "./shopping/CatalogSearch";
import StorefrontDialog from "./StorefrontDialog";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { readSavedProducts } from "./savedProducts";
import { products } from "./products";
import { productHref } from "./usePreviewRoute";

const content = {
  saves: {
    title: "Your saves",
    text: "Your favourite models, saved on this device.",
  },
  search: {
    title: "Find your frequency",
  },
};

export default function PreviewActionDialog({ action, onClose }) {
  const selected = content[action];
  const saved =
    action === "saves"
      ? products.filter((product) => readSavedProducts().includes(product.id))
      : [];
  return (
    <StorefrontDialog
      open={Boolean(selected)}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="preview-action-title"
    >
      <DialogTitle
        id="preview-action-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {selected?.title}
        <IconButton aria-label="Close panel" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pb: 4 }}>
        {action === "search" ? (
          <CatalogSearch onSelect={onClose} />
        ) : (
          <Typography>{selected?.text}</Typography>
        )}
        {action === "saves" &&
          (saved.length ? (
            <ul>
              {saved.map((product) => (
                <li key={product.id}>
                  <a href={productHref(product.id)} onClick={onClose}>
                    {product.name} — {product.finishName}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Typography sx={{ mt: 2 }}>
              No saved models yet. Select “Save for later” on a product to add
              it here.
            </Typography>
          ))}
      </DialogContent>
    </StorefrontDialog>
  );
}
