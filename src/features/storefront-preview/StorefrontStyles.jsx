import shoppingStyles from "./shopping/shopping.styles";
import footerStyles from "./footer/footer.styles";
import collectionPageStyles from "./collections/collection-pages.styles";
import React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { foundationStyles, interactionStyles } from "./foundation.styles";
import gateHover from "./gateHover";
import systemStyles from "./ui/system.styles";
import revealStyles from "./scroll-reveal.styles";
import bagStyles from "./bag/bag.styles";
import menuGlyphStyles from "./menu-glyph.styles";
import collectionStyles from "./collection.styles";
import storyStyles from "./listening-stories.styles";
import productDetailStyles from "./product-detail.styles";
import recommendationStyles from "./recommendations/recommendations.styles";
import authStyles from "./auth/sign-in.styles";
import previewStyles from "./preview.styles";
import navigationStyles from "./navigation.styles";
import pageStyles from "./ui/pages.styles";
import filmStyles from "./ui/film.styles";
import statusStyles from "./ui/status.styles";

// Keep the established cascade order, including styles for portalled dialogs.
// Foundation tokens come first; shared press and dialog feedback come last.
const styles = gateHover([
  foundationStyles,
  systemStyles,
  shoppingStyles,
  footerStyles,
  collectionPageStyles,
  revealStyles,
  bagStyles,
  menuGlyphStyles,
  collectionStyles,
  storyStyles,
  productDetailStyles,
  recommendationStyles,
  authStyles,
  previewStyles,
  navigationStyles,
  pageStyles,
  filmStyles,
  statusStyles,
  interactionStyles,
]);

export default function StorefrontStyles() {
  return <GlobalStyles styles={styles} />;
}
