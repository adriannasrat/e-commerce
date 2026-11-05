// Store page: oversized title, model chapter row, "The latest" shelf,
// the filterable model grid and the help shelf.
const styles = [
  {
    ".store-head": {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "18px 40px",
      paddingBlock: "clamp(44px, 6vw, 80px) 28px",
    },
  },
  {
    ".store-head-aside": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      maxWidth: "320px",
      textAlign: "right",
    },
  },
  {
    ".store-head-aside p": {
      margin: "0 0 6px",
      fontSize: "clamp(21px, 2.2vw, 24px)",
      lineHeight: "1.17",
      fontWeight: "600",
      letterSpacing: "0.009em",
    },
  },
  { ".store-head-aside .rx-link": { minHeight: "32px", fontSize: "14px" } },
  { ".preview-collection .rx-chapternav": { marginBottom: "clamp(40px, 5vw, 64px)" } },
  // The latest
  { ".store-latest": { marginBottom: "clamp(32px, 4vw, 48px)" } },
  {
    ".store-card": {
      width: "clamp(300px, 32vw, 400px)",
      height: "clamp(440px, 42vw, 500px)",
      padding: "30px",
      gap: "6px",
    },
  },
  {
    ".store-card .rx-new, .store-card-series": {
      fontSize: "12px",
      fontWeight: "600",
      letterSpacing: "-0.01em",
    },
  },
  { ".store-card-series": { color: "var(--rx-muted)" } },
  { ".rx-card--dark .store-card-series": { color: "#86868b" } },
  { ".rx-card--dark .rx-new": { color: "#f0894a" } },
  {
    ".store-card strong": {
      fontSize: "clamp(24px, 2.4vw, 28px)",
      lineHeight: "1.14",
      fontWeight: "600",
      letterSpacing: "0.007em",
    },
  },
  { ".store-card-tagline": { fontSize: "17px", lineHeight: "1.3" } },
  {
    ".store-card-price": {
      fontSize: "14px",
      color: "var(--rx-muted)",
      fontVariantNumeric: "tabular-nums",
    },
  },
  { ".rx-card--dark .store-card-price": { color: "#a1a1a6" } },
  {
    ".store-card svg": {
      flex: "1",
      width: "100%",
      minHeight: "0",
      marginTop: "18px",
      transition: "transform 600ms var(--ease-out)",
    },
  },
  { ".store-card:hover svg": { transform: "scale(1.04)" } },
  // All models
  {
    ".preview-product-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "clamp(28px, 4vw, 56px) clamp(16px, 2vw, 24px)",
      justifyItems: "center",
    },
  },
  { ".preview-product-grid .rx-model": { width: "100%" } },
  { ".preview-product-card": { width: "100%", scrollMarginTop: "100px" } },
  {
    ".store-series-links": {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "8px 28px",
      margin: "48px 0 0",
    },
  },
  // Help shelf
  { ".store-help": { paddingBlock: "clamp(56px, 7vw, 88px) 0" } },
  {
    ".store-help-card": {
      width: "clamp(260px, 26vw, 313px)",
      height: "300px",
      padding: "30px",
      gap: "6px",
    },
  },
  { ".store-help-card .rx-eyebrow": { margin: "0", fontSize: "12px" } },
  {
    ".store-help-card strong": {
      fontSize: "24px",
      lineHeight: "1.17",
      fontWeight: "600",
      letterSpacing: "0.009em",
    },
  },
  {
    ".store-help-card svg": {
      marginTop: "auto",
      alignSelf: "flex-end",
      fontSize: "56px",
      color: "var(--rx-accent)",
    },
  },
  {
    ".preview-collection-note": {
      margin: "16px auto 64px",
      fontSize: "12px",
      color: "var(--rx-muted)",
    },
  },
  {
    "@media (max-width: 833px)": [
      { ".preview-product-grid": { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" } },
      { ".store-head-aside": { alignItems: "flex-start", textAlign: "left" } },
    ],
  },
  {
    "@media (max-width: 560px)": [
      { ".preview-product-grid": { gridTemplateColumns: "1fr" } },
    ],
  },
];

export default styles;
