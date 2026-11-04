// Global navigation: a 44px translucent bar, flyout menus on desktop and a
// full-screen menu on compact screens.
const styles = [
  {
    ".rx-globalnav": {
      position: "sticky",
      top: "0",
      zIndex: "1000",
      background: "rgba(250, 250, 252, 0.8)",
      backdropFilter: "saturate(180%) blur(20px)",
      WebkitBackdropFilter: "saturate(180%) blur(20px)",
      transition: "background-color 240ms ease",
    },
  },
  {
    '.rx-globalnav[data-flyout="open"]': {
      background: "#fafafc",
    },
  },
  {
    ".rx-globalnav-bar": {
      position: "relative",
      zIndex: "2",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      height: "44px",
    },
  },
  {
    ".rx-globalnav-logo": {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      minHeight: "44px",
      color: "var(--rx-ink) !important",
      textDecoration: "none",
      fontSize: "13px",
      fontWeight: "600",
      letterSpacing: "0.12em",
      opacity: "0.88",
      transition: "opacity 200ms ease",
    },
  },
  { ".rx-globalnav-logo:hover": { opacity: "1" } },
  { ".rx-globalnav-logo svg": { fontSize: "20px" } },
  {
    ".rx-globalnav-list": {
      display: "flex",
      alignItems: "center",
      gap: "clamp(14px, 3vw, 36px)",
      margin: "0",
      padding: "0",
      listStyle: "none",
    },
  },
  {
    ".rx-globalnav-list li": {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
  },
  {
    ".rx-globalnav-list a": {
      display: "inline-flex",
      alignItems: "center",
      minHeight: "44px",
      color: "var(--rx-ink) !important",
      opacity: "0.8",
      textDecoration: "none",
      fontSize: "12px",
      letterSpacing: "-0.01em",
      transition: "opacity 200ms ease",
    },
  },
  {
    '.rx-globalnav-list a:hover, .rx-globalnav-list a[aria-current="true"]': {
      opacity: "1",
    },
  },
  {
    // Keyboard entry to each flyout; invisible until it has focus.
    ".rx-globalnav-submenu": {
      position: "absolute",
      right: "-16px",
      top: "50%",
      display: "grid",
      placeItems: "center",
      width: "16px",
      height: "16px",
      padding: "0",
      border: "0",
      background: "transparent",
      color: "var(--rx-ink)",
      opacity: "0",
      translate: "0 -50%",
      cursor: "pointer",
    },
  },
  { ".rx-globalnav-submenu:focus-visible": { opacity: "1" } },
  { ".rx-globalnav-submenu svg": { fontSize: "14px" } },
  {
    ".rx-globalnav-actions": {
      display: "flex",
      alignItems: "center",
      gap: "2px",
      marginRight: "-12px",
    },
  },
  {
    ".rx-globalnav-actions .MuiIconButton-root": {
      width: "40px",
      height: "44px",
      borderRadius: "10px",
      color: "var(--rx-ink)",
      opacity: "0.8",
    },
  },
  {
    ".rx-globalnav-actions .MuiIconButton-root:hover": {
      background: "transparent",
      opacity: "1",
    },
  },
  { ".rx-globalnav-actions .MuiSvgIcon-root": { fontSize: "19px" } },
  {
    ".preview-bag-badge .MuiBadge-badge": {
      minWidth: "15px",
      height: "15px",
      padding: "0 4px",
      background: "var(--rx-ink)",
      color: "#fff",
      fontSize: "9px",
      fontWeight: "600",
      top: "4px",
      right: "2px",
    },
  },
  // Flyout panel
  {
    ".rx-flyout": {
      position: "absolute",
      insetInline: "0",
      top: "44px",
      zIndex: "1",
      background: "#fafafc",
      clipPath: "inset(0 0 100% 0)",
      visibility: "hidden",
      transition:
        "clip-path 240ms var(--ease-out),\n    visibility 0s linear 240ms",
    },
  },
  {
    '.rx-flyout[data-open="true"]': {
      clipPath: "inset(0 0 -1px 0)",
      visibility: "visible",
      transition: "clip-path 320ms var(--ease-drawer),\n    visibility 0s",
    },
  },
  {
    ".rx-flyout-content": {
      display: "grid",
      gridTemplateColumns: "minmax(220px, 1.4fr) repeat(2, minmax(160px, 1fr))",
      gap: "clamp(32px, 6vw, 88px)",
      paddingBlock: "40px 84px",
      paddingInline: "clamp(0px, 10vw, 140px) 0",
    },
  },
  {
    ".rx-flyout h2": {
      margin: "0 0 14px",
      fontSize: "12px",
      fontWeight: "400",
      color: "var(--rx-muted)",
    },
  },
  {
    ".rx-flyout ul": {
      display: "grid",
      gap: "8px",
      margin: "0",
      padding: "0",
      listStyle: "none",
    },
  },
  {
    ".rx-flyout a": {
      color: "#333336 !important",
      textDecoration: "none",
      fontSize: "12px",
      fontWeight: "600",
    },
  },
  {
    ".rx-flyout-primary a": {
      color: "var(--rx-ink) !important",
      fontSize: "24px",
      lineHeight: "1.17",
      letterSpacing: "0.009em",
    },
  },
  { ".rx-flyout a:hover": { color: "var(--rx-link) !important" } },
  {
    "@media (prefers-reduced-motion: no-preference)": [
      {
        '.rx-flyout[data-open="true"] li': {
          animation: "rx-flyout-item 300ms var(--ease-out) both",
          animationDelay:
            "calc(var(--column) * 30ms + var(--order) * 18ms + 40ms)",
        },
      },
      {
        "@keyframes rx-flyout-item": [
          { from: { opacity: "0", transform: "translateY(-6px)" } },
          { to: { opacity: "1", transform: "none" } },
        ],
      },
    ],
  },
  {
    ".rx-globalnav-curtain": {
      position: "fixed",
      inset: "0",
      zIndex: "999",
      background: "rgba(232, 232, 237, 0.45)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      opacity: "0",
      visibility: "hidden",
      pointerEvents: "none",
      transition: "opacity 240ms ease,\n    visibility 0s linear 240ms",
    },
  },
  {
    '.rx-globalnav-curtain[data-open="true"]': {
      opacity: "1",
      visibility: "visible",
      pointerEvents: "auto",
      transition: "opacity 320ms ease,\n    visibility 0s",
    },
  },
  // Compact full-screen menu
  {
    ".preview-menu.MuiDialog-paper": {
      background: "transparent",
      color: "var(--rx-ink)",
      padding: "0 clamp(22px, 6vw, 48px) 32px",
      opacity: "1 !important",
      isolation: "isolate",
    },
  },
  {
    ".preview-menu::before": {
      content: '""',
      position: "fixed",
      inset: "0",
      zIndex: "-1",
      background: "#fafafc",
      clipPath: "inset(0 0 100%)",
      transition: "clip-path 0.42s var(--ease-drawer)",
    },
  },
  { '.preview-menu[data-open="true"]::before': { clipPath: "inset(0)" } },
  {
    ".preview-menu .preview-menu-toggle": {
      position: "fixed",
      background: "transparent",
      color: "var(--rx-ink)",
      border: "0",
    },
  },
  {
    ".preview-menu-content": {
      width: "100%",
      margin: "0 auto",
      padding: "72px 0 40px",
    },
  },
  {
    ".preview-menu-content h2": {
      margin: "0 0 18px",
      fontSize: "12px",
      fontWeight: "400",
      letterSpacing: "0",
      color: "var(--rx-muted)",
    },
  },
  {
    ".preview-menu-link": {
      display: "flex",
      alignItems: "baseline",
      gap: "10px",
      color: "inherit !important",
      textDecoration: "none",
      padding: "6px 0",
    },
  },
  { ".preview-menu-number, .preview-menu-link > svg": { display: "none" } },
  {
    ".preview-menu-link strong": {
      display: "block",
      fontSize: "28px",
      fontWeight: "600",
      letterSpacing: "0.007em",
      lineHeight: "1.14",
    },
  },
  {
    ".preview-menu-link small": {
      display: "block",
      marginTop: "2px",
      fontSize: "12px",
      color: "var(--rx-muted)",
    },
  },
  {
    ".preview-menu-bottom": {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      marginTop: "auto",
      paddingTop: "24px",
      fontSize: "12px",
      color: "var(--rx-muted)",
    },
  },
  {
    ".preview-menu-content,\n.preview-menu-bottom": {
      opacity: "0",
      transition: "opacity 0.16s ease",
    },
  },
  {
    '.preview-menu[data-open="true"] .preview-menu-content,\n.preview-menu[data-open="true"] .preview-menu-bottom':
      {
        opacity: "1",
        transitionDelay: "0.12s",
      },
  },
  {
    "@media (prefers-reduced-motion: no-preference)": [
      {
        '.preview-menu[data-open="true"] .preview-menu-link': {
          animation: "menu-link-enter 0.45s var(--ease-out) both",
          animationDelay: "calc(0.1s + var(--order) * 0.04s)",
        },
      },
      {
        "@keyframes menu-link-enter": [
          { from: { opacity: "0", transform: "translateY(-8px)" } },
          { to: { opacity: "1", transform: "translateY(0)" } },
        ],
      },
    ],
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".preview-menu *,\n  .preview-menu,\n  .preview-menu::before, .rx-flyout, .rx-globalnav-curtain":
          {
            animation: "none !important",
            transition: "none !important",
          },
      },
    ],
  },
  {
    "@media (max-width: 833px)": [
      { ".rx-globalnav-bar": { height: "48px" } },
      { ".rx-localnav": { top: "48px" } },
    ],
  },
];

export default styles;
