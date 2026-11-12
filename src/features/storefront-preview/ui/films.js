import { mediaUrl } from "../media";

// Silent product films. Each entry is a looping clip with a poster frame; the
// description stands in for the picture for anyone who cannot see it.
const film = (name, content) => ({
  id: name,
  src: mediaUrl(`films/${name}.mp4`),
  poster: mediaUrl(`films/${name}.jpg`),
  ...content,
});

export const films = {
  home: film("home-hero", {
    description:
      "Dark over-ear headphones floating against a pale backdrop, turning slowly from front to side.",
  }),
  "over-ear": film("form-detail", {
    title: "See its details.",
    lead: "Every curve of the Form silhouette, up close.",
    description:
      "Dark over-ear headphones in the air with close-ups of the ear cup, headband and crown.",
  }),
  "in-ear": film("pocket-film", {
    title: "Small, from every angle.",
    lead: "A closer look at the case and the buds.",
    description:
      "Black earbuds floating beside their open case, then close-ups of a single bud turning slowly.",
  }),
  details: film("form-detail", {
    title: "The details, up close.",
    lead: "Woven mesh, brushed metal and a knurled crown.",
    description:
      "Close-ups of an over-ear headphone: a brushed metal cup, a woven headband and a knurled crown.",
  }),
};

