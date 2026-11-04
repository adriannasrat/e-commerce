// Brings the bag, "added to bag", sign-in and journal pages onto the shared
// system: semibold display type, accent primary actions, ink-coloured titles.
// Mounted after their own modules so these values win on equal specificity.
const display = { fontWeight: "600", letterSpacing: "-0.003em" };

const pageStyles = [
  // Primary action: every bag button becomes the accent pill.
  {
    ".bag-button": {
      minHeight: "44px",
      padding: "11px 22px",
      border: "0",
      borderRadius: "980px",
      background: "var(--rx-accent)",
      color: "#fff !important",
      fontSize: "17px",
      letterSpacing: "-0.022em",
    },
  },
  { ".bag-button:hover": { background: "var(--rx-accent-hover)" } },
  { ".bag-button:disabled": { background: "#e8e8ed", color: "var(--rx-muted) !important", cursor: "default" } },
  // Bag page
  { ".bag-page-heading h1": { ...display, fontSize: "clamp(32px, 4vw, 40px)", color: "var(--rx-ink)" } },
  { ".bag-page-heading p": { fontSize: "17px", color: "var(--rx-muted)" } },
  { ".bag-row-description h2": { ...display, fontSize: "24px" } },
  { ".bag-row-description > a": { color: "var(--rx-ink) !important", textDecoration: "none" } },
  { ".bag-row-description > a:hover": { color: "var(--rx-link) !important" } },
  { ".bag-row-price strong": { fontWeight: "600", fontVariantNumeric: "tabular-nums" } },
  { ".bag-quantity select": { borderRadius: "12px", borderColor: "#d2d2d7", fontSize: "17px" } },
  { ".bag-checkout-actions": { gap: "12px" } },
  { ".bag-checkout-actions .bag-button": { borderRadius: "12px", minHeight: "50px" } },
  { ".bag-checkout-actions .bag-button:first-of-type": { background: "var(--rx-ink)" } },
  { ".bag-checkout-actions .bag-button:first-of-type:hover": { background: "#333336" } },
  { ".bag-checkout-actions .bag-button:last-of-type, .bag-checkout-actions .bag-button:last-of-type:hover": { background: "var(--rx-accent)", color: "#fff !important" } },
  { ".bag-discovery > h2, .bag-collection-banner h2": { ...display } },
  { ".bag-suggestions h3": { fontWeight: "600" } },
  { ".bag-suggestions a": { color: "var(--rx-ink) !important" } },
  { ".bag-faq > h2 > button": { fontWeight: "600" } },
  // Bag flyout
  { ".bag-panel.MuiDialog-paper": { borderRadius: "0 0 18px 18px", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)" } },
  { ".bag-panel-heading h2": { ...display, fontSize: "clamp(28px, 3vw, 32px)" } },
  { ".bag-panel-items a": { color: "var(--rx-ink) !important" } },
  { ".bag-panel-items strong": { fontWeight: "600" } },
  { ".bag-panel-profile a, .bag-panel-profile button": { color: "var(--rx-link) !important" } },
  // Added to bag
  { ".added-summary": { background: "var(--rx-gray) !important" } },
  { ".added-summary h1": { ...display, fontSize: "clamp(24px, 3vw, 32px)" } },
  { ".added-summary h1 svg": { color: "#008009" } },
  { ".added-summary a:not(.bag-button)": { color: "var(--rx-link) !important" } },
  { ".recommendation-heading h2": { ...display, fontSize: "clamp(32px, 4.2vw, 48px)" } },
  { ".recommendation-card": { borderRadius: "18px", boxShadow: "var(--rx-card-shadow)" } },
  { ".recommendation-label": { textTransform: "capitalize !important", letterSpacing: "0 !important", color: "var(--rx-muted) !important" } },
  { ".recommendation-card h3": { ...display, fontSize: "24px" } },
  { ".recommendation-card h3 a": { color: "var(--rx-ink) !important", textDecoration: "none" } },
  { ".recommendation-card h3 a:hover": { color: "var(--rx-link) !important" } },
  { ".recommendation-more": { color: "var(--rx-link) !important" } },
  { ".recommendation-purchase strong": { fontWeight: "600" } },
  { ".recommendation-purchase .bag-button": { width: "100%", borderRadius: "12px" } },
  // Sign in / sign up
  { ".sign-in-art h2": { ...display } },
  { ".sign-in-form-area h1": { ...display, fontSize: "clamp(32px, 4vw, 40px)" } },
  { ".sign-in-field input, .sign-in-password input": { borderRadius: "12px !important", borderColor: "#d2d2d7 !important", fontSize: "17px !important" } },
  { ".sign-in-field input:focus, .sign-in-password input:focus": { borderColor: "var(--rx-accent) !important", boxShadow: "0 0 0 3px rgba(184, 70, 27, 0.25)", outline: "none" } },
  { ".sign-in-submit": { borderRadius: "12px !important", background: "var(--rx-accent) !important", fontWeight: "400 !important", fontSize: "17px !important" } },
  { ".sign-in-submit:hover": { background: "var(--rx-accent-hover) !important" } },
  { ".sign-in-text-button, .sign-in-panel-bottom a": { color: "var(--rx-link) !important" } },
  { ".sign-in-brand": { color: "var(--rx-ink) !important", fontWeight: "600 !important", letterSpacing: "0.12em !important", fontSize: "13px !important" } },
  {
    ".sign-in-kicker, .sign-in-art-eyebrow, .sign-in-art-caption, .sign-in-panel-bottom > span, .listening-eyebrow, .listening-heading > p":
      {
        letterSpacing: "-0.01em !important",
        fontSize: "14px !important",
        fontWeight: "600",
      },
  },
  { ".sign-in-kicker, .listening-eyebrow": { color: "var(--rx-muted)" } },
  // Listening journal
  { ".listening-heading h1": { ...display, fontSize: "clamp(48px, 7vw, 80px)" } },
  { ".listening-card-title": { ...display } },
  { ".listening-detail-copy h2": { ...display } },
  {
    ".listening-detail-image--photo": {
      display: "block !important",
      minHeight: "clamp(260px, 40vw, 480px)",
      padding: "0 !important",
      overflow: "hidden",
      position: "relative",
    },
  },
  { ".listening-detail-image--photo .rx-photo-fill": { position: "absolute", inset: "0" } },
  { ".listening-detail-copy a": { background: "var(--rx-accent) !important", borderRadius: "980px !important" } },
];

export default pageStyles;
