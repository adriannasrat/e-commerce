// Base page styles and the home page: product hero, full-bleed heroes,
// the promo tile grid, highlights and the journal feature.
const styles = [
  {
    ".storefront-preview": {
      minHeight: "100svh",
      background: "#fff !important",
      color: "var(--rx-ink)",
      fontSize: "17px",
      lineHeight: "1.47",
      letterSpacing: "-0.022em",
    },
  },
  { ".storefront-preview a": { color: "var(--rx-link)" } },
  {
    ".storefront-preview :focus-visible, .MuiDialog-root :focus-visible": {
      outline: "2px solid var(--rx-accent)",
      outlineOffset: "3px",
    },
  },
  {
    ".storefront-preview [tabindex='-1']:focus, .storefront-preview h1:focus":
      {
        outline: "none",
      },
  },
  { ".preview-shell": { background: "#fff", overflowX: "clip" } },
  {
    ".preview-sr-only,\n.preview-skip:not(:focus)": {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clipPath: "inset(50%)",
      whiteSpace: "nowrap",
    },
  },
  {
    ".preview-skip:focus": {
      position: "fixed",
      top: "8px",
      left: "8px",
      zIndex: "2000",
      background: "#fff",
      borderRadius: "10px",
      padding: "12px 16px",
      boxShadow: "var(--rx-card-shadow)",
    },
  },
  { "#preview-main": { outline: "none" } },
  // Product hero
  {
    ".preview-hero": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "36px 22px 40px",
      textAlign: "center",
      background: "linear-gradient(#fff 55%, var(--rx-gray))",
    },
  },
  {
    ".preview-headline": {
      margin: "22px 0 4px",
      fontSize: "17px",
      fontWeight: "600",
      letterSpacing: "-0.022em",
      color: "var(--rx-muted)",
    },
  },
  { ".preview-product-info .rx-new": { fontSize: "17px", marginBottom: "2px" } },
  {
    ".preview-demo-price": {
      margin: "12px 0 0",
      fontSize: "17px",
      color: "var(--rx-muted)",
      fontVariantNumeric: "tabular-nums",
    },
  },
  {
    "@media (prefers-reduced-motion: no-preference)": [
      {
        ".preview-product-info": {
          animation: "preview-info-in 420ms var(--ease-out) both",
        },
      },
      {
        "@keyframes preview-info-in": [
          { from: { opacity: "0", filter: "blur(4px)", translate: "0 6px" } },
          { to: { opacity: "1", filter: "blur(0)", translate: "0 0" } },
        ],
      },
    ],
  },
  {
    ".preview-gallery": {
      position: "relative",
      display: "block",
      width: "min(820px, 100%)",
      height: "clamp(320px, 40vw, 560px)",
      marginTop: "28px",
      touchAction: "pan-y",
      WebkitUserSelect: "none",
      userSelect: "none",
    },
  },
  {
    ".preview-gallery-slide": {
      position: "absolute",
      inset: "0",
      opacity: "0",
      transform: "translateY(16px) scale(0.96)",
      filter: "blur(6px)",
      transition:
        "opacity 400ms ease,\n    filter 400ms ease,\n    transform 520ms var(--ease-out)",
      pointerEvents: "none",
    },
  },
  {
    '.preview-gallery-slide[data-active="true"]': {
      opacity: "1",
      transform: "none",
      filter: "blur(0)",
    },
  },
  {
    ".preview-product-photo": {
      display: "block",
      width: "100%",
      height: "100%",
      filter: "drop-shadow(0 30px 30px rgba(0, 0, 0, 0.14))",
      transition: "transform 500ms var(--ease-out)",
    },
  },
  {
    ".preview-gallery:hover .preview-product-photo": {
      transform: "translateY(-6px) scale(1.015)",
    },
  },
  {
    ".preview-hero-footer": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      marginTop: "18px",
    },
  },
  {
    ".preview-gallery-picker": {
      display: "flex",
      gap: "10px",
    },
  },
  {
    ".preview-gallery-option": {
      display: "grid",
      placeItems: "center",
      width: "56px",
      height: "56px",
      padding: "8px",
      border: "1px solid transparent",
      borderRadius: "14px",
      background: "#fff",
      boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
      cursor: "pointer",
      transition:
        "border-color 200ms ease,\n    box-shadow 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  { ".preview-gallery-option svg": { width: "100%", height: "100%" } },
  { ".preview-gallery-option:hover": { boxShadow: "0 2px 10px rgba(0, 0, 0, 0.14)" } },
  {
    '.preview-gallery-option[aria-pressed="true"]': {
      borderColor: "var(--rx-accent)",
      boxShadow: "0 0 0 1px var(--rx-accent)",
    },
  },
  {
    ".hero-swipe-tip": {
      fontSize: "12px",
      color: "var(--rx-muted)",
    },
  },
  // Placeholder headphones (shown when a product photo fails to load)
  {
    ".preview-product:not(.preview-gallery)": {
      "--cup": "#41413f",
      "--cup-edge": "#222220",
      "--band": "#292927",
      position: "relative",
      width: "100%",
      height: "100%",
    },
  },
  {
    ".preview-product--chalk": {
      "--cup": "#e3dfd5",
      "--cup-edge": "#b5b0a5",
      "--band": "#c9c5bb",
    },
  },
  { ".preview-product-guide": { display: "none" } },
  {
    ".preview-headphones": {
      position: "absolute",
      width: "300px",
      height: "350px",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%) rotate(-13deg) scale(0.8)",
    },
  },
  {
    ".preview-headband": {
      position: "absolute",
      width: "270px",
      height: "290px",
      left: "15px",
      border: "25px solid var(--band)",
      borderBottom: "0",
      borderRadius: "150px 150px 30px 30px",
    },
  },
  {
    ".preview-earcup": {
      position: "absolute",
      top: "185px",
      width: "91px",
      height: "145px",
      borderRadius: "42%",
      background: "var(--cup)",
      border: "6px solid var(--cup-edge)",
    },
  },
  { ".preview-earcup--left": { left: "0", transform: "rotate(-7deg)" } },
  { ".preview-earcup--right": { right: "0", transform: "rotate(7deg)" } },
  { ".preview-product-shadow": { display: "none" } },
  // Full-bleed product heroes
  {
    ".sound-campaign": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden",
      marginTop: "12px",
      paddingTop: "clamp(44px, 6vw, 56px)",
      textAlign: "center",
      background: "var(--rx-gray)",
    },
  },
  { ".sound-campaign--dark": { background: "#000" } },
  { ".sound-campaign--light": { background: "var(--rx-gray)" } },
  {
    ".sound-campaign-copy small": {
      display: "block",
      fontSize: "17px",
      fontWeight: "600",
      color: "var(--rx-new)",
      marginBottom: "4px",
    },
  },
  { ".sound-campaign--dark .sound-campaign-copy small": { color: "#f0894a" } },
  {
    ".sound-campaign-price": {
      margin: "10px 0 0",
      fontSize: "17px",
      color: "var(--rx-muted)",
    },
  },
  { ".sound-campaign--dark .sound-campaign-price": { color: "#86868b" } },
  {
    ".sound-art": {
      display: "block",
      width: "min(760px, 88%)",
      height: "clamp(280px, 34vw, 500px)",
      margin: "clamp(28px, 4vw, 48px) 0 clamp(40px, 5vw, 64px)",
    },
  },
  {
    ".sound-art svg": {
      width: "100%",
      height: "100%",
      transition: "transform 700ms var(--ease-out)",
    },
  },
  { ".sound-campaign:hover .sound-art svg": { transform: "scale(1.02)" } },
  {
    ".sound-campaign--dark .sound-art svg": {
      filter: "drop-shadow(0 30px 60px rgba(255, 255, 255, 0.08))",
    },
  },
  // Promo tile grid
  {
    ".product-showcase": {
      padding: "12px",
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
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "clamp(560px, 46vw, 680px)",
      overflow: "hidden",
      paddingTop: "52px",
      background: "var(--rx-gray)",
      textAlign: "center",
    },
  },
  { ".product-showcase-dark": { background: "#000" } },
  { ".product-showcase-warm": { background: "linear-gradient(#fbeae6, #f3d3cc)" } },
  {
    ".product-showcase-category": {
      margin: "0 0 2px",
      fontSize: "14px",
      fontWeight: "600",
      color: "var(--rx-muted)",
    },
  },
  { ".product-showcase-dark .product-showcase-category": { color: "#86868b" } },
  {
    ".product-showcase-copy h3": {
      margin: "0",
      fontSize: "clamp(32px, 3.4vw, 40px)",
      lineHeight: "1.1",
      fontWeight: "600",
      letterSpacing: "0",
    },
  },
  {
    ".product-showcase-caption": {
      margin: "6px 0 0",
      fontSize: "clamp(19px, 1.8vw, 21px)",
      letterSpacing: "0.011em",
    },
  },
  { ".product-showcase-copy .rx-actions": { marginTop: "16px" } },
  {
    ".product-showcase-image": {
      display: "block",
      width: "min(86%, 520px)",
      height: "clamp(260px, 25vw, 380px)",
      margin: "auto 0 clamp(36px, 4vw, 52px)",
      paddingTop: "28px",
    },
  },
  {
    ".product-showcase-image svg": {
      width: "100%",
      height: "100%",
      transition: "transform 600ms var(--ease-out)",
    },
  },
  { ".product-showcase-tile:hover .product-showcase-image svg": { transform: "translateY(-6px)" } },
  // Highlights carousel
  { ".rx-highlights": { overflow: "hidden" } },
  {
    ".rx-highlights-viewport": {
      "--slide": "min(var(--rx-content), calc(100vw - 88px))",
      overflow: "hidden",
      touchAction: "pan-y",
    },
  },
  {
    ".rx-highlights-track": {
      display: "flex",
      gap: "20px",
      margin: "0",
      padding: "0 var(--rx-gutter)",
      listStyle: "none",
      transform: "translateX(calc(var(--index) * -1 * (var(--slide) + 20px)))",
      transition: "transform 700ms var(--ease-in-out)",
    },
  },
  {
    ".rx-highlight": {
      position: "relative",
      flex: "0 0 var(--slide)",
      height: "clamp(440px, 52vw, 640px)",
      overflow: "hidden",
      borderRadius: "28px",
      background: "#1d1d1f",
      color: "#fff",
      cursor: "pointer",
      transition: "opacity 500ms ease",
    },
  },
  { '.rx-highlight[data-active="true"]': { cursor: "default" } },
  { '.rx-highlight[data-active="false"]': { opacity: "0.55" } },
  {
    ".rx-highlight-photo": {
      position: "absolute",
      inset: "0",
      transform: "scale(1.06)",
      transition: "transform 1400ms var(--ease-out),\n    opacity 360ms ease",
    },
  },
  { '.rx-highlight[data-active="true"] .rx-highlight-photo': { transform: "none" } },
  {
    // Keeps white copy legible on any photo.
    ".rx-highlight::after": {
      content: '""',
      position: "absolute",
      inset: "0",
      background:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.18) 38%, rgba(0, 0, 0, 0) 60%)",
      pointerEvents: "none",
    },
  },
  {
    ".rx-highlight-copy": {
      position: "relative",
      zIndex: "2",
      maxWidth: "460px",
      padding: "clamp(28px, 4vw, 52px)",
    },
  },
  {
    ".rx-highlight-copy p": {
      margin: "0 0 8px",
      fontSize: "17px",
      fontWeight: "600",
      opacity: "0.85",
    },
  },
  { ".rx-highlight--light": { color: "var(--rx-ink)", background: "#ecebe7" } },
  { ".rx-highlight--light::after": { display: "none" } },
  { ".rx-highlight .rx-link": { color: "#fff !important", textDecoration: "underline", textUnderlineOffset: "4px", textDecorationColor: "rgba(255, 255, 255, 0.5)" } },
  { ".rx-highlight--light .rx-link": { color: "var(--rx-ink) !important", textDecorationColor: "rgba(0, 0, 0, 0.35) !important" } },
  {
    ".rx-highlight-copy h3": {
      margin: "0",
      fontSize: "clamp(28px, 3.4vw, 40px)",
      lineHeight: "1.1",
      fontWeight: "600",
      letterSpacing: "0",
    },
  },
  {
    ".rx-highlights-controls": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "14px",
      marginTop: "28px",
    },
  },
  {
    ".rx-highlights-dots": {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      minHeight: "56px",
      padding: "0 16px",
      borderRadius: "980px",
      background: "rgba(232, 232, 237, 0.7)",
      backdropFilter: "blur(10px)",
    },
  },
  {
    ".rx-highlights-dots button": {
      position: "relative",
      width: "8px",
      height: "8px",
      margin: "0 4px",
      padding: "0",
      overflow: "hidden",
      border: "0",
      borderRadius: "980px",
      background: "rgba(0, 0, 0, 0.42)",
      cursor: "pointer",
      transition:
        "width 400ms var(--ease-out),\n    background-color 300ms ease",
    },
  },
  {
    // Enlarge the hit area without changing the dot.
    ".rx-highlights-dots button::before": {
      content: '""',
      position: "absolute",
      inset: "-18px -6px",
    },
  },
  {
    '.rx-highlights-dots button[data-active="true"]': {
      width: "48px",
      background: "rgba(0, 0, 0, 0.16)",
    },
  },
  {
    ".rx-highlights-progress": {
      position: "absolute",
      inset: "0",
      borderRadius: "inherit",
      background: "rgba(0, 0, 0, 0.56)",
      transformOrigin: "left",
      animation: "rx-progress 6s linear both",
      animationPlayState: "paused",
    },
  },
  { '.rx-highlights-progress[data-running="true"]': { animationPlayState: "running" } },
  { '.rx-highlights-progress[data-complete="true"]': { animation: "none" } },
  {
    "@keyframes rx-progress": [
      { from: { transform: "scaleX(0)" } },
      { to: { transform: "scaleX(1)" } },
    ],
  },
  {
    ".rx-highlights-play": {
      display: "grid",
      placeItems: "center",
      width: "56px",
      height: "56px",
      padding: "0",
      border: "0",
      borderRadius: "50%",
      background: "rgba(232, 232, 237, 0.7)",
      color: "var(--rx-ink)",
      cursor: "pointer",
      transition: "background-color 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  { ".rx-highlights-play:hover": { background: "rgba(223, 223, 227, 0.9)" } },
  // Journal feature
  {
    ".shop-journal": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "center",
      gap: "4%",
      width: "min(var(--rx-content), calc(100% - 24px))",
      margin: "0 auto clamp(56px, 8vw, 100px)",
      padding: "clamp(32px, 6vw, 80px)",
      overflow: "hidden",
      borderRadius: "28px",
      background: "linear-gradient(135deg, #1d1d1f, #2b2422)",
      color: "#f5f5f7",
    },
  },
  {
    ".shop-journal small": {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#a1a1a6",
    },
  },
  { ".shop-journal small svg": { fontSize: "18px" } },
  {
    ".shop-journal h2": {
      margin: "10px 0 12px",
      fontSize: "clamp(32px, 4vw, 48px)",
      lineHeight: "1.08",
      fontWeight: "600",
    },
  },
  { ".shop-journal p": { margin: "0 0 18px", maxWidth: "40ch", fontSize: "19px", color: "#d2d2d7" } },
  {
    ".shop-journal a": {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      minHeight: "44px",
      color: "#f0894a !important",
      textDecoration: "none",
      fontSize: "17px",
    },
  },
  { ".shop-journal a:hover": { textDecoration: "underline" } },
  { ".shop-journal a svg": { fontSize: "18px" } },
  {
    ".shop-journal-art": {
      height: "clamp(240px, 28vw, 380px)",
      overflow: "hidden",
      borderRadius: "18px",
      background: "#000",
    },
  },
  // Responsive
  {
    "@media (max-width: 833px)": [
      { ".product-showcase-grid": { gridTemplateColumns: "1fr" } },
      { ".product-showcase-tile": { minHeight: "500px", paddingTop: "44px" } },
      { ".shop-journal": { gridTemplateColumns: "1fr", textAlign: "center" } },
      { ".shop-journal p": { marginInline: "auto" } },
      { ".rx-highlights-viewport": { "--slide": "calc(100vw - 44px)" } },
      { ".rx-highlights-track": { gap: "12px", transform: "translateX(calc(var(--index) * -1 * (var(--slide) + 12px)))" } },
    ],
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".storefront-preview *:not(.rx-highlights-progress),\n  .storefront-preview *::before,\n  .storefront-preview *::after":
          {
            animation: "none !important",
            transition: "none !important",
            scrollBehavior: "auto !important",
          },
      },
    ],
  },
];

export default styles;
