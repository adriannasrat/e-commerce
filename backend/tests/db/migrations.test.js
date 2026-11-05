const test = require('node:test');
const assert = require('node:assert/strict');
const { QueryTypes, Sequelize } = require('sequelize');
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

async function migrateLegacyDatabase(seed) {
  await resetDatabase();
  const sequelize = new Sequelize(config);
  const migrator = createMigrator(sequelize);
  await migrator.up({ to: '001-baseline.js' });
  await seed(sequelize);
  await migrator.up();
  return sequelize;
}

const now = "'2025-08-25 16:54:34'";

test('existing products keep their data with prices converted to öre', async () => {
  const sequelize = await migrateLegacyDatabase(async (db) => {
    await db.query('ALTER TABLE Products MODIFY price DOUBLE NOT NULL');
    await db.query(`INSERT INTO Products (title, description, price, stock_quantity, imageUrl, createdAt, updatedAt)
      VALUES ('Rose', 'A rose', 40, 5, 'rose.jpg', ${now}, ${now}), ('Tulip', 'A tulip', 30.5, 5, 'tulip.jpg', ${now}, ${now})`);
  });
  const rows = await sequelize.query('SELECT title, price_ore, stock_quantity FROM Products ORDER BY id', { type: QueryTypes.SELECT });
  assert.deepEqual(rows, [
    { title: 'Rose', price_ore: 4000, stock_quantity: 5 },
    { title: 'Tulip', price_ore: 3050, stock_quantity: 5 },
  ]);
  await sequelize.close();
});
