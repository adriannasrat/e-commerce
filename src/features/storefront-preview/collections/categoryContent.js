import { lifestyle } from "../lifestyleImages";
import { paths } from "../routes";

// Editorial copy for the product-family pages. Fictional concept content:
// it describes design intent, not measured product specifications.
export const featureCards = {
  "over-ear": [
    {
      id: "design",
      eyebrow: "Design",
      title: "Sculpted to settle around you.",
      model: "silver",
      tone: "photo",
      photo: lifestyle.silverStand,
      detail:
        "The Form series starts from one continuous line: a headband that flows into the ear cups without a visible join. Every finish is matched across band, cup and cushion so the silhouette reads as a single object.",
    },
    {
      id: "comfort",
      eyebrow: "Comfort",
      title: "Room to breathe, for the long listen.",
      model: "silver",
      tone: "photo",
      photo: lifestyle.silverDesk,
      detail:
        "Generous cushions and a gentle clamp are the design goals for this concept. The idea is a pair you notice when you put it on, and forget about a few minutes later.",
    },
    {
      id: "finishes",
      eyebrow: "Finishes",
      title: "A finish for every mood.",
      model: "black",
      tone: "dark",
      detail:
        "Graphite for evenings, Chalk for bright mornings, Ocean and Sage when you want colour. Each model in the Form series has its own finish, so choosing a colour is choosing a model.",
    },
  ],
  "in-ear": [
    {
      id: "design",
      eyebrow: "Design",
      title: "Small enough to forget.",
      model: "in-ear-white",
      tone: "photo",
      photo: lifestyle.pocketChalkCase,
      detail:
        "The Pocket series is drawn around a rounded, pebble-like form that sits close to the ear. Nothing protrudes more than it needs to, so the shape stays calm from every angle.",
    },
    {
      id: "colour",
      eyebrow: "Colour",
      title: "A little crimson goes a long way.",
      model: "in-ear-red",
      tone: "warm",
      detail:
        "Pocket 03 brings a saturated Crimson finish to the collection. It is the playful counterpart to the quieter Graphite and Chalk models.",
    },
    {
      id: "case",
      eyebrow: "The case",
      title: "A pocket-sized home.",
      model: "in-ear-black",
      tone: "photo",
      photo: lifestyle.pocketGraphiteWood,
      detail:
        "Every Pocket model travels in a compact case shaped to slip into a coat pocket or the smallest bag. Case details are part of the visual concept and have not been engineered.",
    },
  ],
};

export const benefits = [
  {
    id: "compare",
    eyebrow: "Compare",
    title: "Find your fit in seconds.",
    text: "Put any two models side by side, across both series.",
    href: paths.compare,
    action: "Compare models",
  },
  {
    id: "save",
    eyebrow: "Save for later",
    title: "Keep a shortlist.",
    text: "Save models on this device and come back when you are ready.",
    href: paths.bag,
    action: "Open your bag",
  },
  {
    id: "journal",
    eyebrow: "Listening journal",
    title: "Stories for every mood.",
    text: "Slow mornings, the evening train and a moment to yourself.",
    href: paths.journal,
    action: "Read the journal",
  },
  {
    id: "pricing",
    eyebrow: "Concept pricing",
    title: "Clear prices in SEK.",
    text: "Every model shows one illustrative price. Nothing is charged.",
    href: paths.store,
    action: "Shop the collection",
  },
];
