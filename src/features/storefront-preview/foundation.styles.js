// Shared motion tokens and platform polish for every storefront page.
// Mounted first so feature modules can override it; selectors use :where()
// to keep zero specificity. Dialog content is portalled outside
// .storefront-preview, so MUI dialog roots are included explicitly.
const scope = ":where(.storefront-preview, .MuiDialog-root)";
const pressable = `${scope} :where(button, [role="button"], .bag-button, .preview-storefront-link, .shop-card-add, .sound-actions a, .product-showcase-actions a, .sound-model-link)`;

export const foundationStyles = [
  {
    ":root": {
      // Strong curves: built-in CSS easings are too weak for UI motion.
      "--ease-out": "cubic-bezier(0.23, 1, 0.32, 1)",
      "--ease-in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
      "--ease-drawer": "cubic-bezier(0.32, 0.72, 0, 1)",
      "--press-duration": "160ms",
      "--press-scale": "0.97",
    },
  },
  {
    "html, body": {
      // The storefront scrolls as one document; stop the bounce from
      // chaining into the browser's pull-to-refresh on dialogs.
      overscrollBehaviorY: "none",
      background: "#f7f7f5",
    },
  },
  {
    [scope]: {
      WebkitTapHighlightColor: "transparent",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      textRendering: "optimizeLegibility",
    },
  },
  {
    [`${scope} :where(h1, h2, h3)`]: {
      textWrap: "balance",
    },
  },
  {
    [`${scope} :where(p, li, dd, small)`]: {
      textWrap: "pretty",
    },
  },
  {
    [pressable]: {
      touchAction: "manipulation",
      WebkitUserSelect: "none",
      userSelect: "none",
      transition:
        "scale var(--press-duration) var(--ease-out),\n    background-color 200ms ease,\n    border-color 200ms ease,\n    color 200ms ease,\n    opacity 200ms ease",
    },
  },
  {
    [`${scope} a`]: {
      touchAction: "manipulation",
    },
  },
  {
    // Product photos fade in once decoded instead of popping in. If a load
    // event is ever missed, the fallback animation shows the photo anyway.
    ".rx-photo": {
      transition: "opacity 360ms ease",
    },
  },
  {
    '.rx-photo[data-loaded="false"]': {
      opacity: "0",
      animation: "rx-photo-fallback 1ms 1200ms forwards",
    },
  },
  {
    "@keyframes rx-photo-fallback": [{ to: { opacity: "1" } }],
  },
  {
    "@media (prefers-reduced-motion: reduce)": {
      ".rx-photo, .rx-photo[data-loaded='false']": { opacity: "1 !important" },
    },
  },
  {
    [`${scope} :where(.MuiDialog-paper, .preview-menu, .bag-panel)`]: {
      overscrollBehavior: "contain",
    },
  },
];

export const interactionStyles = [
  {
    // Feedback the moment a finger or cursor lands, not on release.
    [`${pressable}:not(:disabled):active`]: {
      scale: "var(--press-scale)",
    },
  },
  {
    // MUI's own IconButton transition would otherwise drop the press easing.
    ":where(.storefront-preview, .MuiDialog-root) .MuiIconButton-root.MuiIconButton-root":
      {
        transition:
          "background-color 200ms ease,\n    color 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
      },
  },
  {
    // Wide surfaces read a 3% squash as a jump; keep theirs barely visible.
    [`${scope} :where(.disclosure-heading button, .product-detail-photo, .listening-card, .product-related-gallery button)`]:
      {
        "--press-scale": "0.985",
      },
  },
  {
    // iOS zooms into any field under 16px and never zooms back out.
    "@media (pointer: coarse)": {
      [`:is(.storefront-preview, .MuiDialog-root) :is(input, select, textarea)`]:
        {
          fontSize: "16px",
        },
    },
  },
  {
    // Popups that are not full-screen settle in from slightly smaller.
    // Doubled class beats MUI Paper's own box-shadow transition.
    ".storefront-dialog-paper.storefront-dialog-paper": {
      transition:
        "scale 240ms var(--ease-out),\n    translate 240ms var(--ease-out),\n    opacity 200ms ease",
    },
  },
  {
    '.storefront-dialog-paper.storefront-dialog-paper[data-open="false"]': {
      scale: "0.98",
      opacity: "0",
      transitionDuration: "150ms",
    },
  },
  {
    "@starting-style": {
      ".storefront-dialog-paper.storefront-dialog-paper": {
        scale: "0.96",
        translate: "0 8px",
        opacity: "0",
      },
    },
  },
  {
    "@media (prefers-reduced-motion: reduce)": {
      ".storefront-dialog-paper, :where(.storefront-preview, .MuiDialog-root) *":
        {
          scale: "none !important",
        },
    },
  },
];
