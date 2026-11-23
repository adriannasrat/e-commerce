// The loading bar and the button spinner. Both run as CSS animations, which
// stay smooth while the page is busy loading. With reduced motion they pulse
// in place instead of moving.
const loadingStyles = [
  {
    ".rx-loading-bar": {
      position: "fixed",
      inset: "0 0 auto",
      zIndex: 2000,
      height: "3px",
      overflow: "hidden",
      pointerEvents: "none",
      opacity: 0,
      transition: "opacity 200ms var(--ease-out)",
    },
  },
  { ".rx-loading-bar[data-shown='true']": { opacity: 1 } },
  {
    ".rx-loading-bar::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      width: "40%",
      borderRadius: "0 3px 3px 0",
      background: "var(--rx-accent)",
      animation: "rx-loading-slide 1.2s var(--ease-in-out) infinite",
    },
  },
  {
    "@keyframes rx-loading-slide": {
      from: { transform: "translateX(-100%)" },
      to: { transform: "translateX(250%)" },
    },
  },
  {
    ".rx-spinner": {
      display: "inline-block",
      flex: "none",
      width: "1em",
      height: "1em",
      marginRight: "10px",
      border: "2px solid currentColor",
      borderRightColor: "transparent",
      borderRadius: "50%",
      verticalAlign: "-0.15em",
      animation: "rx-spin 700ms linear infinite",
    },
  },
  // Buttons that space their icon with a gap, and the arrow button that holds
  // only the spinner, need no margin of their own.
  { ".sign-in-submit .rx-spinner, .sign-in-demo-button .rx-spinner, .cp-field button .rx-spinner": { marginRight: 0 } },
  { "@keyframes rx-spin": { to: { transform: "rotate(360deg)" } } },
  { "@keyframes rx-pulse": { from: { opacity: 1 }, to: { opacity: 0.35 } } },
  {
    "@media (prefers-reduced-motion: reduce)": {
      ".rx-loading-bar::before": { width: "100%", animation: "rx-pulse 900ms ease infinite alternate" },
      ".rx-spinner": { borderRightColor: "currentColor", animation: "rx-pulse 900ms ease infinite alternate" },
    },
  },
];

export default loadingStyles;
