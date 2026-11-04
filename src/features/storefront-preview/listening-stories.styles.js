// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    ".listening-stories": {
      padding: "80px 0 54px",
      background: "#f5f5f7",
    },
  },
  {
    ".listening-heading": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "end",
      gap: "32px",
      padding: "0 40px 44px",
    },
  },
  {
    ".listening-eyebrow": {
      display: "block",
      fontSize: "10px",
      letterSpacing: "0.08em",
      lineHeight: "1.5",
      margin: "0 0 20px",
    },
  },
  {
    ".listening-heading h1": {
      fontSize: "clamp(40px, 5.5vw, 80px)",
      fontWeight: "400",
      letterSpacing: "-0.01em",
      lineHeight: "1",
      margin: "0",
    },
  },
  {
    ".listening-heading > p": {
      fontSize: "13px",
      lineHeight: "1.7",
      margin: "0",
      color: "#6e6e73",
    },
  },
  {
    ".listening-track": {
      position: "relative",
      display: "flex",
      gap: "20px",
      overflowX: "auto",
      scrollSnapType: "x mandatory",
      scrollPaddingInline: "40px",
      padding: "8px 40px 24px",
      scrollbarWidth: "none",
    },
  },
  {
    ".listening-track::-webkit-scrollbar": {
      display: "none",
    },
  },
  {
    ".listening-card": {
      position: "relative",
      flex: "0 0 39%",
      minWidth: "300px",
      minHeight: "550px",
      border: "0",
      borderRadius: "28px",
      padding: "32px",
      textAlign: "left",
      font: "inherit",
      color: "#1d1d1f",
      cursor: "pointer",
      scrollSnapAlign: "start",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
  },
  {
    ".listening-chalk": {
      background: "#ffffff",
      color: "#1d1d1f",
    },
  },
  {
    ".listening-graphite": {
      background: "#242523",
      color: "#f5f5f0",
    },
  },
  {
    ".listening-silver": {
      background: "#d2d2d7",
      color: "#1d1d1f",
    },
  },
  {
    ".listening-card-title": {
      whiteSpace: "pre-line",
      fontSize: "clamp(30px, 3.4vw, 48px)",
      fontWeight: "400",
      letterSpacing: "-0.01em",
      lineHeight: "1.04",
      margin: "0",
    },
  },
  {
    ".listening-card > svg": {
      width: "100%",
      height: "310px",
      margin: "24px 0",
      filter: "drop-shadow(0 20px 20px #00000018)",
      transform: "rotate(-8deg)",
      transition: "transform 500ms var(--ease-out)",
    },
  },
  {
    ".listening-graphite > svg": {
      transform: "rotate(8deg)",
    },
  },
  {
    ".listening-card-footer": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "14px",
      marginTop: "auto",
      fontSize: "12px",
    },
  },
  {
    ".listening-plus": {
      width: "36px",
      height: "36px",
      display: "grid",
      placeItems: "center",
      borderRadius: "50%",
      border: "1px solid #a5a5a070",
      flexShrink: "0",
      transition: "background-color 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  {
    ".listening-plus svg": {
      fontSize: "20px",
    },
  },
  {
    ".listening-controls": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 40px",
    },
  },
  {
    ".listening-controls > span": {
      fontSize: "11px",
      letterSpacing: "0.08em",
      color: "#666660",
    },
  },
  {
    ".listening-controls .MuiIconButton-root": {
      background: "#e0dfdc",
      color: "#42423e",
      marginLeft: "8px",
    },
  },
  {
    ".listening-controls .MuiIconButton-root:hover": {
      background: "#d7d6d2",
    },
  },
  {
    ".listening-controls .Mui-disabled": {
      opacity: "0.35",
    },
  },
  {
    ".listening-detail.MuiDialog-paper": {
      borderRadius: "28px",
      background: "#f5f5f2",
      color: "#1d1d1f",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
    },
  },
  {
    ".listening-detail .listening-detail-close": {
      position: "absolute",
      top: "12px",
      right: "12px",
      zIndex: "1",
      background: "#f5f5f7",
      color: "#1d1d1f",
    },
  },
  {
    ".listening-detail-image": {
      display: "grid",
      placeItems: "center",
      padding: "42px",
    },
  },
  {
    ".listening-detail-image svg": {
      width: "100%",
      height: "360px",
    },
  },
  {
    ".listening-detail-copy": {
      padding: "70px 36px 48px",
    },
  },
  {
    ".listening-detail-copy h2": {
      whiteSpace: "pre-line",
      fontSize: "42px",
      lineHeight: "1.05",
      letterSpacing: "-0.01em",
      fontWeight: "400",
      margin: "0 0 24px",
    },
  },
  {
    ".listening-detail-copy > p:not(.listening-eyebrow)": {
      fontSize: "14px",
      lineHeight: "1.7",
      color: "#6e6e73",
    },
  },
  {
    ".listening-detail-copy a": {
      display: "inline-block",
      background: "#1d1d1f",
      color: "white",
      borderRadius: "24px",
      padding: "14px 20px",
      marginTop: "16px",
      fontSize: "12px",
      textDecoration: "none",
      transition: "background-color 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  {
    ".listening-detail-copy a:hover": {
      background: "#333336",
    },
  },
  {
    ".listening-detail :focus-visible": {
      outline: "2px solid #6e6e73",
      outlineOffset: "4px",
    },
  },
  {
    "@media (hover: hover)": [
      {
        ".listening-card:hover > svg": {
          transform: "translateY(-8px) rotate(0) scale(1.04)",
        },
      },
      {
        ".listening-card:hover .listening-plus": {
          background: "#99999918",
        },
      },
    ],
  },
  {
    "@media (max-width: 600px)": [
      {
        ".listening-stories": {
          padding: "52px 0 32px",
        },
      },
      {
        ".listening-heading": {
          padding: "0 20px 28px",
          flexDirection: "column",
          alignItems: "start",
          gap: "22px",
        },
      },
      {
        ".listening-track": {
          paddingInline: "20px",
          scrollPaddingInline: "20px",
          gap: "14px",
        },
      },
      {
        ".listening-card": {
          flexBasis: "86%",
          minWidth: "0",
          minHeight: "470px",
          padding: "26px",
          borderRadius: "22px",
        },
      },
      {
        ".listening-card > svg": {
          height: "250px",
        },
      },
      {
        ".listening-controls": {
          paddingInline: "20px",
        },
      },
      {
        ".listening-detail.MuiDialog-paper": {
          gridTemplateColumns: "1fr",
          margin: "16px",
          width: "calc(100% - 32px)",
        },
      },
      {
        ".listening-detail-image": {
          padding: "32px",
        },
      },
      {
        ".listening-detail-image svg": {
          height: "210px",
        },
      },
      {
        ".listening-detail-copy": {
          padding: "28px",
        },
      },
      {
        ".listening-detail-copy h2": {
          fontSize: "34px",
        },
      },
    ],
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".listening-stories *,\n  .listening-detail *": {
          animation: "none !important",
          transition: "none !important",
          scrollBehavior: "auto !important",
        },
      },
    ],
  },
  {
    ".listening-card:focus-visible": {
      outlineOffset: "-5px",
    },
  },
  {
    ".listening-detail .listening-detail-close:hover": {
      background: "#e3e2df",
    },
  },
];

export default styles;
