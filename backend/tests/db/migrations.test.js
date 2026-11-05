const test = require('node:test');
const assert = require('node:assert/strict');
const { Sequelize } = require('sequelize');
const { config, resetDatabase } = require('./helper');
const { createMigrator } = require('../../migrator');

test('an empty database migrates, and running again changes nothing', async () => {
  await resetDatabase();
  const sequelize = new Sequelize(config);
  const migrator = createMigrator(sequelize);
  assert.ok((await migrator.up()).length > 0);
  assert.equal((await migrator.up()).length, 0);
  await sequelize.close();
});
