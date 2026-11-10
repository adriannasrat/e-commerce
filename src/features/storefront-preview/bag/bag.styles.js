import bagReviewStyles from "./bag-review.styles";
// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    ".bag-button": {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "44px",
      padding: "12px 28px",
      border: "1px solid #1d1d1f",
      borderRadius: "24px",
      background: "#1d1d1f",
      color: "#fff",
      font: "inherit",
      fontSize: "13px",
      textDecoration: "none",
      cursor: "pointer",
      transition: "background-color 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  {
    ".storefront-preview a.bag-button,\n.bag-panel a.bag-button": {
      color: "#fff",
    },
  },
  {
    ".bag-button:hover": {
      background: "#333336",
    },
  },
  {
    ".bag-page": {
      maxWidth: "1040px",
      margin: "auto",
      padding: "64px 40px 88px",
    },
  },
  {
    ".bag-page-heading": {
      textAlign: "center",
      paddingBottom: "52px",
    },
  },
  {
    ".bag-page-heading h1": {
      fontSize: "clamp(32px, 4vw, 52px)",
      lineHeight: "1.1",
      fontWeight: "400",
      letterSpacing: "-0.01em",
      margin: "0 0 18px",
    },
  },
  {
    ".bag-page-heading h1:focus": {
      outline: "none",
    },
  },
  {
    ".bag-page-heading p": {
      fontSize: "14px",
      marginBottom: "26px",
      color: "#6e6e73",
    },
  },
  {
    ".bag-page-heading small": {
      display: "block",
      marginTop: "16px",
      fontSize: "10px",
      color: "#6e6e73",
    },
  },
  {
    ".bag-row": {
      display: "grid",
      gridTemplateColumns: "160px minmax(0, 1fr) 80px 150px",
      gap: "28px",
      padding: "42px 0",
      borderTop: "1px solid #dcdcd7",
      alignItems: "start",
    },
  },
  {
    ".bag-row-image": {
      display: "block",
    },
  },
  {
    ".bag-row-image svg": {
      width: "100%",
      height: "180px",
    },
  },
  {
    ".bag-row-description a": {
      textDecoration: "none",
    },
  },
  {
    ".bag-row-description h2": {
      margin: "10px 0",
      fontSize: "27px",
      letterSpacing: "-0.01em",
      fontWeight: "500",
    },
  },
  {
    ".bag-row-description p": {
      fontSize: "12px",
      color: "#6e6e73",
      lineHeight: "1.6",
    },
  },
  {
    ".bag-row-tagline": {
      paddingTop: "18px",
    },
  },
  {
    ".bag-quantity": {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      fontSize: "10px",
      color: "#6e6e73",
    },
  },
  {
    ".bag-quantity select": {
      width: "72px",
      minHeight: "44px",
      border: "1px solid #d1d1cb",
      borderRadius: "8px",
      color: "#1d1d1f",
      background: "transparent",
      fontSize: "16px",
      padding: "6px",
    },
  },
  {
    ".bag-row-price": {
      textAlign: "right",
      paddingTop: "24px",
    },
  },
  {
    ".bag-row-price strong": {
      fontSize: "18px",
      fontWeight: "500",
      whiteSpace: "nowrap",
    },
  },
  {
    ".bag-row-price button": {
      display: "block",
      margin: "10px 0 0 auto",
      padding: "10px 0",
      border: "0",
      background: "transparent",
      font: "inherit",
      fontSize: "12px",
      textDecoration: "underline",
      textUnderlineOffset: "4px",
      cursor: "pointer",
      color: "#6e6e73",
    },
  },
  {
    ".bag-summary": {
      marginLeft: "188px",
      paddingTop: "32px",
      borderTop: "1px solid #dcdcd7",
    },
  },
  {
    ".bag-summary > div": {
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
      marginBottom: "14px",
      fontSize: "13px",
    },
  },
  {
    ".bag-summary > .bag-summary-total": {
      borderTop: "1px solid #dcdcd7",
      paddingTop: "24px",
      marginTop: "24px",
      fontSize: "23px",
    },
  },
  {
    ".bag-summary .bag-button": {
      width: "100%",
      marginTop: "18px",
    },
  },
  {
    ".bag-summary > a": {
      display: "block",
      textAlign: "center",
      fontSize: "12px",
      marginTop: "20px",
      textUnderlineOffset: "4px",
    },
  },
  {
    ".preview-bag-badge .MuiBadge-badge": {
      background: "#1d1d1f",
      color: "white",
      minWidth: "16px",
      height: "16px",
      padding: "0 4px",
      fontSize: "11px",
      border: "1px solid #f5f5f7",
    },
  },
  {
    ".bag-panel-dialog .MuiDialog-container": {
      alignItems: "flex-start",
    },
  },
  {
    ".bag-panel-dialog .MuiBackdrop-root": {
      background: "#15151520",
      backdropFilter: "blur(5px)",
    },
  },
  {
    ".bag-panel.MuiDialog-paper": {
      width: "100%",
      maxWidth: "none",
      margin: "0",
      maxHeight: "min(75vh, 650px)",
      borderRadius: "0 0 24px 24px",
      background: "#ffffff",
      color: "#1d1d1f",
    },
  },
  {
    ".bag-panel-inner": {
      position: "relative",
      width: "100%",
      maxWidth: "1040px",
      margin: "auto",
      padding: "64px 40px 40px",
    },
  },
  {
    ".bag-panel .bag-panel-close": {
      position: "absolute",
      top: "14px",
      right: "28px",
      color: "#1d1d1f",
    },
  },
  {
    ".bag-panel-heading": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
      marginBottom: "26px",
    },
  },
  {
    ".bag-panel-heading h2": {
      fontWeight: "400",
      fontSize: "32px",
      letterSpacing: "-0.01em",
      margin: "0",
    },
  },
  {
    ".bag-panel-items": {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
  },
  {
    ".bag-panel-items a": {
      display: "flex",
      alignItems: "center",
      gap: "22px",
      padding: "12px 0",
      color: "inherit",
      textDecoration: "none",
      fontSize: "12px",
    },
  },
  {
    ".bag-panel-items svg": {
      width: "56px",
      height: "64px",
      flexShrink: "0",
    },
  },
  {
    ".bag-panel-items strong": {
      fontWeight: "500",
      fontSize: "14px",
    },
  },
  {
    ".bag-panel-items small": {
      display: "block",
      marginTop: "6px",
      color: "#6e6e73",
    },
  },
  {
    ".bag-panel-items a > span:last-child": {
      marginLeft: "auto",
      whiteSpace: "nowrap",
    },
  },
  {
    ".bag-panel-total": {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: "18px",
      borderTop: "1px solid #d2d2d7",
      fontSize: "12px",
    },
  },
  {
    ".bag-panel-profile": {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      gap: "12px",
      marginTop: "30px",
      fontSize: "12px",
    },
  },
  {
    ".bag-panel-profile > span": {
      color: "#6e6e73",
      fontSize: "10px",
    },
  },
  {
    ".bag-panel a:not(.bag-button),\n.bag-panel-profile button": {
      color: "#383834",
    },
  },
  {
    ".bag-panel-profile button": {
      border: "0",
      background: "transparent",
      padding: "0",
      font: "inherit",
      cursor: "pointer",
    },
  },
  {
    ".bag-panel :focus-visible": {
      outline: "2px solid #6e6e73",
      outlineOffset: "4px",
    },
  },
  {
    ".bag-sr-only": {
      position: "absolute",
      width: "1px",
      height: "1px",
      overflow: "hidden",
      clipPath: "inset(50%)",
      whiteSpace: "nowrap",
    },
  },
  {
    ".product-detail-add": {
      width: "100%",
      margin: "10px 0 20px",
    },
  },
  {
    "@media (prefers-reduced-motion: no-preference)": [
      {
        '.bag-panel[data-open="true"] .bag-panel-inner': {
          animation:
            "bag-panel-enter 0.28s var(--ease-out) both",
        },
      },
      {
        "@keyframes bag-panel-enter": [
          {
            from: {
              opacity: "0",
              transform: "translateY(-12px)",
            },
          },
          {
            to: {
              opacity: "1",
              transform: "none",
            },
          },
        ],
      },
    ],
  },
  {
    "@media (max-width: 600px)": [
      {
        ".bag-page": {
          padding: "40px 20px 50px",
        },
      },
      {
        ".bag-row": {
          gridTemplateColumns: "90px minmax(0, 1fr) auto",
          gap: "16px",
          padding: "30px 0",
        },
      },
      {
        ".bag-row-image": {
          gridRow: "span 2",
        },
      },
      {
        ".bag-row-image svg": {
          height: "110px",
        },
      },
      {
        ".bag-row-description": {
          gridColumn: "2 / 4",
        },
      },
      {
        ".bag-row-description h2": {
          fontSize: "24px",
          marginTop: "0",
        },
      },
      {
        ".bag-row-tagline": {
          display: "none",
        },
      },
      {
        ".bag-row-price": {
          paddingTop: "22px",
        },
      },
      {
        ".bag-row-price strong": {
          fontSize: "15px",
        },
      },
      {
        ".bag-summary": {
          marginLeft: "0",
        },
      },
      {
        ".bag-panel-inner": {
          padding: "64px 20px 30px",
        },
      },
      {
        ".bag-panel-heading h2": {
          fontSize: "27px",
        },
      },
      {
        ".bag-panel-heading .bag-button": {
          padding: "10px 16px",
          fontSize: "12px",
        },
      },
      {
        ".bag-panel-items a": {
          gap: "12px",
        },
      },
    ],
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".bag-panel *,\n  .bag-page *,\n  .bag-button": {
          animation: "none !important",
          transition: "none !important",
        },
      },
    ],
  },
  {
    ".bag-panel-profile button": {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      minHeight: "30px",
    },
  },
  {
    ".bag-panel-profile button svg": {
      fontSize: "15px",
      color: "#6e6e73",
    },
  },
  {
    ".bag-panel-profile button:hover": {
      color: "#1d1d1f",
      textDecoration: "underline",
      textUnderlineOffset: "4px",
    },
  },
];

const bagStyles = [...styles, bagReviewStyles];

export default bagStyles;
