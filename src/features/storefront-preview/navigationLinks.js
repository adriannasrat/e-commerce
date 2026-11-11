import { collectionHref } from "./collections/collections";
import { paths } from "./routes";

export const navigationLinks = [
  {
    id: "store",
    title: "Store",
    href: paths.store,
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
    href: paths.compare,
    detail: "Find the pair that fits",
  },
  {
    id: "journal",
    title: "Journal",
    href: paths.journal,
    detail: "Stories for every mood",
  },
];
