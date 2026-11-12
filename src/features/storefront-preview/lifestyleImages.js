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
  pocketGraphiteWood: {
    src: `${base}pocket-graphite-wood.jpg`,
    alt: "An open Pocket 01 case on a weathered wooden table",
    model: "in-ear-black",
    focus: "50% 55%",
  },
  pocketChalkFloating: {
    src: `${base}pocket-chalk-floating.jpg`,
    alt: "Two Pocket 02 earbuds against a black background",
    model: "in-ear-white",
    focus: "60% 50%",
  },
  pocketChalkCase: {
    src: `${base}pocket-chalk-case.jpg`,
    alt: "An open Pocket 02 case on grey stone",
    model: "in-ear-white",
    focus: "50% 50%",
  },
  pocketChalkNight: {
    src: `${base}pocket-chalk-night.jpg`,
    alt: "Pocket 02 earbuds and case on black",
    model: "in-ear-white",
    focus: "55% 50%",
  },
  form04Studio: {
    src: `${base}form-04-studio.jpg`,
    alt: "Form 04 headphones suspended against a pale studio wall",
    model: "form-04",
    focus: "50% 42%",
    // Brand marks were retouched out of this photo before it was added.
  },
  pocket04Wood: {
    src: `${base}pocket-04-wood.jpg`,
    alt: "An open Pocket 04 case on a warm wooden table",
    model: "pocket-04",
    focus: "45% 50%",
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

// Studio cut-out of Pocket 02 with the buds out of the case.
export const budsOutImage = {
  id: "in-ear-white-buds",
  category: "in-ear",
  label: "Pocket 02 earbuds beside their open case",
  src: "/local-preview/white-in-ear-buds-out.png",
  width: 2400,
  height: 1600,
  bounds: [846, 226, 1736, 1300],
};

// Form 07 together with the case in the same finish.
export const sandSetImage = {
  id: "sand-set",
  label: "Form 07 headphones in Sand beside a matching case",
  src: "/local-preview/sand-set.webp",
  width: 1366,
  height: 759,
  bounds: [240, 177, 1067, 596],
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
  "in-ear-black": [
    {
      id: "context",
      label: "Pocket 01 in context",
      photo: lifestyle.pocketGraphiteWood,
    },
  ],
  "form-04": [
    {
      id: "context",
      label: "Form 04 in the studio",
      photo: lifestyle.form04Studio,
    },
  ],
  "pocket-04": [
    {
      id: "context",
      label: "Pocket 04 in context",
      photo: lifestyle.pocket04Wood,
    },
  ],
  "pocket-05": [
    {
      id: "context",
      label: "Pocket 05 in context",
      photo: lifestyle.pocket05Slate,
    },
  ],
  "form-07": [
    { id: "case", label: "With the matching case", cutout: sandSetImage },
  ],
  "in-ear-white": [
    { id: "buds", label: "Buds out of the case", cutout: budsOutImage },
    {
      id: "context",
      label: "Pocket 02 in context",
      photo: lifestyle.pocketChalkNight,
    },
  ],
};
