// Gives the end-to-end tests a fresh database with every migration, so each
// run starts from the same catalogue and stock. It empties the database it is
// given, so like the database tests it refuses any name not ending in _test.
const { Sequelize } = require('sequelize');
const { readEnvironment } = require('../backend/config/environment');

async function main() {
  const config = readEnvironment().database;
  if (!config.database.endsWith('_test')) {
    throw new Error('The end-to-end tests need DB_NAME to end in _test');
  }
  const admin = new Sequelize({ ...config, database: undefined });
  await admin.query(`DROP DATABASE IF EXISTS \`${config.database}\``);
  await admin.query(`CREATE DATABASE \`${config.database}\``);
  await admin.close();

  const sequelize = require('../backend/config/database');
  const { createMigrator } = require('../backend/migrator');
  await createMigrator(sequelize).up();
  await sequelize.close();
}

main().catch((error) => {
  console.error(`Preparing the end-to-end database failed: ${error.cause?.message || error.message}`);
  process.exit(1);
});
