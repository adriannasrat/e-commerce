// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    ".storefront-preview": {
      "minHeight": "100vh",
      "background": "#eeedeb !important",
      "color": "#151515"
    }
  },
  {
    ".storefront-preview a": {
      "color": "inherit"
    }
  },
  {
    ".storefront-preview :focus-visible": {
      "outline": "3px solid #a33e00",
      "outlineOffset": "5px"
    }
  },
  {
    ".preview-shell": {
      "background": "#f7f7f5",
      "overflow": "hidden"
    }
  },
  {
    ".preview-header": {
      "height": "88px",
      "padding": "0 36px",
      "display": "grid",
      "gridTemplateColumns": "1fr auto 1fr",
      "alignItems": "center",
      "borderBottom": "1px solid #deded9"
    }
  },
  {
    ".preview-header > :first-child": {
      "justifySelf": "start",
      "background": "#fff"
    }
  },
  {
    ".preview-header > :last-child": {
      "justifySelf": "end"
    }
  },
  {
    ".preview-wordmark": {
      "textDecoration": "none",
      "fontSize": "23px",
      "fontWeight": "800",
      "letterSpacing": "-0.08em"
    }
  },
  {
    ".preview-wordmark span": {
      "fontSize": "11px",
      "verticalAlign": "top",
      "marginLeft": "3px"
    }
  },
  {
    ".preview-hero": {
      "position": "relative",
      "padding": "25px 40px 36px",
      "minHeight": "670px",
      "isolation": "isolate"
    }
  },
  {
    ".preview-hero-topline": {
      "display": "flex",
      "justifyContent": "space-between",
      "fontSize": "9px",
      "letterSpacing": "0.08em"
    }
  },
  {
    ".preview-headline": {
      "position": "relative",
      "zIndex": "2",
      "display": "flex",
      "justifyContent": "space-between",
      "margin": "64px 0 0",
      "fontSize": "clamp(48px, 7vw, 108px)",
      "fontWeight": "500",
      "letterSpacing": "-0.075em",
      "lineHeight": "0.96",
      "pointerEvents": "none"
    }
  },
  {
    ".preview-headline span:last-child": {
      "marginTop": "108px"
    }
  },
  {
    ".preview-product": {
      "--cup": "#41413f",
      "--cup-edge": "#222220",
      "--band": "#292927",
      "position": "absolute",
      "inset": "60px 25% 50px",
      "zIndex": "1"
    }
  },
  {
    ".preview-product--chalk": {
      "--cup": "#e3dfd5",
      "--cup-edge": "#b5b0a5",
      "--band": "#c9c5bb"
    }
  },
  {
    ".preview-product-guide": {
      "position": "absolute",
      "inset": "0",
      "border": "1px solid #deded8",
      "borderRadius": "50%",
      "opacity": "0.55",
      "transform": "scale(0.9)"
    }
  },
  {
    ".preview-headphones": {
      "position": "absolute",
      "width": "300px",
      "height": "350px",
      "left": "50%",
      "top": "49%",
      "transform": "translate(-50%, -50%) rotate(-13deg)",
      "transition": "transform 0.6s ease"
    }
  },
  {
    ".preview-product:hover .preview-headphones": {
      "transform": "translate(-50%, -52%) rotate(-8deg)"
    }
  },
  {
    ".preview-headband": {
      "position": "absolute",
      "width": "270px",
      "height": "290px",
      "left": "15px",
      "border": "25px solid var(--band)",
      "borderBottom": "0",
      "borderRadius": "150px 150px 30px 30px",
      "boxShadow": "inset 0 3px 0 #ffffff55,\n    0 -2px 0 #00000022",
      "transition": "border-color 0.4s"
    }
  },
  {
    ".preview-earcup": {
      "position": "absolute",
      "top": "185px",
      "width": "91px",
      "height": "145px",
      "borderRadius": "42%",
      "background": "var(--cup)",
      "border": "6px solid var(--cup-edge)",
      "boxShadow": "inset 5px 0 8px #ffffff22,\n    7px 9px 16px #00000018",
      "transition": "background 0.4s,\n    border-color 0.4s"
    }
  },
  {
    ".preview-earcup--left": {
      "left": "0",
      "transform": "rotate(-7deg)"
    }
  },
  {
    ".preview-earcup--right": {
      "right": "0",
      "transform": "rotate(7deg)"
    }
  },
  {
    ".preview-earcup span": {
      "position": "absolute",
      "inset": "12px",
      "border": "1px solid #ffffff22",
      "borderRadius": "inherit"
    }
  },
  {
    ".preview-product-shadow": {
      "position": "absolute",
      "bottom": "45px",
      "left": "22%",
      "width": "60%",
      "height": "18px",
      "background": "#00000022",
      "filter": "blur(14px)",
      "borderRadius": "50%"
    }
  },
  {
    ".preview-hero-bottom": {
      "position": "relative",
      "zIndex": "3",
      "display": "flex",
      "alignItems": "flex-end",
      "justifyContent": "space-between",
      "marginTop": "135px"
    }
  },
  {
    ".preview-intro p": {
      "fontSize": "14px",
      "lineHeight": "1.5",
      "margin": "0 0 22px"
    }
  },
  {
    ".preview-strip": {
      "display": "flex",
      "justifyContent": "space-around",
      "alignItems": "center",
      "gap": "20px",
      "padding": "23px 30px",
      "background": "#151515",
      "color": "#fff",
      "fontSize": "10px",
      "fontWeight": "900",
      "letterSpacing": "0.06em"
    }
  },
  {
    ".preview-direction": {
      "padding": "55px 40px 65px",
      "scrollMarginTop": "24px"
    }
  },
  {
    ".preview-eyebrow": {
      "fontSize": "9px",
      "letterSpacing": "0.1em",
      "margin": "0 0 32px"
    }
  },
  {
    ".preview-direction > div": {
      "display": "flex",
      "justifyContent": "space-between",
      "alignItems": "flex-end",
      "gap": "24px"
    }
  },
  {
    ".preview-direction h2": {
      "fontSize": "clamp(40px, 5.5vw, 80px)",
      "fontWeight": "400",
      "letterSpacing": "-0.065em",
      "lineHeight": "1",
      "margin": "0"
    }
  },
  {
    ".preview-direction > div > p": {
      "fontSize": "13px",
      "lineHeight": "1.6",
      "maxWidth": "230px"
    }
  },
  {
    ".preview-footer": {
      "borderTop": "1px solid #deded9",
      "display": "flex",
      "justifyContent": "space-between",
      "gap": "20px",
      "padding": "22px 40px",
      "fontSize": "9px",
      "letterSpacing": "0.06em"
    }
  },
  {
    ".preview-sr-only,\n.preview-skip:not(:focus)": {
      "position": "absolute",
      "width": "1px",
      "height": "1px",
      "padding": "0",
      "margin": "-1px",
      "overflow": "hidden",
      "clipPath": "inset(50%)",
      "whiteSpace": "nowrap"
    }
  },
  {
    ".preview-skip:focus": {
      "position": "fixed",
      "top": "12px",
      "left": "12px",
      "zIndex": "10",
      "background": "white",
      "padding": "16px"
    }
  },
  {
    "@media (max-width: 900px)": [
      {
        ".preview-hero": {
          "minHeight": "730px",
          "padding": "24px"
        }
      },
      {
        ".preview-headline": {
          "fontSize": "clamp(60px, 10vw, 90px)",
          "flexDirection": "column",
          "marginTop": "32px"
        }
      },
      {
        ".preview-headline span:last-child": {
          "alignSelf": "flex-end",
          "marginTop": "8px"
        }
      },
      {
        ".preview-product": {
          "inset": "190px 15% 135px"
        }
      },
      {
        ".preview-headphones": {
          "transform": "translate(-50%, -50%) rotate(-13deg) scale(0.8)"
        }
      },
      {
        ".preview-product:hover .preview-headphones": {
          "transform": "translate(-50%, -50%) rotate(-8deg) scale(0.8)"
        }
      },
      {
        ".preview-hero-bottom": {
          "marginTop": "330px"
        }
      }
    ]
  },
  {
    "@media (max-width: 600px)": [
      {
        ".preview-header": {
          "height": "72px",
          "padding": "0 16px"
        }
      },
      {
        ".preview-wordmark": {
          "fontSize": "19px"
        }
      },
      {
        ".preview-hero": {
          "padding": "20px"
        }
      },
      {
        ".preview-hero-topline": {
          "fontSize": "7px",
          "gap": "16px"
        }
      },
      {
        ".preview-hero-topline span:last-child": {
          "textAlign": "right"
        }
      },
      {
        ".preview-headline": {
          "fontSize": "clamp(42px, 12vw, 68px)"
        }
      },
      {
        ".preview-product": {
          "inset": "150px 0 190px"
        }
      },
      {
        ".preview-product-guide": {
          "inset": "20px 30px"
        }
      },
      {
        ".preview-hero-bottom": {
          "marginTop": "350px",
          "alignItems": "flex-start",
          "flexDirection": "column",
          "gap": "28px"
        }
      },
      {
        ".preview-strip": {
          "flexWrap": "wrap",
          "justifyContent": "center",
          "padding": "18px",
          "fontSize": "8px",
          "gap": "14px"
        }
      },
      {
        ".preview-strip span:nth-child(n + 3)": {
          "display": "none"
        }
      },
      {
        ".preview-direction": {
          "padding": "36px 20px"
        }
      },
      {
        ".preview-direction > div": {
          "alignItems": "flex-start",
          "flexDirection": "column"
        }
      },
      {
        ".preview-footer": {
          "padding": "20px",
          "flexDirection": "column",
          "gap": "10px"
        }
      }
    ]
  },
  {
    "@media (prefers-reduced-motion: no-preference)": [
      {
        "@keyframes preview-reveal": [
          {
            "from": {
              "opacity": "0",
              "translate": "0 16px"
            }
          },
          {
            "to": {
              "opacity": "1",
              "translate": "0 0"
            }
          }
        ]
      }
    ]
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".storefront-preview *,\n  .storefront-preview *::before,\n  .storefront-preview *::after": {
          "animation": "none !important",
          "transition": "none !important",
          "scrollBehavior": "auto !important"
        }
      }
    ]
  },
  {
    ".preview-product--photo": {
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "center"
    }
  },
  {
    ".preview-product-photo": {
      "display": "block",
      "width": "100%",
      "height": "100%",
      "objectFit": "contain",
      "filter": "drop-shadow(0 20px 18px #00000018)",
      "transition": "transform 0.6s ease"
    }
  },
  {
    ".preview-product--photo:hover .preview-product-photo": {
      "transform": "translateY(-8px) rotate(3deg)"
    }
  },
  {
    ".preview-hero": {
      "minHeight": "670px"
    }
  },
  {
    ".preview-headline": {
      "display": "grid",
      "gridTemplateColumns": "minmax(0, 26fr) minmax(0, 44fr) minmax(0, 26fr)",
      "gap": "2%",
      "margin": "70px 0 0",
      "fontSize": "clamp(48px, 7.5vw, 116px)"
    }
  },
  {
    ".preview-headline span": {
      "whiteSpace": "normal"
    }
  },
  {
    ".preview-headline span:first-child": {
      "gridColumn": "1"
    }
  },
  {
    ".preview-headline span:last-child": {
      "gridColumn": "3",
      "marginTop": "100px",
      "textAlign": "right"
    }
  },
  {
    ".preview-product": {
      "position": "absolute",
      "inset": "65px 28% 65px"
    }
  },
  {
    ".preview-hero-bottom": {
      "marginTop": "65px"
    }
  },
  {
    ".preview-strip": {
      "fontSize": "12px"
    }
  },
  {
    "@media (max-width: 900px)": [
      {
        ".preview-headline": {
          "fontSize": "clamp(42px, 7.3vw, 68px)"
        }
      },
      {
        ".preview-hero": {
          "minHeight": "600px"
        }
      }
    ]
  },
  {
    "@media (max-width: 600px)": [
      {
        ".preview-hero": {
          "display": "flex",
          "flexDirection": "column"
        }
      },
      {
        ".preview-headline": {
          "display": "flex",
          "flexDirection": "column",
          "margin": "32px 0 20px",
          "fontSize": "clamp(40px, 11vw, 66px)"
        }
      },
      {
        ".preview-headline span:last-child": {
          "marginTop": "8px",
          "alignSelf": "flex-end"
        }
      },
      {
        ".preview-product": {
          "position": "relative",
          "inset": "auto",
          "minHeight": "360px",
          "height": "95vw",
          "maxHeight": "480px"
        }
      },
      {
        ".preview-hero-bottom": {
          "marginTop": "28px"
        }
      },
      {
        ".preview-strip": {
          "fontSize": "11px"
        }
      }
    ]
  }
];

export default styles;
