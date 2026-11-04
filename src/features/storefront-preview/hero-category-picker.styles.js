// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    ".preview-category-picker": {
      position: "absolute",
      top: "15px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: "4",
      display: "flex",
      gap: "3px",
      padding: "3px",
      border: "1px solid #deded9",
      borderRadius: "30px",
      background: "#eeedeb",
    },
  },
  {
    ".preview-category-picker button": {
      minHeight: "36px",
      minWidth: "76px",
      padding: "7px 12px",
      border: "1px solid transparent",
      borderRadius: "24px",
      background: "transparent",
      color: "#151515",
      font: "inherit",
      fontSize: "11px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "background-color 200ms ease,\n    color 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  {
    ".preview-category-picker button:hover": {
      background: "#e3e2df",
    },
  },
  {
    '.preview-category-picker button[aria-pressed="true"]': {
      background: "#151515",
      color: "#fff",
    },
  },
  {
    '.preview-category-picker button[aria-pressed="true"]:hover': {
      background: "#292929",
    },
  },
  {
    "@media (max-width: 600px)": [
      {
        ".preview-category-picker": {
          position: "static",
          transform: "none",
          alignSelf: "center",
          marginTop: "16px",
        },
      },
    ],
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".preview-category-picker button": {
          transition: "none",
        },
      },
    ],
  },
];

export default styles;
