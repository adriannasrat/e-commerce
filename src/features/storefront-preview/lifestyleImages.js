// Lifestyle photography. Each photo shows the same model as the catalogue
// entry it is linked to, so it can stand in for that product in editorial
// sections. `focus` is the object-position that keeps the product in frame
// when the photo is cropped to fill a card.
const base = "/local-preview/lifestyle/";

export const lifestyle = {
  silverResting: {
    src: `${base}silver-resting.jpg`,
    alt: "Form 03 headphones resting on a pale surface against a plum wall",
    model: "silver",
    focus: "68% 60%",
  },
  silverStand: {
    src: `${base}silver-stand.jpg`,
    alt: "Form 03 headphones on a stand in soft pink light",
    model: "silver",
    focus: "50% 60%",
  },
  silverStandClose: {
    src: `${base}silver-stand-close.jpg`,
    alt: "Close-up of a Form 03 ear cup and headband",
    model: "silver",
    focus: "70% 55%",
  },
  silverDesk: {
    src: `${base}silver-desk.jpg`,
    alt: "Form 03 headphones on a desk beside a keyboard",
    model: "silver",
    focus: "50% 45%",
  },
  silverAfterHours: {
    src: `${base}silver-after-hours.jpg`,
    alt: "Form 03 headphones under blue and green evening light",
    model: "silver",
    focus: "45% 55%",
  },
  pocket05Slate: {
    src: `${base}pocket-05-slate.jpg`,
    alt: "An open Pocket 05 case on dark slate",
    model: "pocket-05",
    focus: "52% 55%",
  },
  form01Cup: {
    src: `${base}form-01-cup.webp`,
    alt: "Close-up of a Form 01 ear cup, its brushed metal and woven cushion in low light",
    model: "black",
    focus: "45% 50%",
  },
  form01Cushion: {
    src: `${base}form-01-cushion.webp`,
    alt: "Close-up of the stitched cushion of a Form 01 ear cup",
    model: "black",
    focus: "45% 55%",
  },
  form01Mesh: {
    src: `${base}form-01-mesh.webp`,
    alt: "Close-up of the knit mesh and control button on a Form 01 ear cup",
    model: "black",
    focus: "45% 50%",
  },
  pocket07Set: {
    src: `${base}pocket-07-set.webp`,
    alt: "Pocket 07 earbuds beside their slate case on black",
    model: "pocket-07",
    focus: "50% 64%",
  },
  pocket07Case: {
    src: `${base}pocket-07-case.webp`,
    alt: "Close-up of the Pocket 07 case lid and its status light",
    model: "pocket-07",
    focus: "50% 50%",
  },
  pocket07Bud: {
    src: `${base}pocket-07-bud.webp`,
    alt: "Close-up of a Pocket 07 earbud, its metal shell and soft tip",
    model: "pocket-07",
    focus: "50% 45%",
  },
  pocket07BudAngle: {
    src: `${base}pocket-07-bud-angle.webp`,
    alt: "A single Pocket 07 earbud turning in the dark",
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

// Extra product-page views, in addition to the studio shot and close-up.
export const productViews = {
  black: [
    { id: "cup", label: "Form 01 ear cup up close", photo: lifestyle.form01Cup },
    { id: "mesh", label: "Form 01 mesh and controls", photo: lifestyle.form01Mesh },
  ],
  "pocket-07": [
    { id: "set", label: "Pocket 07 with its case", photo: lifestyle.pocket07Set },
    { id: "bud", label: "Pocket 07 earbud up close", photo: lifestyle.pocket07Bud },
  ],
  silver: [
    {
      id: "context",
      label: "Form 03 in context",
      photo: lifestyle.silverStandClose,
    },
  ],
  "pocket-05": [
    {
      id: "context",
      label: "Pocket 05 in context",
      photo: lifestyle.pocket05Slate,
    },
  ],
};
