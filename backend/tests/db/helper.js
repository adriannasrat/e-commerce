const { Sequelize } = require('sequelize');
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

module.exports = { config, resetDatabase };
