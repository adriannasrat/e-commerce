import shoppingStyles from "./shopping/shopping.styles";
import footerStyles from "./footer/footer.styles";
import collectionPageStyles from "./collections/collection-pages.styles";
import React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import revealStyles from "./scroll-reveal.styles";
import bagStyles from "./bag/bag.styles";
import menuGlyphStyles from "./menu-glyph.styles";
import linkStyles from "./storefront-link.styles";
import galleryStyles from "./gallery.styles";
import categoryPickerStyles from "./hero-category-picker.styles";
import collectionStyles from "./collection.styles";
import storyStyles from "./listening-stories.styles";
import productDetailStyles from "./product-detail.styles";
import showcaseStyles from "./product-showcase.styles";
import recommendationStyles from "./recommendations/recommendations.styles";
import authStyles from "./auth/sign-in.styles";
import previewStyles from "./preview.styles";
import navigationStyles from "./navigation.styles";

// Keep the established cascade order, including styles for portalled dialogs.
const styles = [
  shoppingStyles,
  footerStyles,
  collectionPageStyles,
  revealStyles,
  bagStyles,
  menuGlyphStyles,
  linkStyles,
  galleryStyles,
  categoryPickerStyles,
  collectionStyles,
  storyStyles,
  productDetailStyles,
  showcaseStyles,
  recommendationStyles,
  authStyles,
  previewStyles,
  navigationStyles,
];

export default function StorefrontStyles() {
  return <GlobalStyles styles={styles} />;
}
