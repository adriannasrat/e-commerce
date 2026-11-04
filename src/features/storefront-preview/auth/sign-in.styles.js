// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    ".resonance-sign-in": {
      padding: "clamp(20px, 4vw, 64px)",
      background:
        "radial-gradient(ellipse at 15% 30%, #d8d0c7, transparent 60%), #eeedeb",
    },
  },
  {
    ".sign-in-card": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      maxWidth: "1180px",
      margin: "auto",
      minHeight: "710px",
      background: "#25231f",
      borderRadius: "36px",
      boxShadow: "0 24px 48px -30px #25231f70",
    },
  },
  {
    ".sign-in-art": {
      position: "relative",
      isolation: "isolate",
      overflow: "hidden",
      minWidth: "0",
      borderRadius: "36px 0 0 36px",
      color: "#f7f7f5",
      background:
        "radial-gradient(\n    ellipse at 55% 70%,\n    #514b40 0,\n    #292620 50%,\n    #25231f 80%\n  )",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  {
    ".sign-in-art-eyebrow": {
      margin: "40px 20px 0",
      fontSize: "11px",
      letterSpacing: "0.13em",
      color: "#d0cec7",
      textAlign: "center",
    },
  },
  {
    ".sign-in-art h2": {
      margin: "66px 24px 0",
      fontSize: "clamp(42px, 4.6vw, 68px)",
      lineHeight: "0.95",
      letterSpacing: "-0.065em",
      fontWeight: "500",
      textAlign: "center",
      zIndex: "1",
    },
  },
  {
    ".sign-in-orbits": {
      position: "absolute",
      width: "280px",
      height: "280px",
      top: "84px",
      border: "1px solid #ffffff0d",
      borderRadius: "50%",
    },
  },
  {
    ".sign-in-orbits::before,\n.sign-in-orbits::after": {
      content: '""',
      position: "absolute",
      inset: "25px",
      border: "1px solid #ffffff0d",
      borderRadius: "50%",
    },
  },
  {
    ".sign-in-orbits::after": {
      inset: "-25px",
    },
  },
  {
    ".sign-in-headphones": {
      display: "block",
      width: "85%",
      height: "385px",
      margin: "18px auto 24px",
      transform: "rotate(-12deg)",
      filter: "drop-shadow(0 25px 18px #0005)",
    },
  },
  {
    ".sign-in-art-caption": {
      display: "flex",
      justifyContent: "space-between",
      gap: "12px",
      width: "100%",
      padding: "0 30px 28px",
      marginTop: "auto",
      fontSize: "10px",
      letterSpacing: "0.08em",
      color: "#c4c1b8",
    },
  },
  {
    ".sign-in-panel": {
      minWidth: "0",
      background: "#fdfdfb",
      borderRadius: "36px",
      padding: "36px",
      display: "flex",
      flexDirection: "column",
    },
  },
  {
    ".sign-in-panel-top,\n.sign-in-panel-bottom": {
      display: "flex",
      justifyContent: "space-between",
      gap: "16px",
      alignItems: "center",
    },
  },
  {
    ".sign-in-brand": {
      fontWeight: "800",
      letterSpacing: "-0.07em",
      fontSize: "20px",
      textDecoration: "none",
    },
  },
  {
    ".sign-in-text-button": {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      border: "0",
      background: "transparent",
      padding: "10px 0",
      color: "#5b5b57",
      font: "inherit",
      fontSize: "11px",
      cursor: "pointer",
      minHeight: "44px",
    },
  },
  {
    ".sign-in-text-button:hover": {
      color: "#151515",
      textDecoration: "underline",
      textUnderlineOffset: "4px",
    },
  },
  {
    ".sign-in-text-button svg": {
      width: "17px",
      height: "17px",
    },
  },
  {
    ".sign-in-form-area": {
      width: "100%",
      maxWidth: "340px",
      margin: "auto",
      padding: "36px 0 24px",
    },
  },
  {
    ".sign-in-kicker": {
      fontSize: "11px",
      letterSpacing: "0.14em",
      color: "#777770",
      margin: "0 0 16px",
    },
  },
  {
    ".sign-in-form-area h1": {
      fontSize: "clamp(38px, 4vw, 50px)",
      fontWeight: "400",
      letterSpacing: "-0.065em",
      lineHeight: "1.1",
      margin: "0 0 14px",
    },
  },
  {
    ".sign-in-form-area h1:focus": {
      outline: "none",
    },
  },
  {
    ".sign-in-intro": {
      fontSize: "12px",
      color: "#73736c",
      margin: "0 0 30px",
    },
  },
  {
    ".sign-in-field": {
      display: "block",
      fontSize: "11px",
      color: "#55554e",
      margin: "0 0 8px",
    },
  },
  {
    ".sign-in-field input,\n.sign-in-password input": {
      width: "100%",
      border: "1px solid #deded9",
      background: "transparent",
      borderRadius: "28px",
      minHeight: "48px",
      padding: "12px 18px",
      color: "#151515",
      font: "inherit",
      fontSize: "12px",
      transition: "border-color 0.2s,\n    background 0.2s",
    },
  },
  {
    ".sign-in-field input": {
      display: "block",
      margin: "8px 0 18px",
    },
  },
  {
    ".sign-in-field input:hover,\n.sign-in-password input:hover": {
      borderColor: "#aaa9a1",
    },
  },
  {
    ".sign-in-password": {
      position: "relative",
    },
  },
  {
    ".sign-in-password input": {
      paddingRight: "50px",
    },
  },
  {
    ".sign-in-password .MuiIconButton-root": {
      position: "absolute",
      right: "3px",
      top: "2px",
      color: "#84847d",
    },
  },
  {
    ".sign-in-password svg": {
      width: "18px",
      height: "18px",
    },
  },
  {
    ".sign-in-forgot": {
      color: "#5b5b57",
      margin: "4px 0 12px 14px",
    },
  },
  {
    ".sign-in-submit": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "9px",
      minHeight: "48px",
      width: "100%",
      border: "0",
      borderRadius: "28px",
      background: "#151515",
      color: "#fff",
      font: "inherit",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 200ms ease,\n    scale var(--press-duration) var(--ease-out)",
    },
  },
  {
    ".sign-in-submit:hover": {
      background: "#303030",
    },
  },
  {
    ".sign-in-submit:active": {},
  },
  {
    ".sign-in-submit svg": {
      width: "18px",
      height: "18px",
    },
  },
  {
    ".sign-in-demo": {
      color: "#76766e",
      fontSize: "10px",
      textAlign: "center",
      marginTop: "16px",
    },
  },
  {
    ".sign-in-feedback": {
      fontSize: "12px",
      lineHeight: "1.6",
      color: "#5b5b57",
      margin: "16px 0 0",
    },
  },
  {
    ".sign-in-panel-bottom": {
      fontSize: "11px",
      color: "#777770",
    },
  },
  {
    ".sign-in-panel-bottom a": {
      display: "flex",
      alignItems: "center",
      gap: "7px",
      minHeight: "44px",
      textDecoration: "none",
    },
  },
  {
    ".sign-in-panel-bottom a:hover": {
      textDecoration: "underline",
    },
  },
  {
    ".sign-in-panel-bottom svg": {
      width: "14px",
      height: "14px",
    },
  },
  {
    ".sign-in-panel-bottom > span": {
      fontSize: "10px",
      letterSpacing: "0.08em",
    },
  },
  {
    "@media (max-width: 850px)": [
      {
        ".sign-in-panel": {
          padding: "26px",
        },
      },
      {
        ".sign-in-art-caption": {
          flexDirection: "column",
        },
      },
      {
        ".sign-in-panel-bottom > span": {
          display: "none",
        },
      },
    ],
  },
  {
    "@media (max-width: 650px)": [
      {
        ".resonance-sign-in": {
          padding: "16px",
        },
      },
      {
        ".sign-in-card": {
          gridTemplateColumns: "1fr",
          minHeight: "auto",
          borderRadius: "24px",
        },
      },
      {
        ".sign-in-art": {
          minHeight: "205px",
          borderRadius: "24px 24px 0 0",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "24px",
        },
      },
      {
        ".sign-in-art-eyebrow": {
          margin: "0 0 14px",
          fontSize: "10px",
          maxWidth: "52%",
          textAlign: "left",
        },
      },
      {
        ".sign-in-art h2": {
          fontSize: "clamp(30px, 7vw, 44px)",
          textAlign: "left",
          margin: "0",
        },
      },
      {
        ".sign-in-headphones": {
          position: "absolute",
          right: "-8px",
          top: "10px",
          width: "47%",
          height: "190px",
          margin: "0",
        },
      },
      {
        ".sign-in-art-caption": {
          display: "none",
        },
      },
      {
        ".sign-in-orbits": {
          width: "170px",
          height: "170px",
          top: "20px",
          right: "0",
        },
      },
      {
        ".sign-in-panel": {
          borderRadius: "24px",
          padding: "24px",
        },
      },
      {
        ".sign-in-form-area": {
          padding: "42px 0 24px",
        },
      },
    ],
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".resonance-sign-in *,\n  .resonance-sign-in *::before,\n  .resonance-sign-in *::after":
          {
            animation: "none !important",
            transition: "none !important",
          },
      },
    ],
  },
  {
    ".sign-in-panel .sign-in-text-button": {
      textDecoration: "none",
    },
  },
  {
    ".sign-in-panel .sign-in-text-button:hover": {
      textDecoration: "underline",
    },
  },
  {
    ".storefront-preview .resonance-sign-in :focus-visible": {
      outline: "2px solid #777771",
      outlineOffset: "4px",
    },
  },
  {
    ".storefront-preview .resonance-sign-in input:focus": {
      outline: "2px solid #777771",
      outlineOffset: "2px",
      borderColor: "#777771",
      background: "#f7f7f5",
    },
  },
  {
    ".storefront-preview .resonance-sign-in h1:focus": {
      outline: "none",
    },
  },
  {
    ".sign-in-confirm": {
      marginTop: "18px",
    },
  },
];

export default styles;
