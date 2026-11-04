// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    ".preview-menu-glyph": {
      position: "relative",
      display: "block",
      width: "20px",
      height: "20px",
    },
  },
  {
    ".preview-menu-glyph > span": {
      position: "absolute",
      inset: "9px 0 auto",
      height: "1.5px",
      transition: "transform 0.14s ease-in 0.14s",
    },
  },
  {
    ".preview-menu-glyph > span:first-of-type": {
      transform: "translateY(-3px)",
    },
  },
  {
    ".preview-menu-glyph > span:last-child": {
      transform: "translateY(3px)",
    },
  },
  {
    ".preview-menu-glyph i": {
      display: "block",
      width: "20px",
      height: "1.5px",
      borderRadius: "2px",
      background: "currentColor",
      transition: "transform 0.14s ease-out",
    },
  },
  {
    '.preview-menu-glyph[data-open="true"] > span': {
      transform: "translateY(0)",
      transitionDelay: "0s",
    },
  },
  {
    '.preview-menu-glyph[data-open="true"] i': {
      transitionDelay: "0.14s",
    },
  },
  {
    '.preview-menu-glyph[data-open="true"] > span:first-of-type i': {
      transform: "rotate(45deg)",
    },
  },
  {
    '.preview-menu-glyph[data-open="true"] > span:last-child i': {
      transform: "rotate(-45deg)",
    },
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".preview-menu-glyph > span,\n  .preview-menu-glyph i": {
          transition: "none",
        },
      },
    ],
  },
];

export default styles;
