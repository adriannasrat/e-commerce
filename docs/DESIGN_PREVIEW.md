# Headphone storefront preview

Run `npm ci`, then `npm start`, and open `http://localhost:3000/preview`.
No database or backend server is required for this preview.

The preview includes a scoped MUI theme, responsive header and navigation
dialog, oversized hero typography, a decorative CSS headphone placeholder,
and an interactive graphite/chalk finish selector. The full-screen navigation
uses a MUI slide transition and staggered link reveals. Search, account, and
shopping-bag icons open explanatory preview panels. Resonance is a working
name. The collection section establishes the next section's typography;
it is not a product catalog yet.

The `/preview` entry bypasses the legacy application and cart provider.
Existing store routes remain available separately. Reference images stay
local in the ignored `design-references/` directory.

This first slice uses MUI and CSS transitions with reduced-motion
support. Motion and React Bits integration is a subsequent step after visual
review. Final product photography, search, account, cart, and checkout are
outside this preview's scope.

Review the composition on desktop and mobile, try both finishes, and open
and dismiss the navigation with the keyboard. Confirm the visual direction
before extending the collection layout.

### Local photo gallery

The hero gallery uses `black-headphones.webp`, `white-headphones.png`, and `silver-headphones.webp` copied
from `design-references/` to `public/local-preview/`. Both folders are ignored
by Git. Missing hero images fall back to the matching CSS placeholder.

Three overlapping thumbnail buttons per category select the active image. The selected thumbnail moves to the back of the stack, with animated positions and a stable keyboard order. All gallery images remain mounted for
smooth CSS opacity and transform transitions, including rapid selection changes.
The controls support keyboard activation and expose the selected state through
`aria-pressed`. Reduced-motion preferences disable the transitions.

### Demo collection

`products.js` is the shared source for six fictional model names, descriptions,
and SEK prices. Hero details follow the active gallery image. The collection
links open the matching product detail view; the hero's collection link
navigates down to the product cards. These are browsing interactions only, with
no checkout, inventory, or backend integration. Product cards use three columns on desktop and two on mobile, with white tiles, thin dividers, and centered image, finish, model name, and price.

The collection includes three over-ear and three in-ear concepts. Image bounds
exclude empty margins; a shared frame fits both width and height so wider earbud
cases stay fully visible. Original photographs are not stretched or modified.

### Hero category selection

The centered Over-ear / In-ear controls filter the hero thumbnail stack to three
images. The active category is derived from the selected product, so selecting a
collection card also activates its category. Switching categories selects the
first model in that category; clicking the active category preserves selection.
The collection continues to show all six models. The white in-ear photograph
has been replaced and its visible image bounds recalibrated.

### Navigation and interaction refinement

The wordmark sits on the left, with search, account, bag, and navigation controls
on the right. Mobile icons are smaller. The rightmost menu glyph animates from
two parallel lines into a cross; reduced-motion preferences disable this animation.
Buttons outside navigation use subtle tone changes on hover rather than color
inversion. Keyboard focus indicators remain visible.

Above 900px, shared navigation links are displayed directly in the header.
Smaller screens use the animated menu toggle on the right. Circular controls
use restrained hover tones, and gallery thumbnails no longer lift on hover.

The mobile toggle stays at the trigger’s viewport position while the panel
expands independently. Its mounted glyph uses two sequential transitions:
lines converge, then rotate; closing reverses the sequence. The dialog retains
focus trapping, Escape handling, and focus restoration.

### Listening stories

A new editorial section follows the collection, inspired by the large rounded
card galleries on Apple’s Mac page. Three local headphone images accompany
original lifestyle copy. Cards reveal on entry, images ease on hover, and the
horizontal gallery supports touch, arrow keys, and previous/next controls.
Each card opens an accessible MUI dialog with an action to open that design’s product detail view. Reduced-motion preferences disable animated transitions. No
product specifications or purchasing capabilities are implied.

### Consistent section entrances

`ScrollReveal` supplies a shared 850ms fade and gentle upward entrance for the
header, hero, category strip, collection headings and cards, listening stories,
and footer. Each element reveals once when entering the viewport. Product cards
use short staggered delays. Existing gallery and menu interactions stay separate.
Reduced motion, keyboard focus, and missing IntersectionObserver support leave
content available without an entrance animation.

### Product detail views

