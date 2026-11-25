# Backend development

## Structure

`backend/app.js` constructs the Express application and mounts the routes.
`backend/server.js` owns startup: authenticate the database, then listen for HTTP.
Importing either module does not start a server or authenticate the database.
Startup logs and error responses never print raw driver errors or credentials.

Sessions are httpOnly cookies, with only a digest of the token stored. Routes act
on the signed-in user and never take a user id, so a cart can only be its owner's.
Every API route lives under `/api/v1`. In development Vite proxies `/api` to this
port, so the browser sees one origin.

## Configuration

All environment reads are centralized in `backend/config/environment.js`.
Precedence is shell environment, repository-root `.env`, then `backend/.env`.
File paths are resolved relative to the module, not the working directory.

| Variable | Default | Purpose |
| --- | --- | --- |
| PORT | 5001 | HTTP port (macOS AirPlay holds 5000) |
| DB_HOST | localhost | MariaDB hostname |
| DB_PORT | 3306 | MariaDB port |
| DB_NAME | shop_db | Database name |
| DB_USER | root | Local development database user |
| DB_PASS | unset | Database password; never logged |
| NODE_ENV | development | `development`, `test` or `production`; production sends the session cookie over HTTPS only |
| LOG_LEVEL | info | `fatal`, `error`, `warn`, `info`, `debug`, `trace` or `silent` |
| DB_SSL | false | `true` connects with verified TLS, as hosted databases require |
| CRON_SECRET | unset | Bearer token for the nightly demo reset, which refuses all calls when unset |
| STRIPE_SECRET_KEY | unset | Stripe test-mode secret key; a live key stops startup, and checkout refuses orders when unset |
| STRIPE_WEBHOOK_SECRET | unset | Signing secret of the Stripe webhook; events are refused when unset |

Startup checks the configuration and reports every problem at once, by variable
name and never by value. Ports must be integers between 1 and 65535, `NODE_ENV`
must be `development`, `test` or `production`, and set database variables must
not be empty. Common misspellings such as `DB_PASSWORD` are flagged. In production
`DB_HOST` and `DB_PASS` are required, since local defaults are not deployment
policy. Startup failures name their cause, such as a busy port or a refused
database login, without printing driver messages.

## Logging

The API logs one line per request with its id, method, path, status and duration,
as JSON for hosts and log tools and readably in a development terminal. Every
response carries an `X-Request-Id`; a caller's own valid id is reused, so an error
a visitor reports can be found in the log. Headers, cookies, bodies and driver
messages are never logged, and failed requests log only the error type. The tests
run with `LOG_LEVEL=silent`.

## Commands and checks

- `npm run migrate` applies migrations not yet recorded in `SequelizeMeta`. They keep
  existing data, but MariaDB cannot roll back schema changes. Back up first, outside
  the repository, with `mariadb-dump -u webshop_user -p shop_db > ~/shop_db-backup.sql`.
- `npm run start:api` starts the API after MariaDB authentication succeeds.
- `npm run test:api` needs no database.
- `npm run test:db` covers migrations, accounts, carts and orders. It empties its
  database, so it refuses any `DB_NAME` that does not end in `_test`.

`GET /health` is a process liveness check, not proof of database connectivity.

`POST /api/v1/users/signin` answers `429` with `Retry-After` once one email has
failed five times from one network address, or one address has failed twenty
times, within 15 minutes. `SignInFailures` keeps only SHA-256 digests of the
email and address, a successful sign-in clears its pair, and older rows are
removed as new ones arrive. The API trusts one proxy hop, Vercel's edge, for
the visitor's address.
Each product's images and films are rows in `ProductMedia`: one main cut-out,
optional gallery views and an optional film, with paths relative to the
storefront's media base. The database allows one main image per product.
Products without a `category`, such as the original flowers, stay in the database
but are not sold. `POST /api/v1/orders` gives the signed-in user's cart a pending
order and reserves its stock, then opens a Stripe Checkout session and returns
its `checkout_url`. The cart stays until the order is paid. Repeating the call
for an unchanged cart returns the same order and page; a changed cart or
delivery closes the open payment and places a new order, and so does any
change to the cart itself. `POST /api/v1/orders/:id/cancel` closes an unpaid
order's payment and returns its stock, and signing out of a demo account does
the same for all its orders before removing the account. Orders are `pending`, `paid` or
`cancelled`, and the database requires a payment time on every paid order.
Only `POST /api/v1/payments/webhook`, with Stripe's signature, marks an order
`paid` and empties its cart; an expired session cancels it and returns its stock. An unpaid order's
payment page is reopened with `POST /api/v1/orders/:id/payment`. Each order records its delivery, `standard` or `express`,
with the price the server set for it, and `GET /api/v1/orders/:id` returns one
of the signed-in user's orders.
