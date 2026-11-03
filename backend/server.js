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

if (require.main === module) {
  async function main() {
    const { readEnvironment } = require('./config/environment');
    const { port } = readEnvironment();
    const { createApp } = require('./app');
    const database = require('./config/database');
    await startServer({ app: createApp(), database, port });
    console.log(`API listening on port ${port}`);
  }

  main().catch(() => {
    // Driver errors can include connection credentials; do not log them here.
    console.error('API startup failed. Check configuration, database availability and port availability.');
    process.exitCode = 1;
  });
}

module.exports = { startServer };
