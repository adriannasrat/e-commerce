// Scroll choreography (driven by ui/useReveal). Uses the individual
// `translate` and `scale` properties so it never fights an element's own
// `transform` (hover lifts, press feedback).
const pending = '[data-reveal][data-reveal-state="pending"]';
const entering = '[data-reveal][data-reveal-state="in"]';

const styles = [
  {
    ":root": {
      // Slow start, long soft landing: the reveal curve measured on the
      // reference product pages (about 900ms of fade, 700ms of travel).
      "--ease-reveal": "cubic-bezier(0.42, 0, 0.18, 1)",
    },
  },
  {
    "@media (prefers-reduced-motion: no-preference)": [
      { [pending]: { opacity: "0", translate: "0 30px" } },
      { [`${pending}[data-reveal="fade"]`]: { translate: "none" } },
      {
        [`${pending}[data-reveal="zoom"]`]: {
          translate: "0 40px",
          scale: "1.06",
        },
      },
      {
        [entering]: {
          transition:
            "opacity 900ms var(--ease-reveal) var(--reveal-delay, 0ms),\n    translate 700ms var(--ease-reveal) var(--reveal-delay, 0ms),\n    scale 1200ms var(--ease-out) var(--reveal-delay, 0ms)",
        },
      },
      {
        [`${entering}[data-reveal="fade"]`]: {
          transition: "opacity 600ms ease var(--reveal-delay, 0ms)",
        },
      },
      {
        [`${entering}[data-reveal="zoom"]`]: {
          transition:
            "opacity 900ms var(--ease-reveal) var(--reveal-delay, 0ms),\n    translate 1000ms var(--ease-reveal) var(--reveal-delay, 0ms),\n    scale 1400ms var(--ease-out) var(--reveal-delay, 0ms)",
        },
      },
    ],
  },
  {
    // Scroll-linked depth for large imagery, where the browser supports it:
    // the image settles from a gentle zoom as it travels up the screen.
    "@supports (animation-timeline: view())": [
      {
        "@media (prefers-reduced-motion: no-preference)": [
          {
            ".sound-gallery-art, .sound-study svg, .rx-feature-photo, .product-related-card > svg":
              {
                animation: "rx-settle linear both",
                animationTimeline: "view()",
                animationRange: "entry 0% cover 45%",
              },
          },
          {
            "@keyframes rx-settle": [
              { from: { scale: "1.1" } },
              { to: { scale: "1" } },
            ],
          },
        ],
      },
    ],
  },
  {
    "@media (prefers-reduced-motion: reduce)": [
      { "[data-reveal]": { opacity: "1 !important", translate: "none !important", scale: "none !important" } },
    ],
  },
];

export default styles;
