// Images and films are served from one base address. By default that is the
// storefront's own /media folder, deployed with the site to its CDN. Setting
// VITE_MEDIA_BASE_URL at build time points every file at another host, such
// as object storage, without changing any code.
const base = (import.meta.env.VITE_MEDIA_BASE_URL ?? "/media").replace(/\/+$/, "");

export const mediaUrl = (path: string) => `${base}/${path.replace(/^\/+/, "")}`;
