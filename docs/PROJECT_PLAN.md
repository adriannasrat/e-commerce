# E-commerce project: vision and delivery plan

## Purpose and decisions

Modernize the existing Flowers codebase into a headphone store portfolio demo.
The store's new name has not been decided. Purchases and payments must be clearly
identified as demos. The project should demonstrate thoughtful UX and testable
business logic.

- Keep React, Node.js/Express, Sequelize, and MariaDB.
- Use JavaScript, not TypeScript.
- Keep all project documentation, code comments, UI copy, and commit messages
  in English. Conversations may use English or Swedish.
- Work in small, cohesive changes that the user can review and commit.
- Preserve existing data during the rebuild. Do not run the current `migrate.js`
  as a regular migration: it drops tables.
- Select images together once the layout's image requirements are clear.

## Visual direction

Use the VELOUR references in `design-references/` as inspiration: a light gray
and white base, oversized black sans-serif typography, and restrained orange
accents. Use asymmetric composition, generous whitespace, large product imagery,
small labels, and fine lines. Dark photographic sections can introduce contrast
further down the page. Develop an original store identity; the reference's copy,
logos, and statistics are not part of our design.

Create a custom MUI theme for colors, typography, spacing, and components.
Replace existing Tailwind styling gradually as each view is redesigned.

### Image placeholders first

- Hero: reserve a large area for headphones, with the headline composed around
  the product.
- Product listing: use consistent image proportions and backgrounds.
- Editorial sections: provide larger areas for detail and lifestyle photography.
- Specify image purpose and format during prototyping. Decorative placeholders
  must not be announced as actual product images to screen readers.
- Reserve image space to prevent layout shifts during loading.

The existing photographs show products from several established manufacturers.
Do not present them as products developed by the store. Verify model names,
image sources, and usage terms before publication.

### Motion and accessibility

Use Motion for coordinated introductions, layout changes, dialogs, the cart,
and page transitions. Selected React Bits components may complement the design
after checking their dependencies, license, and accessibility.

Evaluate motion in a working prototype. Refine product-specific effects once
final images are selected. Maintain keyboard navigation, visible focus, clear
error messages, and reduced-motion support. WCAG 2.2 AA is the target and must
be verified in the finished interface.

## Target architecture

The backend is a modular monolith with a shared MariaDB database.

| Module | Responsibility |
| --- | --- |
| Auth | Registration, password hashing, sessions, and logout. |
| Catalog | Products, variants, categories, and administration. |
| Cart | Guest and customer carts, quantities, and the sign-in transition. |
| Orders | Order placement, historical order lines, and status transitions. |
| Inventory | Stock levels, reservations, and reservation release. |
| Payments | Simulated payment attempts and outcomes. |
| Reviews | Ratings, validation, and ownership. |

Separate HTTP handling, use cases, domain rules, and infrastructure within
modules where needed. Domain rules must be testable without Express or
Sequelize. Avoid generic abstractions that do not address a concrete need.
Modules use explicit interfaces to modify one another's data.

Organize the frontend by feature, with shared layout, UI components, and an API
client. Give server data, form data, and local UI state clear owners. All cart
views use the same data format and source of state. Shape API responses
explicitly; do not expose raw Sequelize models.

### Checkout guarantees

- The backend calculates prices and validates positive integer quantities
  and product variants.
- Order lines preserve the price, currency, and product description at purchase.
- Order creation and stock reservation share one short transaction, using
  module operations with the same transaction context.
- Concurrent purchases must not reserve the same last item.
- Idempotency prevents duplicate orders and duplicate payment effects.
- Payment processing runs outside the database transaction, behind a provider
  interface.
- Reservations have a lifecycle. Late payment results, timeouts, and retries
  require explicit rules and tests.
- Use durable background jobs or an outbox when work must survive crashes.

### Security and operations

Introduce secure password hashes, server-managed sessions, appropriate cookie
flags, CSRF protection, and role and ownership checks. Remove sensitive logging
and validate input on the server. Existing plaintext-password accounts need an
explicit transition strategy before password storage changes.

Centralize environment configuration and API addresses. Separate server startup
from application construction, version database migrations, and keep demo seed
data and reset operations separate. Add Docker Compose, CI, health checks, and
operational documentation as the corresponding foundations are completed.

## Small deliveries

Each item is a stage that may contain several focused commits.
Add tests alongside the corresponding behavior changes.

1. Document decisions and delivery order (this document).
2. Create an isolated visual prototype with a theme, header, and hero using
   image placeholders. Review desktop and mobile before adding more sections.
3. Centralize configuration and separate the Express app from server startup.
4. Introduce safe user responses, password hashing, sessions, and authorization
   in cohesive steps that keep the frontend and backend compatible.
5. Introduce migrations and model orders, variants, and stock reservations.
6. Consolidate cart data handling and build a transaction-safe checkout with
   simulated payments and protection against duplicate requests.
7. Apply the approved design to the catalog, product view, cart, checkout,
   account, and administration, one area at a time.
8. Complete Docker Compose, CI, deployment, and portfolio documentation.

Keep the visual prototype separate from the existing unprotected API runtime.
A public demo must not expose the current user and administration endpoints.

## Ready for a commit

- The change has a clear purpose and a manageable review scope.
- Files and components have focused responsibilities; split large files by
  responsibility.
- Relevant checks are complete and limitations are documented.
- UI changes are reviewed in the browser on desktop and mobile.
- Security and checkout are verified with behavior tests, including failure
  and concurrency scenarios where relevant.
- Suggest a commit message; the user makes the commit.
