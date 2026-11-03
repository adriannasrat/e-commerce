# Backend development

## Scope of the first delivery

`backend/app.js` constructs the Express application and mounts the existing routes.
`backend/server.js` owns startup: authenticate the database, then listen for HTTP.
Importing either module does not start a server or authenticate the database.
On authentication or listen failure, the connection pool is closed and the CLI exits
with a non-zero status. Startup logs never print raw driver errors or credentials.

This is a structural step, not a completed security upgrade. Existing authentication,
authorization and checkout shortcomings remain until their planned deliveries.
Keep this API local; the design preview remains separate from the legacy endpoints.

## Configuration

All environment reads are centralized in `backend/config/environment.js`.
Precedence is shell environment, repository-root `.env`, then `backend/.env`.
File paths are resolved relative to the module, not the working directory.

| Variable | Default | Purpose |
| --- | --- | --- |
| PORT | 5000 | HTTP port |
| DB_HOST | localhost | MariaDB hostname |
| DB_PORT | 3306 | MariaDB port |
| DB_NAME | shop_db | Database name |
| DB_USER | root | Local development database user |
| DB_PASS | unset | Database password; never logged |

Ports must be integers between 1 and 65535. The database configuration adapter
uses the same MariaDB settings as the running API. Use a dedicated database user
when configuring a deployed environment; local defaults are not deployment policy.

## Commands and checks

- `npm run start:api` starts the existing API after MariaDB authentication succeeds.
- `npm run test:api` runs Node's test runner without a running database. Tests cover
  configuration, app construction, the HTTP health response, startup ordering and
  failure cleanup. The HTTP test binds an ephemeral loopback port.
- `GET /health` is a process liveness check. It does not prove ongoing database
  connectivity after startup.

No real database connection was used to validate this delivery. Database integration
and migration tests belong to the next step.

Do not run `npm run migrate` against data to preserve: the legacy script still drops
and recreates tables. Replacing it safely is step 2.
