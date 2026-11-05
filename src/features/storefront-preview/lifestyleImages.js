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

// Extra product-page views, in addition to the studio shot and close-up.
export const productViews = {
  silver: [{ id: "context", label: "Form 03 in context", photo: lifestyle.silverStandClose }],
  "in-ear-black": [
    { id: "context", label: "Pocket 01 in context", photo: lifestyle.pocketGraphiteWood },
  ],
  "form-04": [
    { id: "context", label: "Form 04 in the studio", photo: lifestyle.form04Studio },
  ],
  "pocket-04": [
    { id: "context", label: "Pocket 04 in context", photo: lifestyle.pocket04Wood },
  ],
  "pocket-05": [
    { id: "context", label: "Pocket 05 in context", photo: lifestyle.pocket05Slate },
  ],
  "in-ear-white": [
    { id: "buds", label: "Buds out of the case", cutout: budsOutImage },
    { id: "context", label: "Pocket 02 in context", photo: lifestyle.pocketChalkNight },
  ],
};
