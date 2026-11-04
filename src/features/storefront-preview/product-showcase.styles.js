// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    ".product-showcase": {
      padding: "64px 12px 32px",
      background: "#fafaf8",
    },
  },
  {
    ".product-showcase-heading": {
      padding: "0 28px 38px",
    },
  },
  {
    ".product-showcase-heading > p": {
      margin: "0 0 18px",
      fontSize: "10px",
      letterSpacing: "0.08em",
      color: "#686862",
    },
  },
  {
    ".product-showcase-heading h2": {
      margin: "0",
      fontSize: "clamp(40px, 5.5vw, 76px)",
      lineHeight: "1",
      letterSpacing: "-0.065em",
      fontWeight: "400",
    },
  },
  {
    ".product-showcase-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "12px",
    },
  },
  {
    ".product-showcase-tile": {
      "--tile-ink": "#151515",
      "--tile-muted": "#64645f",
      "--tile-button": "#151515",
      "--tile-button-text": "#fff",
      "--tile-hover": "#30302c",
      minWidth: "0",
      minHeight: "590px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden",
      color: "var(--tile-ink)",
    },
  },
  {
    ".product-showcase-chalk": {
      background: "#f0f0ed",
    },
  },
  {
    ".product-showcase-dark": {
      background: "#242523",
      "--tile-ink": "#f6f6f2",
      "--tile-muted": "#c4c4bd",
      "--tile-button": "#f0f0ea",
      "--tile-button-text": "#242523",
      "--tile-hover": "#ddddd6",
    },
  },
  {
    ".product-showcase-warm": {
      background: "#ece2db",
    },
  },
  {
    ".product-showcase-silver": {
      background: "#dedfdd",
    },
  },
  {
    ".product-showcase-copy": {
      position: "relative",
      zIndex: "1",
      width: "100%",
      padding: "38px 24px 0",
      textAlign: "center",
    },
  },
  {
    ".product-showcase-category": {
      fontSize: "11px",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--tile-muted)",
      margin: "0 0 14px",
    },
  },
  {
    ".product-showcase-copy h3": {
      fontSize: "clamp(36px, 4.2vw, 60px)",
      lineHeight: "1",
      fontWeight: "400",
      letterSpacing: "-0.06em",
      margin: "0 0 12px",
    },
  },
  {
    ".product-showcase-caption": {
      fontSize: "clamp(14px, 1.5vw, 18px)",
      lineHeight: "1.4",
      margin: "0",
    },
  },
  {
    ".product-showcase-actions": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "12px",
      marginTop: "22px",
    },
  },
  {
    ".product-showcase-actions a": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "44px",
      padding: "10px 20px",
      border: "1px solid var(--tile-button)",
      borderRadius: "24px",
      textDecoration: "none",
      fontSize: "12px",
      lineHeight: "1.2",
      transition: "background-color 200ms ease,\n    border-color 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  {
    ".product-showcase-actions .product-showcase-primary": {
      background: "var(--tile-button)",
      color: "var(--tile-button-text)",
    },
  },
  {
    ".product-showcase-actions .product-showcase-primary:hover": {
      background: "var(--tile-hover)",
      borderColor: "var(--tile-hover)",
    },
  },
  {
    ".product-showcase-actions .product-showcase-secondary": {
      color: "var(--tile-ink)",
      background: "transparent",
    },
  },
  {
    ".product-showcase-actions .product-showcase-secondary:hover": {
      background: "#88888814",
    },
  },
  {
    ".product-showcase-image": {
      display: "grid",
      placeItems: "center",
      width: "100%",
      height: "360px",
      marginTop: "22px",
      padding: "12px 48px 28px",
    },
  },
  {
    ".product-showcase-image svg": {
      display: "block",
      width: "100%",
      height: "100%",
      transform: "rotate(var(--showcase-image-angle, -6deg))",
      transition: "transform 500ms var(--ease-out)",
    },
  },
  {
    ".product-showcase-tile:nth-of-type(even)": {
      "--showcase-image-angle": "6deg",
    },
  },
  {
    ".product-showcase-tile:focus-within": {
      outlineOffset: "-5px",
    },
  },
  {
    ".product-showcase-image:focus-visible": {
      outlineOffset: "-8px",
    },
  },
  {
    ".product-showcase-note": {
      margin: "24px 28px 0",
      fontSize: "10px",
      lineHeight: "1.6",
      color: "#686862",
    },
  },
  {
    "@media (hover: hover) and (prefers-reduced-motion: no-preference)": [
      {
        ".product-showcase-image:hover svg": {
          transform: "rotate(0) scale(1.025)",
        },
      },
    ],
  },
  {
    "@media (max-width: 600px)": [
      {
        ".product-showcase": {
          padding: "44px 8px 26px",
        },
      },
      {
        ".product-showcase-heading": {
          padding: "0 12px 30px",
        },
      },
      {
        ".product-showcase-grid": {
          gridTemplateColumns: "1fr",
          gap: "8px",
        },
      },
      {
        ".product-showcase-tile": {
          minHeight: "510px",
        },
      },
      {
        ".product-showcase-copy": {
          padding: "30px 20px 0",
        },
      },
      {
        ".product-showcase-image": {
          height: "300px",
          padding: "10px 36px 24px",
        },
      },
      {
        ".product-showcase-note": {
          marginInline: "12px",
        },
      },
    ],
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".product-showcase *": {
          transition: "none !important",
          animation: "none !important",
        },
      },
    ],
  },
];

export default styles;
