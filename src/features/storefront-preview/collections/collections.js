import { products } from "../products";

export const collections = {
  "over-ear": {
    name: "Over-ear",
    series: "Form series",
    line: "Room for every note.",
    description: "Three silhouettes. A listening space of your own.",
    feature: "silver",
    art: "Brushed light.",
  },
  "in-ear": {
    name: "In-ear",
    series: "Pocket series",
    line: "Take the music with you.",
    description: "Personal audio in a pocket-sized form.",
    feature: "in-ear-red",
    art: "Colour in motion.",
  },
};

export const collectionHref = (id, section) =>
  `#collection/${id}${section ? "/" + section : ""}`;
export const collectionModels = (id) =>
  products.filter((model) => model.image.category === id);

export function collectionRoute(hash) {
  const match = /^#collection\/(over-ear|in-ear)(?:\/(models|compare))?$/.exec(
    hash,
  );
  return match ? { id: match[1], section: match[2] } : null;
}
