# Backend development

## Structure

`backend/app.js` constructs the Express application and mounts the routes.
`backend/server.js` owns startup: authenticate the database, then listen for HTTP.
Importing either module does not start a server or authenticate the database.
Startup logs and error responses never print raw driver errors or credentials.

Sessions are httpOnly cookies, with only a digest of the token stored. Routes act
on the signed-in user and never take a user id, so a cart can only be its owner's.
The React dev server proxies API calls to this port, so the browser sees one origin.

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

Ports must be integers between 1 and 65535. The database configuration adapter
uses the same MariaDB settings as the running API. Use a dedicated database user
when configuring a deployed environment; local defaults are not deployment policy.

## Commands and checks

- `npm run migrate` applies migrations not yet recorded in `SequelizeMeta`. They keep
  existing data, but MariaDB cannot roll back schema changes: back up first with
  `mariadb-dump shop_db > backup.sql`.
- `npm run start:api` starts the API after MariaDB authentication succeeds.
- `npm run test:api` needs no database.
- `npm run test:db` covers migrations, accounts, carts and checkout. It empties its
  database, so it refuses any `DB_NAME` that does not end in `_test`.

`GET /health` is a process liveness check, not proof of database connectivity.
Products without a `category`, such as the original flowers, stay in the database
but are not sold. Checkout is a demo: `paid` is set without any real payment.
