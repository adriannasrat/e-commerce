// Feature styles consumed by StorefrontStyles through MUI GlobalStyles.
const styles = [
  {
    "@media (prefers-reduced-motion: no-preference)": [
      {
        '.scroll-reveal[data-phase="pending"]': {
          opacity: "0",
          translate: "0 24px",
        },
      },
      {
        '.scroll-reveal[data-phase="entering"]': {
          animation:
            "storefront-enter 0.7s var(--ease-out)\n      var(--reveal-delay, 0ms) both",
        },
      },
      {
        "@keyframes storefront-enter": [
          {
            from: {
              opacity: "0",
              translate: "0 24px",
            },
          },
          {
            to: {
              opacity: "1",
              translate: "none",
            },
          },
        ],
      },
    ],
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      {
        ".scroll-reveal": {
          opacity: "1",
          translate: "none",
          animation: "none !important",
        },
      },
    ],
  },
];

export default styles;
