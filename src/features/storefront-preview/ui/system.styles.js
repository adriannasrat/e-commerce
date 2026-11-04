// Shared storefront design system: type scale, buttons, links, shelves,
// chapter navigation, cards and section rhythm. Feature modules compose these
// classes instead of re-declaring their own versions.
const ink = "#1d1d1f";
const muted = "#6e6e73";
// Ember: the brand accent for primary actions and text links.
const accent = "#b8461b";
const link = "#b8461b";

const systemStyles = [
  {
    ":root": {
      "--rx-ink": ink,
      "--rx-muted": muted,
      "--rx-accent": accent,
      "--rx-accent-hover": "#9a3412",
      "--rx-link": link,
      "--rx-link-dark": "#f0894a",
      "--rx-gray": "#f5f5f7",
      "--rx-line": "#d2d2d7",
      "--rx-new": "#b8461b",
      "--rx-content": "1120px",
      "--rx-gutter": "max(22px, calc((100vw - var(--rx-content)) / 2))",
      "--rx-card-shadow": "2px 4px 12px rgba(0, 0, 0, 0.08)",
      "--rx-card-shadow-hover": "2px 4px 16px rgba(0, 0, 0, 0.16)",
    },
  },
  {
    // Headings that routes scroll to land below the sticky global and local
    // navigation instead of underneath them.
    ":is(.sound-category, .preview-collection, .product-detail) :is(h1, h2)[tabindex='-1'], #compare-all-title":
      {
        scrollMarginTop: "120px",
      },
  },
  {
    ".rx-photo-fill": {
      display: "block",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      WebkitUserSelect: "none",
      userSelect: "none",
    },
  },
  {
    ".rx-wrap": {
      width: "min(var(--rx-content), calc(100% - 44px))",
      marginInline: "auto",
    },
  },
  // Type scale
  {
    ".rx-hero-title": {
      margin: "0",
      fontSize: "clamp(40px, 5.6vw, 56px)",
      lineHeight: "1.07",
      fontWeight: "600",
      letterSpacing: "-0.005em",
    },
  },
  {
    ".rx-hero-sub": {
      margin: "6px 0 0",
      fontSize: "clamp(21px, 2.4vw, 28px)",
      lineHeight: "1.14",
      fontWeight: "400",
      letterSpacing: "0.007em",
    },
  },
  {
    ".rx-page-title": {
      margin: "0",
      fontSize: "clamp(48px, 7vw, 80px)",
      lineHeight: "1.05",
      fontWeight: "600",
      letterSpacing: "-0.015em",
    },
  },
  {
    ".rx-section-title": {
      margin: "0",
      fontSize: "clamp(32px, 4.2vw, 48px)",
      lineHeight: "1.08",
      fontWeight: "600",
      letterSpacing: "-0.003em",
    },
  },
  {
    ".rx-eyebrow": {
      display: "block",
      margin: "0 0 6px",
      fontSize: "14px",
      fontWeight: "600",
      letterSpacing: "-0.016em",
      color: muted,
    },
  },
  {
    ".rx-new": {
      display: "block",
      fontSize: "12px",
      fontWeight: "400",
      fontStyle: "normal",
      letterSpacing: "-0.01em",
      color: "var(--rx-new)",
    },
  },
  {
    ".rx-price": {
      margin: "10px 0 0",
      fontSize: "17px",
      fontVariantNumeric: "tabular-nums",
    },
  },
  // Buttons
  {
    ".rx-btn": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      minWidth: "28px",
      minHeight: "44px",
      padding: "11px 21px",
      border: `1px solid ${accent}`,
      borderRadius: "980px",
      background: accent,
      color: "#fff !important",
      font: "inherit",
      fontSize: "17px",
      lineHeight: "1.18",
      letterSpacing: "-0.022em",
      textDecoration: "none",
      cursor: "pointer",
      transition:
        "background-color 200ms ease,\n    color 200ms ease,\n    border-color 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  { ".rx-btn:hover": { background: "var(--rx-accent-hover)", borderColor: "var(--rx-accent-hover)" } },
  {
    ".rx-btn--ghost": {
      background: "transparent",
      color: `${accent} !important`,
    },
  },
  {
    ".rx-btn--ghost:hover": {
      background: accent,
      color: "#fff !important",
    },
  },
  {
    ".rx-btn--small": {
      minHeight: "30px",
      padding: "5px 14px",
      fontSize: "14px",
    },
  },
  {
    ".rx-btn--dark": {
      background: ink,
      borderColor: ink,
    },
  },
  { ".rx-btn--dark:hover": { background: "#333336", borderColor: "#333336" } },
  {
    ".rx-dark .rx-btn--ghost, .rx-btn--ghost.rx-on-dark": {
      borderColor: "#f0894a",
      color: "#f0894a !important",
    },
  },
  {
    ".rx-dark .rx-btn--ghost:hover": {
      background: "#f0894a",
      color: "#1d1d1f !important",
    },
  },
  {
    ".rx-actions": {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "14px",
      marginTop: "20px",
    },
  },
  // Text links with the chevron affordance
  {
    ".rx-link": {
      display: "inline-flex",
      alignItems: "center",
      minHeight: "44px",
      color: `${link} !important`,
      fontSize: "17px",
      letterSpacing: "-0.022em",
      textDecoration: "none",
    },
  },
  {
    ".rx-link::after": {
      content: '"›"',
      marginLeft: "4px",
      fontSize: "1.15em",
      lineHeight: "1",
      transition: "translate 200ms var(--ease-out)",
    },
  },
  { ".rx-link:hover": { textDecoration: "underline" } },
  { ".rx-link:hover::after": { translate: "2px 0" } },
  { ".rx-dark .rx-link": { color: "#f0894a !important" } },
  // Section rhythm
  {
    ".rx-section": {
      paddingBlock: "clamp(56px, 8vw, 100px)",
    },
  },
  { ".rx-section--gray": { background: "var(--rx-gray)" } },
  {
    ".rx-section-head": {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "8px 24px",
      marginBottom: "clamp(24px, 3vw, 40px)",
    },
  },
  {
    ".rx-dark": {
      background: "#000",
      color: "#f5f5f7",
    },
  },
  // Horizontal shelves
  {
    ".rx-shelf": {
      position: "relative",
    },
  },
  {
    ".rx-shelf-title": {
      width: "min(var(--rx-content), calc(100% - 44px))",
      margin: "0 auto 24px",
      fontSize: "clamp(24px, 2.6vw, 28px)",
      lineHeight: "1.14",
      fontWeight: "600",
      letterSpacing: "0.007em",
      color: muted,
    },
  },
  { ".rx-shelf-title strong": { color: ink, fontWeight: "600" } },
  { ".rx-dark .rx-shelf-title strong": { color: "#f5f5f7" } },
  {
    ".rx-shelf-track": {
      display: "flex",
      gap: "20px",
      margin: "0",
      padding: "12px var(--rx-gutter) 36px",
      listStyle: "none",
      overflowX: "auto",
      overscrollBehaviorX: "contain",
      scrollSnapType: "x mandatory",
      scrollPaddingInline: "var(--rx-gutter)",
      scrollbarWidth: "none",
      touchAction: "pan-x pan-y",
    },
  },
  { ".rx-shelf-track::-webkit-scrollbar": { display: "none" } },
  {
    ".rx-shelf-track > *": {
      flex: "0 0 auto",
      scrollSnapAlign: "start",
    },
  },
  {
    ".rx-paddles": {
      display: "flex",
      justifyContent: "flex-end",
      gap: "18px",
      width: "min(var(--rx-content), calc(100% - 44px))",
      margin: "0 auto",
    },
  },
  {
    ".rx-paddle": {
      display: "grid",
      placeItems: "center",
      width: "36px",
      height: "36px",
      padding: "0",
      border: "0",
      borderRadius: "50%",
      background: "rgba(210, 210, 215, 0.64)",
      color: "rgba(0, 0, 0, 0.56)",
      cursor: "pointer",
      transition:
        "background-color 200ms ease,\n    opacity 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  { ".rx-paddle svg": { width: "22px", height: "22px" } },
  { ".rx-paddle:hover:not(:disabled)": { background: "rgba(223, 223, 227, 0.72)" } },
  { ".rx-paddle:disabled": { opacity: "0.42", cursor: "default" } },
  // Cards
  {
    ".rx-card": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      borderRadius: "18px",
      background: "#fff",
      color: `${ink} !important`,
      boxShadow: "var(--rx-card-shadow)",
      textDecoration: "none",
      transition:
        "box-shadow 300ms var(--ease-out),\n    transform 300ms var(--ease-out),\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  {
    "a.rx-card:hover, .rx-card--lift:hover": {
      boxShadow: "var(--rx-card-shadow-hover)",
      transform: "scale(1.01)",
    },
  },
  { ".rx-card--dark": { background: "#000", color: "#f5f5f7 !important" } },
  // Chapter navigation (the product icon row)
  {
    ".rx-chapternav": {
      overflowX: "auto",
      scrollbarWidth: "none",
    },
  },
  { ".rx-chapternav::-webkit-scrollbar": { display: "none" } },
  {
    ".rx-chapternav ul": {
      display: "flex",
      justifyContent: "center",
      gap: "clamp(10px, 2.6vw, 34px)",
      width: "max-content",
      minWidth: "100%",
      margin: "0",
      padding: "8px var(--rx-gutter) 14px",
      listStyle: "none",
    },
  },
  {
    ".rx-chapternav a": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "86px",
      paddingBlock: "6px",
      color: `${ink} !important`,
      textDecoration: "none",
      fontSize: "12px",
      letterSpacing: "-0.01em",
      textAlign: "center",
    },
  },
  {
    ".rx-chapternav a > svg": {
      width: "64px",
      height: "54px",
      marginBottom: "8px",
      transition: "translate 300ms var(--ease-out)",
    },
  },
  { ".rx-chapternav a > svg.MuiSvgIcon-root": { width: "36px", height: "54px", color: ink } },
  { ".rx-chapternav a:hover > span": { color: "var(--rx-link)" } },
  { ".rx-chapternav a:hover > svg": { translate: "0 -2px" } },
  { ".rx-chapternav .rx-new": { fontSize: "10px", marginTop: "2px" } },
  // Segmented control
  {
    ".rx-segmented": {
      display: "inline-flex",
      gap: "2px",
      padding: "4px",
      borderRadius: "980px",
      background: "#e8e8ed",
    },
  },
  {
    ".rx-segmented button": {
      minHeight: "36px",
      padding: "6px 18px",
      border: "0",
      borderRadius: "980px",
      background: "transparent",
      color: ink,
      font: "inherit",
      fontSize: "14px",
      letterSpacing: "-0.016em",
      cursor: "pointer",
      transition:
        "background-color 240ms var(--ease-out),\n    color 240ms var(--ease-out),\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  { ".rx-segmented button:hover": { color: "var(--rx-link)" } },
  {
    '.rx-segmented button[aria-pressed="true"], .rx-segmented button[aria-pressed="true"]:hover':
      {
        background: ink,
        color: "#fff",
      },
  },
  // Local navigation (sticky product-family bar)
  {
    ".rx-localnav": {
      position: "sticky",
      top: "44px",
      zIndex: "40",
      height: "52px",
      background: "rgba(255, 255, 255, 0.72)",
      backdropFilter: "saturate(180%) blur(20px)",
      WebkitBackdropFilter: "saturate(180%) blur(20px)",
      borderBottom: "1px solid rgba(0, 0, 0, 0.16)",
    },
  },
  {
    ".rx-localnav-inner": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      height: "100%",
    },
  },
  {
    ".rx-localnav-title": {
      fontSize: "21px",
      fontWeight: "600",
      letterSpacing: "0.011em",
      color: `${ink} !important`,
      textDecoration: "none",
      whiteSpace: "nowrap",
    },
  },
  {
    ".rx-localnav-menu": {
      display: "flex",
      alignItems: "center",
      gap: "22px",
      fontSize: "12px",
    },
  },
  {
    ".rx-localnav-menu a:not(.rx-btn)": {
      color: `${ink} !important`,
      opacity: "0.88",
      textDecoration: "none",
      whiteSpace: "nowrap",
    },
  },
  { ".rx-localnav-menu a:not(.rx-btn):hover": { color: "var(--rx-link) !important", opacity: "1" } },
  {
    ".rx-localnav-menu .rx-btn": {
      minHeight: "28px",
      padding: "4px 12px",
      fontSize: "12px",
    },
  },
  // Ribbon
  {
    ".rx-ribbon": {
      padding: "14px 22px",
      background: "var(--rx-gray)",
      fontSize: "14px",
      letterSpacing: "-0.016em",
      textAlign: "center",
    },
  },
  { ".rx-ribbon a": { color: "var(--rx-link) !important" } },
  { ".rx-ribbon .rx-link": { minHeight: "0", fontSize: "14px" } },
  // End-of-page directory
  {
    ".rx-directory": {
      background: "var(--rx-gray)",
      paddingBlock: "clamp(48px, 6vw, 72px)",
    },
  },
  {
    ".rx-directory-head": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "20px",
      marginBottom: "36px",
    },
  },
  {
    ".rx-directory-head h2": {
      margin: "0",
      fontSize: "clamp(32px, 4vw, 40px)",
      fontWeight: "600",
      letterSpacing: "0",
    },
  },
  {
    ".rx-directory-head p": {
      margin: "0",
      fontSize: "14px",
      fontWeight: "600",
      color: muted,
    },
  },
  {
    ".rx-directory-grid": {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr",
      gap: "32px",
    },
  },
  {
    ".rx-directory h3": {
      margin: "0 0 14px",
      fontSize: "12px",
      fontWeight: "400",
      color: muted,
    },
  },
  {
    ".rx-directory ul": {
      display: "grid",
      gap: "8px",
      margin: "0",
      padding: "0",
      listStyle: "none",
    },
  },
  {
    ".rx-directory a": {
      color: `${ink} !important`,
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "600",
    },
  },
  {
    ".rx-directory-primary a": {
      fontSize: "clamp(21px, 2.3vw, 24px)",
      lineHeight: "1.3",
    },
  },
  { ".rx-directory a:hover": { color: "var(--rx-link) !important" } },
  {
    "@media (max-width: 734px)": [
      { ".rx-directory-grid": { gridTemplateColumns: "1fr 1fr" } },
      { ".rx-directory-primary": { gridColumn: "1 / -1" } },
      { ".rx-localnav-menu > a:not(.rx-btn)": { display: "none" } },
      { ".rx-localnav-title": { fontSize: "19px" } },
      { ".rx-shelf-track": { gap: "14px" } },
    ],
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      { ".rx-shelf-track": { scrollBehavior: "auto" } },
      { "a.rx-card:hover, .rx-card--lift:hover": { transform: "none" } },
    ],
  },
];

export default systemStyles;
