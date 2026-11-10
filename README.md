# RESONANCE

[![CI](https://github.com/adriannasrat/e-commerce/actions/workflows/ci.yml/badge.svg)](https://github.com/adriannasrat/e-commerce/actions/workflows/ci.yml)

A headphone storefront built as a portfolio project with React, Express and
MariaDB. Accounts, the cart and checkout are real, but payments are a demo and
no money is ever taken.

## Features

- A catalogue of over-ear and in-ear models served by the API, with loading, empty and error states.
- Product pages with image views, zoom, product films and related models.
- Sign up and sign in with hashed passwords and httpOnly session cookies.
- A bag that lives in the browser for guests and merges into the server cart on sign-in.
- A checkout that locks stock, buys at most once per cart and freezes prices in the purchase history.
- Keyboard focus handling and reduced-motion support throughout.

## Stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, MUI and Emotion, built with Create React App |
| API | Node.js and Express |
| Database | MariaDB with Sequelize and versioned Umzug migrations |
| Tests | Jest and React Testing Library, Node's test runner, GitHub Actions |

## Architecture

The frontend lives in `src/features/storefront-preview/`, grouped by feature with
styles beside their components. In development the React server proxies API calls
to Express, so the browser sees a single origin.

The API separates HTTP routes from services and Sequelize models. A few decisions
carry most of the weight:

- **Prices are stored in öre** as integers, so totals never suffer from rounding.
- **Sessions are opaque tokens** in an httpOnly cookie, and only a digest is stored.
  Routes act on the signed-in user and never accept a user id.
- **One active cart per user** is enforced by the database through a unique
  generated column, not only by application code.
- **Checkout runs in a single transaction.** Stock rows are locked in a fixed order
  to avoid deadlocks, and a repeated request for the same cart buys only once.

## Run it locally

You need Node.js 22 or later and MariaDB 11.

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

Product photography and films are kept out of Git, in `public/local-preview/`.
A fresh clone runs without them but shows no imagery. The expected file paths are
listed in `src/features/storefront-preview/headphoneImages.js`,
`lifestyleImages.js` and `ui/films.js`.

## Tests

| Command | Covers |
| --- | --- |
| `npx react-scripts test --watchAll=false` | Storefront components and flows |
| `npm run test:api` | API configuration and startup, without a database |
| `DB_NAME=shop_test npm run test:db` | Migrations, accounts, cart and checkout against MariaDB |

The database tests empty their database, so they refuse any name that does not
end in `_test`. The database user needs full privileges on that database.
GitHub Actions runs all three suites and a production build on every pull request.

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
