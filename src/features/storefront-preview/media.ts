import mediaSizes from "./media-sizes.json";

// Images and films are served from one base address. By default that is the
// storefront's own /media folder, deployed with the site to its CDN. Setting
// VITE_MEDIA_BASE_URL at build time points every file at another host, such
// as object storage, without changing any code.
const base = (import.meta.env.VITE_MEDIA_BASE_URL ?? "/media").replace(/\/+$/, "");

export const mediaUrl = (path: string) => `${base}/${path.replace(/^\/+/, "")}`;

// Every width an image exists in, smallest first, made by
// scripts/resize-media.js. The last width is the original file.
const sizes: Record<string, number[]> = mediaSizes;

export type MediaSource = { width: number; src: string };

export function mediaSources(path: string): MediaSource[] {
  const widths = sizes[path] ?? [];
  return widths.map((width, index) => ({
    width,
    src: mediaUrl(index === widths.length - 1 ? path : path.replace(/(\.\w+)$/, `-${width}w$1`)),
  }));
}

// The same list as an <img> srcset, so the browser picks the copy it needs.
export const mediaSrcSet = (path: string) =>
  mediaSources(path).map(({ src, width }) => `${src} ${width}w`).join(", ") || undefined;

// Every film also exists 720 px wide for phones, made by scripts/whiten-films.sh.
export const phoneFilm = (src: string) => src.replace(/\.mp4$/, "-720w.mp4");
