// The loading bar and the level-meter bars. Both run as CSS animations, which
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
  // Three bars that rise and fall like a level meter, after "silent-lion-21"
  // by aryamitra06 on uiverse.io (MIT). Sized in em, so the same bars fit a
  // button or the page, and drawn in the text colour of wherever they sit.
  {
    ".rx-spinner": {
      display: "inline-flex",
      flex: "none",
      alignItems: "center",
      gap: "0.15em",
      height: "1em",
      marginRight: "10px",
      verticalAlign: "-0.15em",
    },
  },
  {
    ".rx-spinner > i": {
      width: "0.15em",
      minWidth: "2px",
      height: "0.57em",
      borderRadius: "0.15em",
      background: "currentColor",
      opacity: 0.5,
      animation: "rx-level 1s linear infinite",
    },
  },
  { ".rx-spinner > i:nth-child(2)": { height: "1em", animationDelay: "0.25s" } },
  { ".rx-spinner > i:nth-child(3)": { animationDelay: "0.5s" } },
  { ".rx-spinner--large": { fontSize: "35px", margin: 0 } },
  // Buttons that space their icon with a gap, and the arrow button that holds
  // only the bars, need no margin of their own.
  { ".sign-in-submit .rx-spinner, .sign-in-demo-button .rx-spinner, .cp-field button .rx-spinner": { marginRight: 0 } },
  {
    "@keyframes rx-level": {
      "20%": { opacity: 1, transform: "scaleY(1.5)" },
      "40%": { transform: "scaleY(1)" },
    },
  },
  { "@keyframes rx-pulse": { from: { opacity: 1 }, to: { opacity: 0.35 } } },
  {
    "@media (prefers-reduced-motion: reduce)": {
      ".rx-loading-bar::before": { width: "100%", animation: "rx-pulse 900ms ease infinite alternate" },
      ".rx-spinner > i": { animation: "rx-pulse 900ms ease infinite alternate" },
    },
  },
];

export default loadingStyles;
