// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    ".preview-header-actions": {
      display: "flex",
      gap: "6px",
    },
  },
  {
    ".preview-header-actions .MuiIconButton-root": {
      background: "#fff",
      color: "#151515",
      transition: "background-color 0.25s ease",
    },
  },
  {
    ".preview-header-actions .MuiIconButton-root:hover": {
      background: "#e8e7e4",
    },
  },
  {
    ".preview-menu.MuiDialog-paper": {
      background: "#eeedeb",
      color: "#151515",
      padding: "32px 6vw",
    },
  },
  {
    ".preview-menu :focus-visible": {
      outline: "3px solid #a33e00",
      outlineOffset: "6px",
    },
  },
  {
    ".preview-menu-top,\n.preview-menu-bottom": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "24px",
    },
  },
  {
    ".preview-menu-top .MuiIconButton-root": {
      background: "#151515",
      color: "#fff",
      border: "2px solid #151515",
      transition: "background-color 0.2s ease,\n    color 0.2s ease",
    },
  },
  {
    ".preview-menu-top .MuiIconButton-root:hover": {
      background: "#292929",
      color: "#fff",
    },
  },
  {
    ".preview-menu-content": {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "108px 0 40px",
    },
  },
  {
    ".preview-menu-content h2": {
      fontSize: "11px",
      fontWeight: "400",
      letterSpacing: "0.12em",
      margin: "0 0 40px",
    },
  },
  {
    ".preview-menu-link": {
      display: "grid",
      gridTemplateColumns: "40px 1fr auto",
      alignItems: "center",
      gap: "24px",
      color: "inherit",
      textDecoration: "none",
      padding: "30px 0",
      borderTop: "1px solid #c8c8c1",
    },
  },
  {
    ".preview-menu-number": {
      fontSize: "11px",
      alignSelf: "start",
      paddingTop: "12px",
    },
  },
  {
    ".preview-menu-link strong": {
      display: "block",
      fontSize: "clamp(32px, 5vw, 60px)",
      fontWeight: "400",
      letterSpacing: "-0.065em",
      lineHeight: "1.1",
      transition: "transform 0.3s ease",
    },
  },
  {
    ".preview-menu-link small": {
      display: "block",
      fontSize: "12px",
      marginTop: "14px",
    },
  },
  {
    ".preview-menu-link > svg": {
      fontSize: "32px",
      color: "#70706b",
      transition: "transform 0.3s ease",
    },
  },
  {
    ".preview-menu-link:hover strong": {
      transform: "translateX(8px)",
    },
  },
  {
    ".preview-menu-link:hover > svg": {
      transform: "translate(5px, -5px)",
    },
  },
  {
    ".preview-menu-bottom": {
      marginTop: "auto",
      borderTop: "1px solid #c8c8c1",
      paddingTop: "24px",
      fontSize: "9px",
      letterSpacing: "0.09em",
    },
  },
  {
    "@media (prefers-reduced-motion: no-preference)": [
      {
        '.preview-menu[data-open="true"] .preview-menu-link': {
          animation:
            "menu-link-enter 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) both",
          animationDelay: "calc(0.18s + var(--order) * 0.1s)",
        },
      },
      {
        "@keyframes menu-link-enter": [
          {
            from: {
              opacity: "0",
              transform: "translateY(35px)",
            },
          },
          {
            to: {
              opacity: "1",
              transform: "translateY(0)",
            },
          },
        ],
      },
    ],
  },
  {
    "@media (max-width: 600px)": [
      {
        ".preview-header-actions": {
          gap: "0",
        },
      },
      {
        ".preview-menu.MuiDialog-paper": {
          padding: "20px",
        },
      },
      {
        ".preview-menu-link": {
          gridTemplateColumns: "20px 1fr auto",
          gap: "10px",
        },
      },
      {
        ".preview-menu-link strong": {
          fontSize: "clamp(24px, 6.5vw, 32px)",
        },
      },
      {
        ".preview-menu-link > svg": {
          fontSize: "24px",
        },
      },
      {
        ".preview-menu-bottom": {
          alignItems: "flex-start",
          flexDirection: "column",
          gap: "12px",
        },
      },
    ],
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".preview-menu *,\n  .preview-menu": {
          animation: "none !important",
          transition: "none !important",
        },
      },
    ],
  },
  {
    ".preview-header": {
      gridTemplateColumns: "1fr auto 1fr",
      gap: "24px",
    },
  },
  {
    ".preview-desktop-navigation": {
      display: "flex",
      alignItems: "center",
      gap: "28px",
    },
  },
  {
    ".preview-desktop-navigation a": {
      color: "#151515",
      textDecoration: "none",
      fontSize: "13px",
      padding: "14px 0",
      transition: "color 0.2s ease",
    },
  },
  {
    ".preview-desktop-navigation a:hover": {
      color: "#555550",
    },
  },
  {
    "@media (max-width: 900px)": [
      {
        ".preview-header": {
          gridTemplateColumns: "auto 1fr",
          gap: "12px",
        },
      },
    ],
  },
  {
    ".preview-header > .preview-wordmark": {
      background: "transparent",
      justifySelf: "start",
    },
  },
  {
    "@media (max-width: 600px)": [
      {
        ".preview-header": {
          height: "64px",
          gridTemplateColumns: "auto 1fr",
          gap: "6px",
          padding: "0 10px",
        },
      },
      {
        ".preview-header .preview-wordmark": {
          justifySelf: "start",
          fontSize: "clamp(13px, 3.5vw, 18px)",
        },
      },
      {
        ".preview-header-actions .MuiIconButton-root": {
          width: "36px",
          height: "44px",
          background: "transparent",
        },
      },
      {
        ".preview-header-actions .MuiSvgIcon-root": {
          fontSize: "18px",
        },
      },
      {
        ".preview-header-actions .MuiIconButton-root:hover": {
          background: "#e8e7e4",
        },
      },
      {
        ".preview-menu-top .MuiIconButton-root": {
          width: "36px",
          height: "44px",
          border: "0",
          background: "transparent",
          color: "#151515",
        },
      },
      {
        ".preview-menu-top .MuiIconButton-root:hover": {
          background: "#e8e7e4",
        },
      },
    ],
  },
  {
    ".preview-menu.MuiDialog-paper": {
      background: "transparent",
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
      background: "#eeedeb",
      clipPath: "inset(0 0 100%)",
      transition: "clip-path 0.42s cubic-bezier(0.22, 0.7, 0.2, 1)",
    },
  },
  {
    '.preview-menu[data-open="true"]::before': {
      clipPath: "inset(0)",
    },
  },
  {
    ".preview-menu .preview-menu-toggle": {
      position: "fixed",
      background: "transparent",
      color: "#151515",
      border: "0",
    },
  },
  {
    ".preview-menu .preview-menu-toggle:hover": {
      background: "#e8e7e4",
      color: "#151515",
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
        transitionDelay: "0.16s",
      },
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".preview-menu::before": {
          transition: "none",
        },
      },
    ],
  },
];

export default styles;
