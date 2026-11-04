// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    ".storefront-preview .preview-storefront-link": {
      boxSizing: "border-box",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "44px",
      maxWidth: "100%",
      padding: "10px 18px",
      border: "1px solid #151515",
      borderRadius: "24px",
      background: "#151515",
      color: "#fff",
      fontSize: "12px",
      fontWeight: "700",
      lineHeight: "1.4",
      textDecoration: "none",
      transition: "background-color 200ms ease,\n    color 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  {
    ".storefront-preview .preview-storefront-link:hover,\n.storefront-preview .preview-storefront-link:focus-visible":
      {
        background: "#292929",
        color: "#fff",
      },
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".storefront-preview .preview-storefront-link": {
          transition: "none",
        },
      },
    ],
  },
];

export default styles;
