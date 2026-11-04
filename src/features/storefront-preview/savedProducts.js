const storageKey = "resonance.preview.saved";

export function readSavedProducts() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(value)
      ? value.filter((id) => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function writeSavedProducts(ids) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(ids));
  } catch {
    /* Saving remains available in memory when browser storage is unavailable. */
  }
}
