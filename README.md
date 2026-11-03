# RESONANCE

An in-ear and over-ear headphone storefront built with React and JavaScript.
RESONANCE is an ongoing rebuild of a student e-commerce project, combining a
finished visual direction with a backend that is being modernized in small,
tested steps.

The new storefront is the application's main interface at `/`.

## Current functionality

- Responsive collection and product pages with image selection and zoom.
- Category switching, product recommendations and animated navigation.
- A shopping bag with quantity controls and totals, persisted on the current device.
- Locally saved favourite products.
- Matching sign-in and sign-up interfaces with form validation.
- Keyboard focus handling and reduced-motion support.

The catalog currently uses local data. Authentication forms are not connected to
account services yet, and checkout does not process payments or create orders.
The bag and saved products are browser-local, not synchronized with MariaDB.

## Stack and architecture

| Area | Current implementation |
| --- | --- |
| UI | React, JavaScript, MUI and Emotion |
| Styling | Feature-local JavaScript style objects; a minimal Tailwind entry point remains |
| API | Node.js and Express |
| Persistence | MariaDB and Sequelize |
| Tests | React Testing Library, Jest and Node's test runner |

The backend is being developed as a modular monolith. HTTP handling, application
logic and persistence will have separate responsibilities, with repositories added
as each feature is modernized. This separation is a delivery goal, not a claim
that the legacy backend already implements every layer.

Application construction and server startup are already separated. Configuration
is centralized, and the API checks its database connection before accepting traffic.
Existing authentication, authorization and checkout logic still need replacement;
the legacy API is not ready for public deployment.

The core database relationships remain:

- Users have carts and ratings.
- Carts contain products through cart rows, which hold quantities.
- Products can appear in multiple carts and receive multiple ratings.

Upcoming work includes safe migrations, password hashing and sessions, ownership
checks, API-backed catalog and cart state, and transactional checkout with preserved
purchase history. The old flower catalog will be replaced with headphone products.

## Run the storefront

Use a Node.js version that supports the built-in `node --test` runner and npm.
From the repository root:

```bash
npm ci
npm start
```

Open http://localhost:3000. The current storefront can run without MariaDB.

Product photographs in `public/local-preview/` and reference files in
`design-references/` are intentionally excluded from Git. A fresh clone will not
include those images. Use appropriately licensed local assets matching the paths
in `src/features/storefront-preview/headphoneImages.js` to reproduce the imagery.
The directory's historical name does not denote a separate application.

## Run the API locally

With MariaDB running and an existing `shop_db`, create a root `.env`:

```dotenv
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=shop_db
DB_USER=webshop_user
DB_PASS=your-local-password
```

Use credentials for your local database. Shell environment variables take
precedence over the root `.env`, followed by `backend/.env`.

```bash
npm run start:api
```

The default API address is http://localhost:5000. `GET /health` reports process
liveness, not ongoing database readiness.

**Do not use `npm run migrate` to initialize or upgrade data you want to keep.**
The legacy script still drops tables and seeds flowers. Versioned, non-destructive
migrations are the next backend delivery; fresh-database setup is not automated yet.

## Checks

```bash
npm run test:api
CI=true npm test -- --watchAll=false --runInBand
npm run build
```

Backend tests currently cover configuration and startup without a live database.
Database integration, concurrency and security tests will accompany their features.

## Project layout

| Path | Purpose |
| --- | --- |
| `src/App.js` | Main storefront entry |
| `src/features/storefront-preview/` | Active storefront, account forms, bag and styles |
| `backend/app.js` | Express application construction |
| `backend/server.js` | Database authentication and HTTP startup |
| `backend/config/` | Environment and database configuration |
| `backend/routes/`, `backend/services/`, `backend/models/` | Backend being modernized |
| `backend/tests/` | Backend behavior tests |
| `docs/` | Architecture, development notes and styling guidance |

Older components remain in the repository while their functionality is replaced;
they are not the active storefront.

See [the delivery plan](docs/PROJECT_PLAN.md),
[backend development](docs/BACKEND_DEVELOPMENT.md) and
[styling architecture](docs/STYLING.md).

Built by Adrian Nasrat.
