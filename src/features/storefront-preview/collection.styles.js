// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    ".preview-hero .preview-hero-bottom": {
      "position": "absolute",
      "left": "40px",
      "bottom": "32px",
      "width": "24%",
      "margin": "0",
      "display": "block"
    }
  },
  {
    ".preview-product-info .preview-eyebrow": {
      "fontSize": "9px",
      "margin": "0 0 12px",
      "textTransform": "uppercase"
    }
  },
  {
    ".preview-product-info h2": {
      "margin": "0",
      "fontSize": "32px",
      "lineHeight": "1",
      "letterSpacing": "-0.05em"
    }
  },
  {
    ".preview-product-info > p:not(.preview-eyebrow)": {
      "fontSize": "12px",
      "lineHeight": "1.5",
      "margin": "10px 0"
    }
  },
  {
    ".preview-demo-price": {
      "fontWeight": "700"
    }
  },
  {
    ".preview-demo-price span": {
      "fontSize": "9px",
      "color": "#62625c",
      "marginLeft": "6px",
      "fontWeight": "400"
    }
  },
  {
    ".preview-collection": {
      "padding": "70px 40px 38px",
      "scrollMarginTop": "24px"
    }
  },
  {
    ".preview-collection-heading": {
      "display": "flex",
      "justifyContent": "space-between",
      "alignItems": "end",
      "gap": "24px",
      "marginBottom": "48px"
    }
  },
  {
    ".preview-collection-heading h2": {
      "margin": "0",
      "fontSize": "clamp(40px, 5.5vw, 80px)",
      "fontWeight": "400",
      "letterSpacing": "-0.065em",
      "lineHeight": "1"
    }
  },
  {
    ".preview-collection-heading p": {
      "fontSize": "13px",
      "lineHeight": "1.6"
    }
  },
  {
    ".preview-product-grid": {
      "display": "grid",
      "gridTemplateColumns": "repeat(3, minmax(0, 1fr))",
      "gap": "1px",
      "background": "#d9d9d6",
      "border": "1px solid #d9d9d6"
    }
  },
  {
    ".preview-product-card": {
      "display": "flex",
      "flexDirection": "column",
      "alignItems": "center",
      "textAlign": "center",
      "background": "#fff",
      "padding": "28px 24px",
      "minWidth": "0"
    }
  },
  {
    ".preview-card-image": {
      "display": "grid",
      "placeItems": "center",
      "width": "100%",
      "aspectRatio": "1",
      "padding": "26px"
    }
  },
  {
    ".preview-card-image svg": {
      "width": "100%",
      "height": "100%",
      "minHeight": "0",
      "filter": "drop-shadow(0 12px 10px #00000010)",
      "transition": "transform 0.4s ease"
    }
  },
  {
    ".preview-card-image:hover svg": {
      "transform": "translateY(-3px)"
    }
  },
  {
    ".preview-product-card .preview-card-finish": {
      "margin": "8px 0 12px",
      "fontSize": "10px",
      "color": "#666660"
    }
  },
  {
    ".preview-product-card h3": {
      "margin": "0",
      "fontSize": "20px",
      "fontWeight": "500",
      "letterSpacing": "-0.03em"
    }
  },
  {
    ".preview-card-description": {
      "fontSize": "12px",
      "lineHeight": "1.6",
      "color": "#62625c",
      "maxWidth": "260px",
      "margin": "16px 0 24px"
    }
  },
  {
    ".preview-product-card .preview-card-price": {
      "margin": "auto 0 0",
      "paddingTop": "24px",
      "fontSize": "13px"
    }
  },
  {
    ".preview-collection-note": {
      "margin": "42px 0 0",
      "paddingTop": "20px",
      "borderTop": "1px solid #d6d6cf",
      "fontSize": "10px",
      "lineHeight": "1.6",
      "color": "#62625c"
    }
  },
  {
    "@media (prefers-reduced-motion: no-preference)": [
      {
        ".preview-product-info": {
          "animation": "preview-reveal 0.4s ease-out"
        }
      },
      {
        ".storefront-preview": {
          "scrollBehavior": "smooth"
        }
      }
    ]
  },
  {
    "@media (max-width: 900px)": [
      {
        ".preview-hero .preview-hero-bottom": {
          "left": "24px",
          "bottom": "24px"
        }
      },
      {
        ".preview-product-card": {
          "padding": "20px 12px"
        }
      },
      {
        ".preview-card-image": {
          "padding": "18px"
        }
      }
    ]
  },
  {
    "@media (max-width: 600px)": [
      {
        ".preview-hero .preview-hero-bottom": {
          "position": "static",
          "width": "100%",
          "marginTop": "28px"
        }
      },
      {
        ".preview-collection": {
          "padding": "44px 20px 28px"
        }
      },
      {
        ".preview-collection-heading": {
          "alignItems": "start",
          "flexDirection": "column",
          "gap": "12px",
          "marginBottom": "30px"
        }
      },
      {
        ".preview-product-grid": {
          "gridTemplateColumns": "repeat(2, minmax(0, 1fr))",
          "margin": "0 -20px",
          "borderLeft": "0",
          "borderRight": "0"
        }
      },
      {
        ".preview-card-image": {
          "aspectRatio": "1"
        }
      },
      {
        ".preview-product-card": {
          "padding": "22px 10px 26px"
        }
      },
      {
        ".preview-product-card h3": {
          "fontSize": "15px"
        }
      },
      {
        ".preview-card-description": {
          "display": "none"
        }
      },
      {
        ".preview-card-image": {
          "padding": "15px"
        }
      },
      {
        ".preview-product-card .preview-card-price": {
          "paddingTop": "28px",
          "fontSize": "12px"
        }
      }
    ]
  }
];

export default styles;
