// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    ".product-detail": {
      "maxWidth": "1180px",
      "margin": "auto",
      "padding": "30px 40px 70px"
    }
  },
  {
    ".product-detail-breadcrumb": {
      "display": "flex",
      "gap": "12px",
      "fontSize": "11px",
      "color": "#686862",
      "marginBottom": "30px"
    }
  },
  {
    ".product-detail-breadcrumb a": {
      "textDecoration": "none"
    }
  },
  {
    ".product-detail-layout": {
      "display": "grid",
      "gridTemplateColumns": "minmax(280px, 326px) minmax(0, 1fr)",
      "gap": "7%",
      "alignItems": "start"
    }
  },
  {
    ".product-detail-gallery": {
      "position": "sticky",
      "top": "24px"
    }
  },
  {
    ".product-detail-photo": {
      "position": "relative",
      "display": "grid",
      "placeItems": "center",
      "width": "100%",
      "minHeight": "520px",
      "height": "min(58vw, 620px)",
      "padding": "20px",
      "border": "0",
      "borderRadius": "0",
      "background": "transparent",
      "color": "#555550",
      "cursor": "zoom-in",
      "overflow": "hidden"
    }
  },
  {
    ".product-detail-photo > svg": {
      "width": "100%",
      "height": "100%",
      "maxHeight": "560px",
      "transition": "transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)"
    }
  },
  {
    ".product-detail-photo:hover > svg": {
      "transform": "scale(1.025)"
    }
  },
  {
    ".product-detail-enlarge": {
      "position": "absolute",
      "bottom": "22px",
      "right": "24px",
      "display": "flex",
      "alignItems": "center",
      "gap": "16px",
      "fontSize": "11px"
    }
  },
  {
    ".product-detail-enlarge > span": {
      "fontSize": "24px",
      "fontWeight": "300"
    }
  },
  {
    ".product-detail-gallery > p": {
      "textAlign": "center",
      "fontSize": "10px",
      "color": "#757570",
      "margin": "18px 0"
    }
  },
  {
    ".product-detail-summary": {
      "padding": "24px 0"
    }
  },
  {
    ".product-detail-eyebrow": {
      "fontSize": "10px",
      "letterSpacing": "0.1em",
      "margin": "0 0 22px",
      "color": "#6b6b65"
    }
  },
  {
    ".product-detail-summary h1": {
      "fontSize": "clamp(30px, 3vw, 38px)",
      "lineHeight": "1.12",
      "fontWeight": "500",
      "letterSpacing": "-0.045em",
      "margin": "0 0 18px"
    }
  },
  {
    ".product-detail-summary h1:focus": {
      "outline": "none"
    }
  },
  {
    ".product-detail-tagline": {
      "fontSize": "15px",
      "lineHeight": "1.5",
      "margin": "0 0 24px"
    }
  },
  {
    ".product-detail-price": {
      "fontSize": "20px",
      "marginBottom": "36px"
    }
  },
  {
    ".product-detail-price span": {
      "display": "block",
      "fontSize": "10px",
      "color": "#6b6b65",
      "marginTop": "7px"
    }
  },
  {
    ".product-detail-finishes": {
      "padding": "20px 0",
      "borderTop": "1px solid #deded9"
    }
  },
  {
    ".product-detail-finishes h2": {
      "fontSize": "21px",
      "fontWeight": "500",
      "letterSpacing": "-0.035em",
      "margin": "0 0 12px"
    }
  },
  {
    ".product-detail-finishes > p": {
      "fontSize": "12px"
    }
  },
  {
    ".product-detail-finishes > p span": {
      "color": "#6b6b65"
    }
  },
  {
    ".product-detail-finishes nav": {
      "display": "flex",
      "gap": "12px",
      "margin": "22px 0"
    }
  },
  {
    ".product-detail-finishes a": {
      "display": "flex",
      "flexDirection": "column",
      "alignItems": "center",
      "gap": "9px",
      "padding": "8px",
      "minWidth": "64px",
      "textDecoration": "none",
      "fontSize": "10px"
    }
  },
  {
    ".product-detail-swatch": {
      "display": "block",
      "width": "30px",
      "height": "30px",
      "background": "var(--finish-color)",
      "border": "1px solid #77777740",
      "borderRadius": "50%",
      "outline": "1px solid transparent",
      "outlineOffset": "5px",
      "transition": "outline-color 0.2s"
    }
  },
  {
    ".product-detail-finishes [aria-current=\"page\"] .product-detail-swatch": {
      "outlineColor": "#777771"
    }
  },
  {
    ".product-detail-finishes a:hover .product-detail-swatch": {
      "outlineColor": "#b0b0aa"
    }
  },
  {
    ".product-detail-finishes small": {
      "fontSize": "10px",
      "color": "#74746e",
      "lineHeight": "1.6",
      "display": "block"
    }
  },
  {
    ".product-detail-zoom.MuiDialog-paper": {
      "background": "#eeedeb",
      "borderRadius": "24px",
      "padding": "50px"
    }
  },
  {
    ".product-detail-zoom > svg": {
      "width": "100%",
      "height": "70vh"
    }
  },
  {
    ".product-detail-zoom .MuiIconButton-root": {
      "position": "absolute",
      "right": "12px",
      "top": "12px",
      "color": "#151515"
    }
  },
  {
    ".product-detail-zoom :focus-visible": {
      "outline": "2px solid #777771"
    }
  },
  {
    "@media (max-width: 700px)": [
      {
        ".product-detail": {
          "padding": "22px 20px 44px"
        }
      },
      {
        ".product-detail-layout": {
          "gridTemplateColumns": "1fr",
          "gap": "8px"
        }
      },
      {
        ".product-detail-gallery": {
          "position": "static"
        }
      },
      {
        ".product-detail-photo": {
          "minHeight": "0",
          "height": "100vw",
          "maxHeight": "480px",
          "padding": "32px"
        }
      },
      {
        ".product-detail-summary": {
          "paddingTop": "18px"
        }
      },
      {
        ".product-detail-summary h1": {
          "fontSize": "40px"
        }
      },
      {
        ".product-detail-zoom.MuiDialog-paper": {
          "margin": "16px",
          "padding": "44px 20px"
        }
      },
      {
        ".product-detail-zoom > svg": {
          "height": "60vh"
        }
      }
    ]
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".product-detail *,\n  .product-detail-zoom *": {
          "animation": "none !important",
          "transition": "none !important"
        }
      }
    ]
  },
  {
    ".product-detail-zoom h2": {
      "fontSize": "13px",
      "fontWeight": "400",
      "margin": "0 0 16px"
    }
  },
  {
    ".product-detail-photo[data-view=\"detail\"] > svg": {
      "transform": "scale(1.55)"
    }
  },
  {
    ".product-detail-thumbnails": {
      "display": "flex",
      "gap": "18px",
      "justifyContent": "center",
      "marginTop": "20px"
    }
  },
  {
    ".product-detail-thumbnails button": {
      "width": "60px",
      "height": "68px",
      "padding": "6px",
      "background": "transparent",
      "border": "0",
      "borderBottom": "1px solid transparent",
      "cursor": "pointer"
    }
  },
  {
    ".product-detail-thumbnails button[aria-pressed=\"true\"]": {
      "borderBottomColor": "#777771"
    }
  },
  {
    ".product-detail-thumbnails button > span": {
      "display": "block",
      "width": "100%",
      "height": "100%",
      "overflow": "hidden"
    }
  },
  {
    ".product-detail-thumbnails svg": {
      "width": "100%",
      "height": "100%"
    }
  },
  {
    ".product-detail-thumbnail-detail svg": {
      "transform": "scale(1.55)"
    }
  },
  {
    "@media (max-width: 700px)": [
      {
        ".product-detail-gallery": {
          "gridRow": "1"
        }
      },
      {
        ".product-detail-photo": {
          "height": "90vw"
        }
      }
    ]
  },
  {
    ".product-purchase": {
      "fontSize": "13px",
      "lineHeight": "1.5"
    }
  },
  {
    ".product-purchase button": {
      "font": "inherit",
      "cursor": "pointer"
    }
  },
  {
    ".product-fulfilment": {
      "padding": "28px 0",
      "borderTop": "1px solid #d6d6d3",
      "display": "grid",
      "gap": "20px"
    }
  },
  {
    ".product-fulfilment > div": {
      "display": "flex",
      "alignItems": "flex-start",
      "gap": "10px"
    }
  },
  {
    ".product-fulfilment > div div": {
      "display": "grid"
    }
  },
  {
    ".product-fulfilment > div > svg,\n.product-help > svg": {
      "width": "22px",
      "height": "22px",
      "flexShrink": "0",
      "strokeWidth": "1"
    }
  },
  {
    ".product-fulfilment p": {
      "margin": "0",
      "color": "#686862"
    }
  },
  {
    ".product-fulfilment button,\n.product-save button,\n.product-help button": {
      "border": "0",
      "background": "transparent",
      "padding": "3px 0",
      "color": "#55564f",
      "display": "inline-flex",
      "alignItems": "center",
      "gap": "5px",
      "textAlign": "left"
    }
  },
  {
    ".product-fulfilment button:hover,\n.product-save button:hover,\n.product-help button:hover": {
      "color": "#111",
      "textDecoration": "underline",
      "textUnderlineOffset": "4px"
    }
  },
  {
    ".product-fulfilment button svg,\n.product-help button svg": {
      "width": "14px",
      "height": "14px"
    }
  },
  {
    ".product-purchase-buttons": {
      "display": "grid",
      "gap": "12px"
    }
  },
  {
    ".product-purchase-buttons .bag-button": {
      "borderRadius": "9px",
      "width": "100%",
      "justifyContent": "center",
      "display": "flex",
      "alignItems": "center",
      "gap": "8px",
      "minHeight": "44px",
      "background": "#e9e8e4",
      "color": "#222",
      "transition": "background 0.2s"
    }
  },
  {
    ".product-purchase-buttons .bag-button:hover": {
      "background": "#dfded9"
    }
  },
  {
    ".product-purchase-buttons .product-express": {
      "background": "#161616",
      "color": "#fff"
    }
  },
  {
    ".product-purchase-buttons .product-express:hover": {
      "background": "#303030"
    }
  },
  {
    ".product-express svg": {
      "width": "18px"
    }
  },
  {
    ".product-save": {
      "padding": "26px 0 30px"
    }
  },
  {
    ".product-save p": {
      "margin": "0 0 6px"
    }
  },
  {
    ".product-save svg": {
      "width": "17px",
      "height": "17px"
    }
  },
  {
    ".product-help": {
      "borderTop": "1px solid #d6d6d3",
      "paddingTop": "22px",
      "display": "flex",
      "gap": "8px",
      "alignItems": "center"
    }
  },
  {
    ".product-detail-information": {
      "marginTop": "50px",
      "borderTop": "1px solid #d6d6d3"
    }
  },
  {
    ".product-detail-information details": {
      "borderBottom": "1px solid #d6d6d3"
    }
  },
  {
    ".product-detail-information summary": {
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "space-between",
      "gap": "20px",
      "cursor": "pointer",
      "padding": "30px 0",
      "listStyle": "none"
    }
  },
  {
    ".product-detail-information summary::-webkit-details-marker": {
      "display": "none"
    }
  },
  {
    ".product-detail-information h2": {
      "margin": "0",
      "fontSize": "clamp(24px, 3vw, 32px)",
      "fontWeight": "500",
      "letterSpacing": "-0.04em"
    }
  },
  {
    ".product-detail-information summary > svg": {
      "color": "#888884",
      "width": "34px",
      "height": "34px",
      "transition": "transform 0.25s ease"
    }
  },
  {
    ".product-detail-information details[open] summary > svg": {
      "transform": "rotate(180deg)"
    }
  },
  {
    ".product-information-content": {
      "maxWidth": "700px",
      "padding": "0 0 30px",
      "fontSize": "14px",
      "lineHeight": "1.7",
      "color": "#686862"
    }
  },
  {
    ".product-information-content h3": {
      "color": "#222",
      "fontSize": "16px"
    }
  },
  {
    ".product-information-content dl": {
      "maxWidth": "360px"
    }
  },
  {
    ".product-information-content dl > div": {
      "display": "flex",
      "justifyContent": "space-between",
      "borderBottom": "1px solid #e6e6e2",
      "padding": "8px 0"
    }
  },
  {
    ".product-related": {
      "padding": "50px 0 0"
    }
  },
  {
    ".product-related > h2": {
      "textAlign": "center",
      "fontSize": "clamp(30px, 4vw, 40px)",
      "fontWeight": "500",
      "letterSpacing": "-0.045em",
      "margin": "0 0 40px"
    }
  },
  {
    ".product-related-gallery": {
      "display": "flex",
      "alignItems": "center",
      "gap": "8px"
    }
  },
  {
    ".product-related-gallery > .MuiIconButton-root": {
      "background": "#eeedeb",
      "width": "36px",
      "height": "36px",
      "flexShrink": "0"
    }
  },
  {
    ".product-related-gallery > .MuiIconButton-root:hover": {
      "background": "#e5e4e0"
    }
  },
  {
    ".product-related-grid": {
      "display": "grid",
      "gridTemplateColumns": "repeat(3, minmax(0, 1fr))",
      "flex": "1",
      "gap": "28px",
      "minWidth": "0"
    }
  },
  {
    ".product-related-card": {
      "textAlign": "center",
      "color": "inherit",
      "textDecoration": "none",
      "animation": "product-recommendation-enter 0.35s ease both"
    }
  },
  {
    ".product-related-card > svg": {
      "display": "block",
      "width": "100%",
      "height": "240px",
      "padding": "16px",
      "transition": "transform 0.3s ease"
    }
  },
  {
    ".product-related-card:hover > svg": {
      "transform": "translateY(-4px)"
    }
  },
  {
    ".product-related-finish": {
      "display": "block",
      "fontSize": "11px",
      "color": "#73736d",
      "margin": "18px 0 8px"
    }
  },
  {
    ".product-related-card h3": {
      "fontSize": "17px",
      "fontWeight": "500",
      "margin": "0"
    }
  },
  {
    ".product-related-card p": {
      "fontSize": "14px",
      "marginTop": "20px"
    }
  },
  {
    ".product-related-pagination": {
      "display": "flex",
      "justifyContent": "center",
      "paddingTop": "48px"
    }
  },
  {
    ".product-related-pagination button": {
      "background": "transparent",
      "border": "0",
      "display": "grid",
      "placeItems": "center",
      "width": "32px",
      "height": "44px",
      "cursor": "pointer"
    }
  },
  {
    ".product-related-pagination span": {
      "width": "7px",
      "height": "7px",
      "borderRadius": "50%",
      "background": "#aaa"
    }
  },
  {
    ".product-related-pagination [aria-current=\"page\"] span": {
      "background": "#333"
    }
  },
  {
    ".product-detail :focus-visible": {
      "outline": "2px solid #777771",
      "outlineOffset": "5px"
    }
  },
  {
    "@keyframes product-recommendation-enter": [
      {
        "from": {
          "opacity": "0",
          "transform": "translateY(8px)"
        }
      },
      {
        "to": {
          "opacity": "1",
          "transform": "none"
        }
      }
    ]
  },
  {
    "@media (max-width: 700px)": [
      {
        ".product-related-grid": {
          "gridTemplateColumns": "minmax(0, 1fr)"
        }
      },
      {
        ".product-related-card > svg": {
          "height": "240px"
        }
      },
      {
        ".product-detail-information summary": {
          "padding": "24px 0"
        }
      },
      {
        ".product-detail-information": {
          "marginTop": "30px"
        }
      }
    ]
  }
];

export default styles;
