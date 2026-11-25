# RESONANCE

[![CI](https://github.com/adriannasrat/e-commerce/actions/workflows/ci.yml/badge.svg)](https://github.com/adriannasrat/e-commerce/actions/workflows/ci.yml)

A headphone storefront built as a portfolio project with React, Express and
MariaDB. Accounts, the cart and checkout are real, and payments run through
Stripe in test mode, so no real money is ever taken.

## Features

- A catalogue of over-ear and in-ear models served by the API, with loading, empty and error states.
- Product pages with image views, zoom, product films and related models.
- Sign up and sign in with hashed passwords and httpOnly session cookies.
- A bag that lives in the browser for guests and merges into the server cart on sign-in.
- A checkout that locks stock, buys at most once per cart and freezes prices in the order history.
- An account page at `/account` with every order, its status and a link to its details.
- Keyboard focus handling and reduced-motion support throughout.

## Stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, MUI and Emotion, TanStack Query for server state, built with Vite |
| Language | JavaScript, with TypeScript adopted gradually |
| API | Node.js and Express |
| Database | MariaDB with Sequelize and versioned Umzug migrations |
| Tests | Vitest and React Testing Library, Node's test runner, GitHub Actions |

## Architecture

The frontend lives in `src/features/storefront-preview/`, grouped by feature with
styles beside their components. Every page has its own URL, such as `/store` or
`/product/form-05`, and `routes.ts` both builds and reads those addresses. The
session, the catalogue and the signed-in cart live in one TanStack Query cache.
Cart changes and checkout run one at a time, each on the latest server result. In
development Vite proxies `/api/v1` calls to Express, so the browser sees a single origin.

The API separates HTTP routes from services and Sequelize models. A few decisions
carry most of the weight:

- **Prices are stored in öre** as integers, so totals never suffer from rounding.
- **Sessions are opaque tokens** in an httpOnly cookie, and only a digest is stored.
  Routes act on the signed-in user and never accept a user id.
- **Guessing passwords is slowed down.** Five wrong passwords for one email from
  one address, or twenty from one address in all, pause sign-in there for 15
  minutes. Only digests of the email and address are kept, and someone guessing
  elsewhere cannot lock the owner out.
- **A cart is the bag, and it stays until it is paid for.** The database allows
  one per user. Checking out gives it an order with its own lines and an
  explicit status: `pending`, `paid` or `cancelled`. The bag keeps its items
  while the payment is open, changing the bag closes that payment, and only a
  confirmed payment empties it.
- **Placing an order runs in a single transaction.** Stock rows are locked in a
  fixed order to avoid deadlocks, and a repeated request for an unchanged bag
  returns its open order.
- **Only Stripe's signed webhook marks an order paid.** The order reserves its
  stock, then Stripe Checkout takes the payment outside any database
  transaction. A payment page that expires cancels the order and returns its
  stock, and repeated or late events change nothing.
- **A demo account lasts one visit.** Signing out closes its open payments,
  returns their stock and removes the account with its bag and orders.

## Run it locally

You need Node.js 26, as pinned in `.nvmrc`, and MariaDB 11.

1. Install dependencies.

   ```bash
   npm ci
   ```

2. Create a database and a user for it in MariaDB.

   ```sql
   CREATE DATABASE shop_db;
   CREATE USER 'webshop_user'@'localhost' IDENTIFIED BY 'your-local-password';
   GRANT ALL PRIVILEGES ON `shop_db`.* TO 'webshop_user'@'localhost';
   ```

3. Create a `.env` file in the repository root.

   ```dotenv
   DB_NAME=shop_db
   DB_USER=webshop_user
   DB_PASS=your-local-password
   ```

4. Apply the migrations, then start the API and the storefront in separate terminals.

   ```bash
   npm run migrate
   npm run start:api
   npm start
   ```

The storefront opens at http://localhost:3000 and the API runs on port 5001.
See [backend development](docs/BACKEND_DEVELOPMENT.md) for every setting.

### Images and films

Images and films live in `public/media/` and ship with the storefront to its CDN.
Each product's cut-out, gallery views and film are rows in the `ProductMedia`
table, which the API returns with the product. Editorial photos and films are
listed in `lifestyleImages.js` and `ui/films.js`. Every path goes through
`mediaUrl`, so setting `VITE_MEDIA_BASE_URL` at build time serves the media from
another host. `scripts/whiten-films.sh` rebuilds the films from local originals,
up to 1280 px wide and again 720 px wide for phones, which load the smaller copy.
Each film is a silent H.264 loop of a few hundred kilobytes, and none starts
downloading before it comes on screen, except the one at the top of the home page.

Each cut-out and photo also exists in smaller widths, such as
`atlas-640w.webp`, so a phone never downloads the file a large screen needs.
Photos list them in `srcset`; cut-outs are drawn in SVG, which has no `srcset`,
so they measure the size they are drawn at and pick a copy themselves. After
adding or replacing an image, run `node scripts/resize-media.js`, which writes
the copies and the list of widths in `media-sizes.json`.

## Deployment

The storefront and the API deploy together to Vercel. The built storefront and
`public/media` are served from its CDN, and `api/index.js` runs the same Express
app as a serverless function, so `/api/v1` shares the site's origin and the
session cookie. A production deploy runs the database migrations first, through
`scripts/vercel-build.js`, and a failed migration stops the deploy. Preview
deploys never migrate. Every merge to `main` deploys.

The database is a MySQL-compatible TiDB Cloud Starter cluster. Production needs
`NODE_ENV=production`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` and
`DB_SSL=true`, set in the Vercel project. TiDB ignores CHECK constraints until
`SET GLOBAL tidb_enable_check_constraint = ON` has been run once on the cluster.

Visitors can sign in to a demo account of their own without a password. Every
night at 03:00 UTC, Vercel Cron calls `/api/v1/demo/reset`, which removes every
account with its bags, orders and ratings and refills the stock. The call needs
`CRON_SECRET` set in the Vercel project, and the reset refuses all calls without it.

Payments need `STRIPE_SECRET_KEY`, a test-mode key, and `STRIPE_WEBHOOK_SECRET`
from a Stripe webhook that sends the `checkout.session.completed`,
`checkout.session.expired`, `checkout.session.async_payment_succeeded` and
`checkout.session.async_payment_failed` events to `/api/v1/payments/webhook`.
The API refuses to start with a live key.

To pay locally, run `npm run migrate`, then start the API with the webhook
secret of the Stripe CLI:

```bash
STRIPE_WEBHOOK_SECRET=$(stripe listen --print-secret) npm run start:api
```

In a second terminal, forward Stripe's events to it:

```bash
stripe listen --forward-to localhost:5001/api/v1/payments/webhook --events checkout.session.completed,checkout.session.expired,checkout.session.async_payment_succeeded,checkout.session.async_payment_failed
```

Pay with the test card 4242 4242 4242 4242, any future expiry date and any CVC.
Product pictures are left out of Stripe's page locally, since Stripe cannot
fetch them from localhost.

## Tests

| Command | Covers |
| --- | --- |
| `npm test` | Storefront components and flows, in watch mode |
| `npm run lint` | ESLint on the storefront |
| `npm run typecheck` | The TypeScript compiler on `.ts` and `.tsx` files |
| `npm run test:api` | API configuration and startup, without a database |
| `DB_NAME=shop_test npm run test:db` | Migrations, accounts, cart and checkout against MariaDB |
| `DB_NAME=shop_test npm run test:e2e` | Browsing, the bag, sign-in and paying, in Chromium with Playwright |

The database and end-to-end tests empty their database, so they refuse any name
that does not end in `_test`. The database user needs full privileges on that
database. The end-to-end tests build the storefront and start it, the API and a
local stand-in for Stripe on ports 4173, 5101 and 12111, so they need no network
or Stripe keys. Run `npx playwright install chromium` once before the first run.
GitHub Actions runs all of these and a production build on every pull request.

## Project layout

| Path | Purpose |
| --- | --- |
| `src/features/storefront-preview/` | The storefront: pages, bag, account forms and styles |
| `backend/app.js`, `backend/server.js` | Express setup and server startup |
| `backend/routes/`, `backend/services/`, `backend/models/` | HTTP, business logic and persistence |
| `backend/migrations/` | Versioned database migrations |
| `backend/tests/` | API tests, with database tests in `backend/tests/db/` |
| `docs/` | Roadmap, backend notes and styling guidance |

## Further reading

- [Roadmap](docs/ROADMAP.md)
- [Backend development](docs/BACKEND_DEVELOPMENT.md)
- [Styling architecture](docs/STYLING.md)

Built by Adrian Nasrat.
