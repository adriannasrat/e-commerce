import { mediaUrl } from "./media";

// One row of a product's media, as the API returns it.
export type ApiMedia = {
  role: "main" | "gallery" | "film";
  kind: "cutout" | "photo" | "film";
  position: number;
  path: string;
  poster: string | null;
  alt: string;
  label: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  crop: [number, number, number, number] | null;
  focus: string | null;
  tone: "dark" | "light" | null;
};

type Cutout = {
  id: string;
  category: string;
  label: string;
  src: string;
  finish: "graphite" | "chalk";
  width: number;
  height: number;
  bounds: [number, number, number, number];
};

const cutout = (id: string, category: string, item: ApiMedia): Cutout => ({
  id,
  category,
  label: item.alt,
  src: mediaUrl(item.path),
  finish: item.tone === "dark" ? "graphite" : "chalk",
  width: item.width ?? 0,
  height: item.height ?? 0,
  bounds: item.crop ?? [0, 0, item.width ?? 0, item.height ?? 0],
});

// Turns a product's media rows into what the storefront draws: the main
// cut-out, the extra gallery views and the product page film.
export function productMedia(slug: string, category: string, media: ApiMedia[] = []) {
  const main = media.find((item) => item.role === "main" && item.kind === "cutout");
  const film = media.find((item) => item.role === "film");
  return {
    image: main ? cutout(slug, category, main) : undefined,
    views: media
      .filter((item) => item.role === "gallery")
      .map((item) => ({
        id: `gallery-${item.position}`,
        label: item.label ?? item.alt,
        ...(item.kind === "cutout"
          ? { cutout: cutout(`${slug}-${item.position}`, category, item) }
          : { photo: { src: mediaUrl(item.path), alt: item.alt, focus: item.focus ?? "50% 50%" } }),
      })),
    film: film
      ? {
          id: film.path,
          src: mediaUrl(film.path),
          poster: film.poster ? mediaUrl(film.poster) : undefined,
          title: film.label ?? "",
          lead: film.caption ?? "",
          description: film.alt,
        }
      : undefined,
  };
}
