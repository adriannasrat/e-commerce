// Product-family pages (Over-ear, In-ear) and shared lineup cards.
const styles = [
  { ".sound-category": { background: "#fff" } },
  {
    ".sound-intro": {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "16px 40px",
      flexWrap: "wrap",
      paddingBlock: "clamp(40px, 6vw, 72px) 20px",
    },
  },
  {
    ".sound-intro p": {
      margin: "0 0 10px",
      fontSize: "clamp(21px, 2.2vw, 24px)",
      fontWeight: "600",
      letterSpacing: "0.009em",
    },
  },
  { ".sound-category .rx-chapternav": { borderBottom: "1px solid #e8e8ed", marginBottom: "36px" } },
  // Hero gallery
  { ".sound-gallery .rx-shelf-track": { gap: "20px" } },
  {
    ".sound-gallery-card": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      width: "min(var(--rx-content), calc(100vw - 88px))",
      height: "clamp(480px, 50vw, 640px)",
      overflow: "hidden",
      borderRadius: "28px",
      background: "var(--rx-gray)",
    },
  },
  {
    ".sound-gallery-card--dark": {
      background: "radial-gradient(circle at 50% 85%, #3a3a3d, #000 72%)",
      color: "#f5f5f7",
    },
  },
  {
    ".sound-gallery-copy": {
      position: "relative",
      zIndex: "1",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "20px",
      padding: "clamp(28px, 4vw, 52px)",
    },
  },
  {
    ".sound-gallery-copy h2": {
      margin: "0",
      fontSize: "clamp(36px, 4.4vw, 56px)",
      lineHeight: "1.07",
      fontWeight: "600",
    },
  },
  {
    ".sound-gallery-copy p:not(.rx-new)": {
      margin: "4px 0 0",
      fontSize: "clamp(19px, 2vw, 24px)",
    },
  },
  { ".sound-gallery-card--dark .rx-new": { color: "#f0894a" } },
  {
    ".sound-gallery-actions": {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      flexShrink: "0",
    },
  },
  { ".sound-gallery-card--dark .rx-link": { color: "#f0894a !important" } },
  {
    ".sound-gallery-art": {
      position: "absolute",
      left: "50%",
      bottom: "7%",
      width: "64%",
      height: "66%",
      translate: "-50% 0",
      transition: "transform 700ms var(--ease-out)",
    },
  },
  { ".sound-gallery-card:hover .sound-gallery-art": { transform: "scale(1.02) translateY(-1%)" } },
  // Model lineup cards
  {
    ".rx-model": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "clamp(260px, 26vw, 313px)",
      textAlign: "center",
    },
  },
  {
    ".rx-model-image": {
      display: "block",
      width: "100%",
      aspectRatio: "1 / 0.82",
      padding: "24px",
      borderRadius: "18px",
      background: "#fff",
      boxShadow: "var(--rx-card-shadow)",
      transition: "box-shadow 300ms var(--ease-out),\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  { ".rx-section--gray .rx-model-image": { boxShadow: "none" } },
  { ".rx-model-image:hover": { boxShadow: "var(--rx-card-shadow-hover)" } },
  {
    ".rx-model-image svg": {
      width: "100%",
      height: "100%",
      transition: "transform 500ms var(--ease-out)",
    },
  },
  { ".rx-model-image:hover svg": { transform: "scale(1.04)" } },
  {
    ".rx-model-swatch": {
      width: "10px",
      height: "10px",
      margin: "22px 0 18px",
      borderRadius: "50%",
      background: "var(--finish)",
      boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.12)",
    },
  },
  { ".rx-model .rx-new": { minHeight: "16px", margin: "0 0 2px" } },
  {
    ".rx-model h2, .rx-model h3": {
      margin: "0",
      fontSize: "24px",
      lineHeight: "1.17",
      fontWeight: "600",
      letterSpacing: "0.009em",
    },
  },
  {
    ".rx-model-finish": {
      margin: "4px 0 0",
      fontSize: "14px",
      color: "var(--rx-muted)",
    },
  },
  {
    ".rx-model-tagline": {
      minHeight: "50px",
      margin: "14px 0 0",
      maxWidth: "24ch",
      fontSize: "17px",
      fontWeight: "600",
      lineHeight: "1.3",
    },
  },
  {
    ".rx-model-price": {
      margin: "18px 0 0",
      fontSize: "14px",
      fontVariantNumeric: "tabular-nums",
    },
  },
  {
    ".rx-model-actions": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "18px",
      marginTop: "18px",
    },
  },
  {
    ".rx-model-add": {
      minHeight: "44px",
      padding: "0",
      border: "0",
      background: "transparent",
      color: "var(--rx-link)",
      font: "inherit",
      fontSize: "14px",
      cursor: "pointer",
      transition: "color 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  { ".rx-model-add:hover": { textDecoration: "underline" } },
  { ".rx-model-buy": { fontSize: "14px" } },
  // Benefit cards
  {
    ".sound-benefit": {
      width: "clamp(260px, 26vw, 313px)",
      minHeight: "300px",
      padding: "30px",
      gap: "6px",
    },
  },
  { ".sound-benefit > svg": { fontSize: "38px", color: "var(--rx-ink)", marginBottom: "16px" } },
  { ".sound-benefit .rx-eyebrow": { fontSize: "12px", margin: "0" } },
  {
    ".sound-benefit strong": {
      fontSize: "24px",
      lineHeight: "1.17",
      fontWeight: "600",
      letterSpacing: "0.009em",
    },
  },
  { ".sound-benefit > span:not(.rx-eyebrow)": { fontSize: "17px", color: "var(--rx-muted)" } },
  {
    ".sound-benefit .sound-benefit-action": {
      marginTop: "auto",
      paddingTop: "18px",
      color: "var(--rx-link) !important",
      fontSize: "17px",
    },
  },
  { ".sound-benefit-action::after": { content: '" ›"' } },
  // Feature ("Get to know") cards
  {
    ".rx-feature": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      width: "clamp(280px, 30vw, 372px)",
      height: "clamp(520px, 52vw, 680px)",
      overflow: "hidden",
      padding: "30px",
      borderRadius: "28px",
      background: "#fff",
      boxShadow: "var(--rx-card-shadow)",
    },
  },
  { ".rx-feature--dark": { background: "#000", color: "#f5f5f7" } },
  { ".rx-feature--photo": { background: "#1d1d1f", color: "#fff" } },
  { ".rx-feature > p, .rx-feature > h3": { position: "relative", zIndex: "1" } },
  {
    ".rx-feature-photo": {
      position: "absolute",
      inset: "0",
      transition: "transform 900ms var(--ease-out),\n    opacity 360ms ease",
    },
  },
  { ".rx-feature:hover .rx-feature-photo": { transform: "scale(1.03)" } },
  {
    ".rx-feature--photo::before": {
      content: '""',
      position: "absolute",
      inset: "0",
      zIndex: "1",
      background: "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 42%)",
      pointerEvents: "none",
    },
  },
  { ".rx-feature--photo .rx-feature-more": { zIndex: "2", background: "rgba(255, 255, 255, 0.92)", color: "#1d1d1f" } },
  { ".rx-feature--warm": { background: "linear-gradient(170deg, #fde8e4, #eeb3a8)" } },
  {
    ".rx-feature p": {
      margin: "0 0 8px",
      fontSize: "12px",
      fontWeight: "600",
    },
  },
  {
    ".rx-feature h3": {
      margin: "0",
      fontSize: "clamp(24px, 2.4vw, 28px)",
      lineHeight: "1.14",
      fontWeight: "600",
      letterSpacing: "0.007em",
    },
  },
  {
    ".rx-feature-art": {
      position: "absolute",
      left: "8%",
      right: "8%",
      bottom: "8%",
      width: "84%",
      height: "58%",
      transition: "transform 700ms var(--ease-out)",
    },
  },
  { ".rx-feature:hover .rx-feature-art": { transform: "scale(1.03)" } },
  {
    ".rx-feature-more": {
      position: "absolute",
      right: "20px",
      bottom: "20px",
      display: "grid",
      placeItems: "center",
      width: "36px",
      height: "36px",
      padding: "0",
      border: "0",
      borderRadius: "50%",
      background: "#333336",
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  { ".rx-feature-more:hover": { background: "#1d1d1f" } },
  { ".rx-feature--dark .rx-feature-more": { background: "#f5f5f7", color: "#1d1d1f" } },
  { ".rx-feature-more svg": { fontSize: "22px" } },
  {
    ".rx-feature-dialog": {
      position: "relative",
      padding: "clamp(36px, 6vw, 64px)",
    },
  },
  {
    ".rx-feature-dialog h2": {
      margin: "0 0 18px",
      fontSize: "clamp(28px, 4vw, 40px)",
      lineHeight: "1.1",
      fontWeight: "600",
    },
  },
  { ".rx-feature-dialog > p:last-child": { margin: "0", fontSize: "19px", lineHeight: "1.42", color: "#424245" } },
  {
    ".rx-feature-dialog-close.MuiIconButton-root": {
      position: "absolute",
      top: "14px",
      right: "14px",
      width: "36px",
      height: "36px",
      background: "#e8e8ed",
      color: "#424245",
    },
  },
  // Design studio
  {
    ".sound-studio": {
      display: "grid",
      gridTemplateColumns: "1fr 1.1fr",
      alignItems: "center",
      gap: "clamp(24px, 6vw, 80px)",
      paddingBlock: "clamp(56px, 8vw, 100px)",
    },
  },
  {
    ".sound-studio-copy > p:not(.rx-eyebrow)": {
      margin: "16px 0 28px",
      maxWidth: "40ch",
      fontSize: "19px",
      lineHeight: "1.42",
      color: "#424245",
    },
  },
  {
    ".sound-study": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      padding: "clamp(24px, 4vw, 48px)",
      borderRadius: "28px",
      background: "var(--rx-gray)",
      color: "var(--rx-muted) !important",
      textDecoration: "none",
      fontSize: "14px",
    },
  },
  { ".sound-study svg": { width: "100%", height: "clamp(240px, 30vw, 380px)" } },
  {
    "@media (prefers-reduced-motion: no-preference)": [
      { ".sound-study svg": { animation: "sound-study-in 420ms var(--ease-out)" } },
      {
        "@keyframes sound-study-in": [
          { from: { opacity: "0", transform: "scale(0.96)", filter: "blur(4px)" } },
          { to: { opacity: "1", transform: "none", filter: "blur(0)" } },
        ],
      },
    ],
  },
  // Comparison table
  { ".sound-compare-title": { textAlign: "center", marginBottom: "40px" } },
  { ".sound-table-wrap": { overflowX: "auto" } },
  {
    ".sound-table-wrap table": {
      width: "100%",
      minWidth: "620px",
      borderCollapse: "collapse",
      tableLayout: "fixed",
      textAlign: "center",
    },
  },
  { ".sound-table-wrap caption": { position: "absolute", width: "1px", height: "1px", overflow: "hidden", clipPath: "inset(50%)" } },
  {
    ".sound-table-wrap th, .sound-table-wrap td": {
      padding: "18px 12px",
      borderTop: "1px solid #d2d2d7",
      fontSize: "14px",
      fontWeight: "400",
      verticalAlign: "top",
    },
  },
  { ".sound-table-wrap thead th": { borderTop: "0" } },
  { ".sound-table-wrap tbody th": { width: "120px", textAlign: "left", color: "var(--rx-muted)", fontSize: "12px" } },
  {
    ".sound-table-wrap thead a": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "14px",
      color: "var(--rx-ink) !important",
      textDecoration: "none",
      fontSize: "21px",
      fontWeight: "600",
    },
  },
  { ".sound-table-wrap thead a:hover": { color: "var(--rx-link) !important" } },
  { ".sound-table-wrap thead svg": { width: "100%", height: "150px" } },
  { ".sound-compare-more": { textAlign: "center", margin: "28px 0 0" } },
  {
    "@media (max-width: 833px)": [
      { ".sound-studio": { gridTemplateColumns: "1fr" } },
      { ".sound-gallery-card": { width: "calc(100vw - 44px)" } },
      { ".sound-gallery-copy": { flexDirection: "column" } },
      { ".sound-gallery-art": { width: "88%", height: "52%", bottom: "6%" } },
    ],
  },
];

export default styles;
