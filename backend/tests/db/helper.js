const { once } = require('node:events');
const { Sequelize } = require('sequelize');
const { createMigrator } = require('../../migrator');
const { readEnvironment } = require('../../config/environment');

// These tests empty their database, so they refuse anything not named *_test.
const config = readEnvironment().database;
if (!config.database.endsWith('_test')) {
  throw new Error('Database tests need DB_NAME to end in _test');
}

async function resetDatabase() {
  const admin = new Sequelize({ ...config, database: undefined });
  await admin.query(`DROP DATABASE IF EXISTS \`${config.database}\``);
  await admin.query(`CREATE DATABASE \`${config.database}\``);
  await admin.close();
}

// One process per test file: reset first, before the app's pool has connected.
async function startApi(t) {
  await resetDatabase();
  const sequelize = require('../../config/database');
  await createMigrator(sequelize).up();
  const { API_PREFIX, createApp } = require('../../app');
  const server = createApp().listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}${API_PREFIX}`;
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    await sequelize.close();
  });

  // A minimal cookie-keeping client, one per simulated visitor.
  return () => {
    let cookie = '';
    return async (method, url, body) => {
      const response = await fetch(base + url, {
        method,
        headers: { 'content-type': 'application/json', cookie },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      const set = response.headers.get('set-cookie');
      if (set) cookie = set.split(';')[0];
      const isJson = response.headers.get('content-type')?.includes('json');
      return { status: response.status, setCookie: set, body: isJson ? await response.json() : null };
    };
  };
}

module.exports = { config, resetDatabase, startApi };
