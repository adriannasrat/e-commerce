// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    ".added-summary": {
      "position": "sticky",
      "top": "0",
      "zIndex": "6",
      "display": "flex",
      "alignItems": "center",
      "gap": "24px",
      "padding": "24px max(24px, 6%)",
      "background": "#f8f8f5",
      "borderBottom": "1px solid #deded9"
    }
  },
  {
    ".added-summary > svg": {
      "width": "80px",
      "height": "85px",
      "flexShrink": "0"
    }
  },
  {
    ".added-summary h1": {
      "display": "flex",
      "alignItems": "center",
      "gap": "8px",
      "margin": "0 0 8px",
      "fontWeight": "500",
      "fontSize": "18px",
      "letterSpacing": "-0.03em"
    }
  },
  {
    ".added-summary h1:focus": {
      "outline": "none"
    }
  },
  {
    ".added-summary h1 svg": {
      "fontSize": "18px",
      "color": "#656b5f"
    }
  },
  {
    ".added-summary a:not(.bag-button)": {
      "textDecoration": "none",
      "fontSize": "14px"
    }
  },
  {
    ".added-summary p": {
      "fontSize": "12px",
      "color": "#686862",
      "margin": "8px 0 0"
    }
  },
  {
    ".added-summary > .bag-button": {
      "marginLeft": "auto",
      "whiteSpace": "nowrap"
    }
  },
  {
    ".recommendation-section": {
      "background": "#eeedeb",
      "padding": "72px max(24px, 6%)"
    }
  },
  {
    ".recommendation-section:nth-of-type(even)": {
      "background": "#f5f5f2"
    }
  },
  {
    ".recommendation-heading": {
      "textAlign": "center",
      "marginBottom": "48px"
    }
  },
  {
    ".recommendation-heading h2": {
      "margin": "0 0 22px",
      "fontSize": "clamp(32px, 4vw, 52px)",
      "fontWeight": "400",
      "letterSpacing": "-0.055em",
      "lineHeight": "1.1"
    }
  },
  {
    ".recommendation-heading p": {
      "margin": "0 auto",
      "maxWidth": "620px",
      "fontSize": "14px",
      "lineHeight": "1.7",
      "color": "#62625c"
    }
  },
  {
    ".recommendation-grid": {
      "display": "grid",
      "gridTemplateColumns": "repeat(3, minmax(0, 1fr))",
      "gap": "20px",
      "maxWidth": "1100px",
      "margin": "auto"
    }
  },
  {
    ".recommendation-card": {
      "display": "flex",
      "flexDirection": "column",
      "background": "#fff",
      "borderRadius": "22px",
      "padding": "28px",
      "minWidth": "0"
    }
  },
  {
    ".recommendation-image": {
      "display": "block",
      "height": "220px",
      "padding": "12px",
      "marginBottom": "26px"
    }
  },
  {
    ".recommendation-image svg": {
      "width": "100%",
      "height": "100%"
    }
  },
  {
    ".recommendation-label": {
      "fontSize": "9px",
      "textTransform": "uppercase",
      "letterSpacing": "0.05em",
      "color": "#757570"
    }
  },
  {
    ".recommendation-card h3": {
      "margin": "8px 0 12px",
      "fontSize": "22px",
      "fontWeight": "500",
      "letterSpacing": "-0.035em"
    }
  },
  {
    ".recommendation-card h3 a": {
      "textDecoration": "none"
    }
  },
  {
    ".recommendation-card p:not(.recommendation-label)": {
      "fontSize": "13px",
      "lineHeight": "1.6"
    }
  },
  {
    ".recommendation-description": {
      "margin": "0"
    }
  },
  {
    ".recommendation-more": {
      "border": "0",
      "padding": "10px 0",
      "background": "transparent",
      "alignSelf": "start",
      "font": "inherit",
      "fontSize": "12px",
      "color": "#5b5b55",
      "cursor": "pointer",
      "textDecoration": "underline",
      "textUnderlineOffset": "4px"
    }
  },
  {
    ".recommendation-finish": {
      "marginBottom": "30px"
    }
  },
  {
    ".recommendation-purchase": {
      "display": "flex",
      "flexDirection": "column",
      "marginTop": "auto",
      "gap": "8px"
    }
  },
  {
    ".recommendation-purchase strong": {
      "fontSize": "18px",
      "fontWeight": "500"
    }
  },
  {
    ".recommendation-purchase > span,\n.recommendation-purchase small": {
      "fontSize": "10px",
      "color": "#757570"
    }
  },
  {
    ".recommendation-purchase .bag-button": {
      "width": "100%",
      "margin": "18px 0 4px"
    }
  },
  {
    ".recommendation-purchase .bag-button:disabled": {
      "background": "#777771",
      "borderColor": "#777771",
      "cursor": "default"
    }
  },
  {
    ".added-bottom": {
      "padding": "44px 24px",
      "textAlign": "center"
    }
  },
  {
    ".added-bottom p": {
      "fontSize": "14px",
      "marginBottom": "22px"
    }
  },
  {
    "@media (max-width: 800px)": [
      {
        ".recommendation-grid": {
          "gridTemplateColumns": "repeat(2, minmax(0, 1fr))"
        }
      }
    ]
  },
  {
    "@media (max-width: 600px)": [
      {
        ".added-summary": {
          "padding": "16px",
          "gap": "12px",
          "flexWrap": "wrap"
        }
      },
      {
        ".added-summary > svg": {
          "width": "48px",
          "height": "56px"
        }
      },
      {
        ".added-summary h1": {
          "fontSize": "16px"
        }
      },
      {
        ".added-summary > .bag-button": {
          "marginLeft": "60px",
          "padding": "10px 20px"
        }
      },
      {
        ".recommendation-section": {
          "padding": "44px 20px"
        }
      },
      {
        ".recommendation-grid": {
          "gridTemplateColumns": "1fr"
        }
      },
      {
        ".recommendation-heading": {
          "marginBottom": "28px"
        }
      },
      {
        ".recommendation-image": {
          "height": "240px"
        }
      }
    ]
  }
];

export default styles;
