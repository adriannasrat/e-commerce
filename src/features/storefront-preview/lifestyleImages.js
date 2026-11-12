import { mediaUrl } from "./media";

// Lifestyle photography. Each photo shows the same model as the catalogue
// entry it is linked to, so it can stand in for that product in editorial
// sections. `focus` is the object-position that keeps the product in frame
// when the photo is cropped to fill a card.
const base = mediaUrl("photos/");

export const lifestyle = {
  silverResting: {
    src: `${base}halo-resting.jpg`,
    alt: "Halo headphones resting on a pale surface against a plum wall",
    model: "silver",
    focus: "68% 60%",
  },
  silverStand: {
    src: `${base}halo-stand.jpg`,
    alt: "Halo headphones on a stand in soft pink light",
    model: "silver",
    focus: "50% 60%",
  },
  silverStandClose: {
    src: `${base}halo-stand-close.jpg`,
    alt: "Close-up of a Halo ear cup and headband",
    model: "silver",
    focus: "70% 55%",
  },
  silverAfterHours: {
    src: `${base}halo-after-hours.jpg`,
    alt: "Halo headphones under blue and green evening light",
    model: "silver",
    focus: "45% 55%",
  },
  form01Cup: {
    src: `${base}atlas-cup.webp`,
    alt: "Close-up of an Atlas ear cup, its brushed metal and woven cushion in low light",
    model: "black",
    focus: "45% 50%",
  },
  form01Cushion: {
    src: `${base}atlas-cushion.webp`,
    alt: "Close-up of the stitched cushion of an Atlas ear cup",
    model: "black",
    focus: "45% 55%",
  },
  pocket07Set: {
    src: `${base}prism-set.webp`,
    alt: "Prism earbuds beside their slate case on black",
    model: "pocket-07",
    focus: "50% 64%",
  },
  pocket07Case: {
    src: `${base}prism-case.webp`,
    alt: "Close-up of the Prism case lid and its status light",
    model: "pocket-07",
    focus: "50% 50%",
  },
  pocket07Bud: {
    src: `${base}prism-bud.webp`,
    alt: "Close-up of a Prism earbud, its metal shell and soft tip",
    model: "pocket-07",
    focus: "50% 45%",
  },
  pocket07BudAngle: {
    src: `${base}prism-bud-angle.webp`,
    alt: "A single Prism earbud turning in the dark",
    model: "pocket-07",
    focus: "55% 45%",
  },
  // The two series together. It shows the shapes of the range rather than one
  // model, so it is never linked to a product.
  collectionPair: {
    src: `${base}collection-pair.webp`,
    alt: "Silver over-ear headphones beside white earbuds and their case",
    focus: "50% 50%",
  },
};
