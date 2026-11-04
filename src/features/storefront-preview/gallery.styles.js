// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    ".preview-gallery": { touchAction: "pan-y pinch-zoom" },
    ".hero-swipe-tip": { display: "none" },
  },
  {
    "@media (pointer: coarse) and (max-width: 600px)": {
      ".hero-swipe-tip": {
        display: "block",
        textAlign: "center",
        fontSize: 11,
        color: "#66665f",
        marginTop: 8,
      },
    },
  },
  {
    ".preview-gallery-picker": {
      position: "absolute",
      top: "clamp(390px, 34vw, 470px)",
      right: "40px",
      zIndex: "4",
      "--stack-step": "30px",
      width: "calc(52px + (var(--image-count) - 1) * var(--stack-step))",
      height: "52px",
    },
  },
  {
    ".preview-gallery-option": {
      position: "absolute",
      top: "0",
      left: "0",
      display: "grid",
      placeItems: "center",
      width: "52px",
      height: "52px",
      padding: "7px",
      transform: "translateX(calc(var(--position) * var(--stack-step)))",
      boxShadow: "-3px 2px 8px #00000010",
      border: "1px solid #d1d1cc",
      borderRadius: "50%",
      background: "#eeedeb",
      cursor: "pointer",
      transition:
        "border-color 0.25s,\n    background-color 0.25s,\n    transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)",
    },
  },
  {
    ".preview-gallery-option:focus-visible": {
      zIndex: "10 !important",
    },
  },
  {
    ".preview-gallery-option svg": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
  {
    '.preview-gallery-option[aria-pressed="true"]': {
      border: "1px solid #969691",
      background: "#fff",
    },
  },
  {
    ".preview-gallery-option:hover": {
      borderColor: "#c5c5bf",
      background: "#e8e7e4",
    },
  },
  {
    ".preview-gallery-slide": {
      position: "absolute",
      inset: "0",
      opacity: "0",
      transform: "translateY(14px) scale(0.96) rotate(-3deg)",
      transition:
        "opacity 0.65s ease,\n    transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
      pointerEvents: "none",
    },
  },
  {
    '.preview-gallery-slide[data-active="true"]': {
      opacity: "1",
      transform: "translateY(0) scale(1) rotate(0)",
    },
  },
  {
    ".preview-gallery-slide > .preview-product": {
      inset: "0",
      height: "100%",
      minHeight: "0",
    },
  },
  {
    "@media (max-width: 900px)": [
      {
        ".preview-gallery-picker": {
          top: "350px",
          right: "24px",
          "--stack-step": "20px",
        },
      },
    ],
  },
  {
    "@media (max-width: 600px)": [
      {
        ".preview-gallery-picker": {
          position: "relative",
          top: "auto",
          right: "auto",
          alignSelf: "center",
          marginTop: "24px",
        },
      },
      {
        ".preview-gallery-slide > .preview-product": {
          position: "absolute",
        },
      },
    ],
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".preview-gallery-slide,\n  .preview-gallery-option": {
          transition: "none",
        },
      },
    ],
  },
  {
    '.preview-gallery-option[aria-pressed="true"]:hover': {
      background: "#f5f5f3",
      borderColor: "#8b8b86",
    },
  },
];

export default styles;
