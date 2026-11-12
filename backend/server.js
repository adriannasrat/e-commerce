async function startServer({ app, database, port }) {
  try {
    await database.authenticate();
    return await new Promise((resolve, reject) => {
      const server = app.listen(port);
      server.once('listening', () => resolve(server));
      server.once('error', reject);
    });
  } catch (error) {
    // Failed startup must also release any connection-pool resources.
    await database.close().catch(() => {});
    throw error;
  }
}

// Turns a startup failure into lines that are safe to print. Driver messages
// can hold connection details, so only known causes are described, by name.
function describeStartupFailure(error, port) {
  if (error.name === 'ConfigurationError') return error.problems;
  if (error.code === 'EADDRINUSE') {
    return [`Port ${port} is already in use. Stop the other process or set PORT.`];
  }
  if (error.name === 'SequelizeAccessDeniedError') {
    return ['The database refused the login. Check DB_USER and DB_PASS.'];
  }
  if (['ER_BAD_DB_ERROR', 'ER_DBACCESS_DENIED_ERROR'].includes(error.parent?.code)) {
    return ['The database in DB_NAME does not exist, or DB_USER may not use it. Create it or grant access, then run npm run migrate.'];
  }
  if (/^Sequelize(ConnectionRefused|HostNotFound|HostNotReachable|Connection)Error$/.test(error.name)) {
    return ['The database could not be reached. Check that MariaDB is running, and DB_HOST and DB_PORT.'];
  }
  return ['API startup failed. Check configuration, database availability and port availability.'];
}

if (require.main === module) {
  // The environment module loads .env before the logger is created.
  require('./config/environment');
  const { logger } = require('./logger');
  let port;
  async function main() {
    const { readEnvironment } = require('./config/environment');
    ({ port } = readEnvironment());
    const { createApp } = require('./app');
    const database = require('./config/database');
    await startServer({ app: createApp(), database, port });
    logger.info({ port }, 'API listening');
  }

  main().catch((error) => {
    for (const line of describeStartupFailure(error, port)) logger.error(line);
    process.exitCode = 1;
  });
}

module.exports = { describeStartupFailure, startServer };
