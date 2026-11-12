// Product films and the range feature on the store page.
const styles = [
  {
    ".rx-film": {
      paddingBlock: "clamp(64px, 9vw, 120px)",
    },
  },
  {
    ".rx-film-head": {
      maxWidth: "720px",
      marginInline: "auto",
      marginBottom: "clamp(32px, 4vw, 56px)",
      textAlign: "center",
    },
  },
  {
    ".rx-film-head p": {
      margin: "12px 0 0",
      color: "var(--rx-muted)",
      fontSize: "clamp(19px, 2vw, 24px)",
      lineHeight: 1.3,
    },
  },
  {
    // The tone of the footage's backdrop, so nothing flashes before the poster.
    ".rx-film-frame": {
      position: "relative",
      aspectRatio: "16 / 9",
      overflow: "hidden",
      borderRadius: "clamp(16px, 2.4vw, 28px)",
      background: "#e6e3da",
    },
  },
  {
    ".rx-film-frame video": {
      display: "block",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  {
    ".rx-film-toggle": {
      position: "absolute",
      right: "clamp(12px, 1.6vw, 20px)",
      bottom: "clamp(12px, 1.6vw, 20px)",
      display: "grid",
      placeItems: "center",
      width: "44px",
      height: "44px",
      padding: 0,
      border: 0,
      borderRadius: "50%",
      color: "#1d1d1f",
      background: "rgba(255, 255, 255, 0.72)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      cursor: "pointer",
      transition:
        "background-color 160ms var(--ease-out), transform var(--press-duration) var(--ease-out)",
    },
  },
  { ".rx-film-toggle:hover": { background: "rgba(255, 255, 255, 0.92)" } },
  { ".rx-film-toggle:active": { transform: "scale(var(--press-scale))" } },
  {
    ".rx-film-toggle:focus-visible": {
      outline: "2px solid var(--rx-accent)",
      outlineOffset: "2px",
    },
  },
  {
    ".store-set": {
      display: "grid",
      gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)",
      alignItems: "center",
      gap: "clamp(24px, 4vw, 64px)",
      paddingBlock: "clamp(64px, 9vw, 120px)",
    },
  },
  {
    ".store-set-copy h2": { margin: "8px 0 12px" },
  },
  {
    ".store-set-copy p:not(.rx-new)": {
      margin: "0 0 20px",
      color: "var(--rx-muted)",
      fontSize: "clamp(17px, 1.6vw, 21px)",
      lineHeight: 1.35,
    },
  },
  {
    ".store-set-image": {
      display: "block",
      width: "100%",
      height: "auto",
      borderRadius: "clamp(16px, 2.4vw, 28px)",
      background: "#f4f1ea",
    },
  },
  {
    "@media (max-width: 734px)": [
      {
        ".store-set": { gridTemplateColumns: "minmax(0, 1fr)" },
      },
    ],
  },
];

export default styles;
