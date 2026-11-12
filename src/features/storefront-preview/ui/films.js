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

const formOrbit = (name) =>
  film("form-orbit", {
    title: "In motion.",
    lead: `The ${name} silhouette, shown here in Titanium.`,
    description:
      "Over-ear headphones in a dark titanium finish turning slowly in the air.",
  });

// Only models whose shape matches the footage get a film on their own page.
export const productFilms = {
  black: formOrbit("Atlas"),
  silver: formOrbit("Halo"),
  "form-05": formOrbit("Tide"),
  "form-06": formOrbit("Grove"),
  "pocket-06": film("pocket-orbit", {
    title: "In motion.",
    lead: "Case and buds, from every side.",
    description: "Carbon earbuds floating and turning beside their open case.",
  }),
};
