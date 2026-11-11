# Roadmap

RESONANCE is a portfolio demo. The goal is a storefront that anyone can open at a
public address, use without setup, and read as an example of careful engineering.
Payments stay in test mode and no real money is ever taken.

## Standing decisions

- React, Node.js with Express, Sequelize and MariaDB.
- TypeScript, adopted gradually: new files are TypeScript and existing JavaScript
  is converted when it changes, never rewritten only for the conversion.
- Documentation, code comments, UI copy and commit messages are in English.
- Small, focused commits that each keep the tests passing.
- Existing data is preserved: schema changes go through versioned migrations.
- Free hosting tiers only.
- WCAG 2.2 AA is the accessibility target, including keyboard use and reduced motion.

## Architecture principles

The API is a modular monolith over one database. Each domain (catalogue, accounts,
cart, orders, payments) keeps HTTP handling, business rules and persistence apart,
and business rules are testable without Express. Responses are shaped explicitly,
never raw Sequelize models.

The frontend is organised by feature. Server data, form data and local UI state
each have one clear owner, and every cart view reads the same source.

Checkout guarantees, which every change must keep:

- The server calculates prices and validates quantities.
- Purchased lines keep the price they were bought at.
- Two buyers can never both get the last item.
- A repeated request never buys twice.
- Payment provider calls never run inside a database transaction.

## Phases

### Phase 0: Clean and secure the foundation

- [x] Remove unused code, files and packages.
- [x] Update runtime packages with known vulnerabilities.
- [x] Keep build and test tooling in `devDependencies`.
- [x] Run tests and the build in GitHub Actions on every pull request.
- [x] Rewrite the README and replace the old project plan with this roadmap.
- [x] Require passing CI before merging into `main`.

### Phase 1: Live demo

- [x] Move from Create React App to Vite and Vitest, with lint and type checks in CI.
- [x] Replace hash routes with real URLs.
- [ ] Fetch server data through TanStack Query.
- [ ] Move images and films to object storage behind a CDN, with a `product_media` table.
- [ ] Prefix the API with `/api/v1`, validate configuration at startup, add security headers and structured logging.
- [ ] Choose free hosting for the frontend, API and database, and deploy on every merge.
- [ ] Add a demo sign-in and a nightly reset of demo data.

### Phase 2: Show the commerce flow

- [ ] Model orders with explicit statuses, separate from carts.
- [ ] Take payments through Stripe in test mode, confirmed only by its webhook.
- [ ] Add an account page with order history.
- [ ] Limit repeated sign-in attempts.
- [ ] Cover browse, bag, sign-in and checkout with a Playwright test in CI.

### Phase 3: Make it easy to evaluate

- [ ] Add screenshots, an architecture diagram and the demo link to the README.
- [ ] Record major decisions in `docs/adr/`.
- [ ] Publish Lighthouse results and a short case study of the checkout design.

## Out of scope

Real payments, legal texts for consumer sales, email receipts, password recovery,
production backups, an admin interface and a CMS. Any of these can be added later
if the project's goal changes.

## Done means

- The change has one clear purpose and a reviewable size.
- Tests cover the behaviour, including failure and concurrency cases for money and stock.
- UI changes are checked in the browser on desktop and mobile.
- CI passes and limitations are documented.