Collection images, hero imagery, and story actions link to `/preview#product/<id>`.
Hash navigation supports direct links, refresh, and browser back/forward without
connecting the legacy shop. Invalid product IDs show a return-to-collection link.
Each view includes a large image, enlargement dialog, model name, demo price,
finish navigation, and expandable information. Finish links change to the actual
matching concept model and price rather than pretending these are identical variants.
No checkout, stock, shipping, or technical specifications are fabricated.

### Navigation motion stability

The home sections stay mounted (hidden on product routes), preserving completed
entrances and gallery state on return. Finish changes update the existing product
view without resetting scroll or moving focus. Route scroll placement happens
before paint. Reveals prepare before paint, settle after completion or focus,
and no longer restart when focus leaves a section.

### Category showcase

A separate promotional grid after Listening Stories presents Over-ear and In-ear as two category cards.
Inspired by Apple’s homepage tile layout, it uses two columns on desktop and
one on mobile, centered copy, large product images, and Learn more / Buy links.
Both actions lead to the first product of the matching category in the collection; no checkout is introduced. The
section uses the shared entrance animation and respects reduced motion.

### Demo shopping bag

Product pages offer Add to bag and navigate to `/preview#added/<id>` before Review bag opens `/preview#bag`. The isolated
preview bag stores only validated product IDs and quantities in localStorage;
prices are always derived from the shared catalogue. Repeated additions merge,
quantities are limited to 1–99, and unavailable storage falls back to memory.
The navbar badge shows total units. Its accessible dialog opens with a subtle
downward entrance, a blurred backdrop, product thumbnails, and Review bag.
The bag page supports quantity changes, removal, totals, and an empty state.
Check out opens an honest demo explanation; no payment or order is submitted.
Reduced motion is respected. The legacy cart and backend remain separate.

### Post-add recommendations and profile shortcuts

The added-product page has a sticky summary and Review bag links, followed by
two recommendation groups using existing catalogue products. Add to bag on a
recommendation updates the shared bag in place. Refreshing or revisiting the
route never adds another item. Unknown IDs show a recovery link.
The bag panel includes Orders, Your saves, Account, and Sign in with MUI icons.
Each opens an explicitly labelled preview message; authentication, order history,
and saved favourites are not implemented yet.
Product details use a narrower information column on the left and a large
image on the right at desktop widths. Full view and close-up thumbnails use
the same source photograph, with responsive layout and reduced-motion support.

### Product detail purchase layout

The product detail now pairs a narrow purchase column with a large image and view thumbnails. Delivery, pickup, express checkout, bookmarking and help use matching outlined icons. Service dialogs clearly explain unavailable demo services; Add to bag retains the existing bag flow. Save for later persists model IDs locally and exposes them under Your saves in the bag menu.

Full-width Product Information and Compatibility disclosures precede a paginated You may also like gallery. Recommendations link to real preview models. The layout adapts to one column on mobile and honours reduced-motion preferences. Photography uses the existing full image and detail crop; no additional product angles or technical claims are invented.

### Sign-in page

The account icon and the bag menu's Account / Sign in actions open `/preview#sign-in`. The local sign-in reference informs a split composition: warm charcoal artwork with the existing silver headphones, and a rounded light form panel with RESONANCE typography and an orange primary action. Mobile uses a compact artwork banner above the form.

The preview includes labelled email/password fields, a password visibility toggle, native required/email validation, keyboard focus on entry, and reduced-motion support. Authentication is not connected: submission clears the fields and explains that no credentials were sent or saved. Registration and recovery actions explain their unavailable status. The reference and product image files remain ignored by Git.

Sign-in and sign-up now share the same persistent artwork and page shell. Links between `/preview#sign-in` and `/preview#sign-up` replace only the form, clear transient credentials, and focus the new heading without resetting scroll or replaying the artwork reveal. Registration includes name, email, password and password confirmation, with matching-password validation. Both forms use charcoal buttons, subtle hover states and neutral grey input focus rings. Registration remains a preview and does not create an account or transmit credentials.

### JavaScript styling

The storefront's standalone CSS files have been migrated to feature-local MUI
style objects in JavaScript. `StorefrontStyles` applies them once, including portal
styles, with the established cascade order preserved. See `STYLING.md` for the
architecture, verification and focused commit sequence. The legacy application
still needs the three Tailwind directives in `src/index.css`.
