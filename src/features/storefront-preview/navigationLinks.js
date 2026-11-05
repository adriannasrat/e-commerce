import { collectionHref } from "./collections/collections";

export const navigationLinks = [
  {
    id: "store",
    title: "Store",
    href: "#preview-direction",
    detail: "Shop the whole collection",
  },
  {
    id: "over-ear",
    title: "Over-ear",
    href: collectionHref("over-ear"),
    detail: "Explore the Form series",
  },
  {
    id: "in-ear",
    title: "In-ear",
    href: collectionHref("in-ear"),
    detail: "Discover the Pocket series",
  },
  {
    id: "compare",
    title: "Compare",
    href: "#compare-headphones",
    detail: "Find the pair that fits",
  },
  {
    id: "journal",
    title: "Journal",
    href: "#preview-stories",
    detail: "Stories for every mood",
  },
];
