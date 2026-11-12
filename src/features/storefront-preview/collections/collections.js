import { products } from "../products";
import { paths } from "../routes";

export const collections = {
  "over-ear": {
    name: "Over-ear",
    series: "Form series",
    line: "Room for every note.",
    description: "A finish for every mood. A listening space of your own.",
    feature: "silver",
    art: "Brushed light.",
  },
  "in-ear": {
    name: "In-ear",
    series: "Pocket series",
    line: "Take the music with you.",
    description: "Personal audio in a pocket-sized form.",
    feature: "pocket-07",
    art: "Polished metal.",
  },
};

export const collectionHref = paths.collection;
export const collectionModels = (id) =>
  products.filter((model) => model.image.category === id);
