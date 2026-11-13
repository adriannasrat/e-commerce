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
- `npm run test:db` covers migrations, accounts, carts and checkout. It empties its
  database, so it refuses any `DB_NAME` that does not end in `_test`.

`GET /health` is a process liveness check, not proof of database connectivity.
Each product's images and films are rows in `ProductMedia`: one main cut-out,
optional gallery views and an optional film, with paths relative to the
storefront's media base. The database allows one main image per product.
Products without a `category`, such as the original flowers, stay in the database
but are not sold. Checkout is a demo: `paid` is set without any real payment.
