# Storefront styling

The RESONANCE preview uses JavaScript style objects rendered through MUI
`GlobalStyles`, backed by the existing Emotion dependency. Feature styles live
beside their components in `*.styles.js` modules. No other styling dependency
is used.

`StorefrontStyles.jsx` composes the modules in the original stylesheet import order.
It is mounted once under the storefront theme. This also covers MUI dialogs rendered
in portals outside the storefront DOM subtree. Keep selectors feature-specific;
avoid introducing unscoped element rules that affect the legacy application.

Style arrays deliberately retain rule ordering and repeated media-query blocks.
Values keep their explicit units to avoid changing Emotion's numeric-value handling.
The arrays are declared outside React components and reused across renders.

For new isolated components, prefer MUI `sx` or `styled` when that simplifies local
styling. Use the feature modules for rules shared across a feature, responsive
layouts and portal content. Keep the theme as the source for new shared design tokens.

## Design system

The storefront follows a product-marketing design language: system UI type
(SF Pro on Apple devices), ink `#1d1d1f` on white and `#f5f5f7`, ember `#b8461b`
for primary actions and the same ember for text links (`#f0894a` on dark backgrounds).

- `foundation.styles.js` holds motion tokens (`--ease-out`, `--ease-in-out`,
  `--ease-drawer`), press feedback and mobile platform fixes.
- `ui/system.styles.js` holds the shared classes: `rx-btn` (filled, `--ghost`,
  `--small`), `rx-link` (blue link with chevron), type scale (`rx-hero-title`,
  `rx-page-title`, `rx-section-title`), `rx-card`, shelves, chapter navigation,
  segmented controls, the sticky local navigation, ribbon and end-of-page
  directory.
- Reusable components live in `ui/`: `Shelf` (horizontal scroller with paddles
  and snap points), `ChapterNav`, `LocalNav`, `ModelCard`, `FeatureCards`,
  `Highlights` (auto-advancing gallery with progress dots) and `LinkDirectory`.
- `ui/pages.styles.js` brings the older bag, sign-in and journal modules onto the
  same type and button styles. It is mounted after them on purpose.
- `gateHover.js` moves every `:hover` rule behind
  `(hover: hover) and (pointer: fine)` when the styles are composed.

## Scroll choreography

`ui/useReveal.js` runs once per route on `<main>`. Mark elements with
`data-reveal="up" | "item" | "fade" | "zoom"` (or wrap them in `ScrollReveal`).
Headings and copy rise 30px while fading in (about 900ms), cards follow 300ms
after the heading and then every 150ms, icon rows fade in 50ms apart, and large
imagery settles from a slight zoom. A `data-reveal-group` container (shelves,
icon rows) reveals all its children together when it enters the viewport.
Content added after a page's first render appears immediately, focus reveals
pending content at once, and reduced motion skips the choreography entirely.
The home page deliberately has no entrances: it loads fully in place.

## Base styles

`src/index.css` holds the browser reset that Tailwind CSS v2 generated for this
app, kept verbatim when Tailwind was removed so every page looks the same. It is
the only stylesheet outside the storefront's style modules.

## Migration validation

All 14 former storefront CSS files were parsed and converted to objects. Their
Emotion-serialized rules were parsed again and compared with the originals for
selector order, declarations, values, important flags, media queries and keyframes.
All matched. The 29 storefront tests and production build passed. Browser visual
verification is still needed; rule equivalence does not prove every runtime layout.

## Focused commit sequence

Add style modules first while the committed application still uses its existing CSS:

1. Reveal, menu glyph, links, gallery and category picker style modules.
2. Preview layout style module.
3. Collection and showcase style modules.
4. Listening stories style module.
5. Bag and recommendation style modules.
6. Product detail style module.
7. Authentication and navigation style modules.
8. Mount `StorefrontStyles`, remove component CSS imports and delete the old CSS
   files together. This final wiring commit has a large mechanical deletion but
   switches one styling mechanism without changing application behavior.
9. Record the styling documentation.

Do not commit removal of the old CSS separately from its import removal. Do not
rerun the historical design-baseline commit helper after this migration.
