const test = require('node:test');
const assert = require('node:assert/strict');
const { QueryTypes, Sequelize } = require('sequelize');
const { config, resetDatabase } = require('./helper');
const { createMigrator } = require('../../migrator');
const { verifyPassword } = require('../../auth/password');

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

const seedUserAndProduct = async (db) => {
  await db.query(`INSERT INTO Users (id, email, password, createdAt, updatedAt) VALUES (1, 'a@example.test', 'secret', ${now}, ${now})`);
  await db.query(`INSERT INTO Products (id, title, description, price, stock_quantity, imageUrl, createdAt, updatedAt)
    VALUES (1, 'Rose', 'A rose', 40, 5, 'rose.jpg', ${now}, ${now})`);
};

test('duplicate cart rows merge, and the database then rejects invalid rows', async () => {
  const sequelize = await migrateLegacyDatabase(async (db) => {
    await seedUserAndProduct(db);
    await db.query(`INSERT INTO Carts (id, user_id, payed, createdAt, updatedAt) VALUES (1, 1, 0, ${now}, ${now})`);
    await db.query(`INSERT INTO CartRows (amount, cart_id, product_id, createdAt, updatedAt)
      VALUES (2, 1, 1, ${now}, ${now}), (3, 1, 1, ${now}, ${now}), (0, 1, 1, ${now}, ${now})`);
  });
  const rows = await sequelize.query('SELECT amount FROM CartRows', { type: QueryTypes.SELECT });
  assert.deepEqual(rows, [{ amount: 5 }]);
  const insert = (amount) => sequelize.query(`INSERT INTO CartRows (amount, cart_id, product_id, createdAt, updatedAt)
    VALUES (${amount}, 1, 1, ${now}, ${now})`);
  await assert.rejects(insert(1), { name: "SequelizeUniqueConstraintError" });
  await sequelize.query('DELETE FROM CartRows');
  await assert.rejects(insert(0), /CONSTRAINT/);
  await sequelize.close();
});

test('ratings without an owner survive adding user_id', async () => {
  const sequelize = await migrateLegacyDatabase(async (db) => {
    await seedUserAndProduct(db);
    await db.query('ALTER TABLE Ratings DROP FOREIGN KEY ratings_ibfk_1');
    await db.query('ALTER TABLE Ratings DROP COLUMN user_id');
    await db.query(`INSERT INTO Ratings (rating, product_id, createdAt, updatedAt) VALUES (4, 1, ${now}, ${now})`);
  });
  const rows = await sequelize.query('SELECT rating, user_id FROM Ratings', { type: QueryTypes.SELECT });
  assert.deepEqual(rows, [{ rating: 4, user_id: null }]);
  await sequelize.query(`INSERT INTO Ratings (rating, product_id, user_id, createdAt, updatedAt) VALUES (5, 1, 1, ${now}, ${now})`);
  await assert.rejects(
    sequelize.query(`INSERT INTO Ratings (rating, product_id, user_id, createdAt, updatedAt) VALUES (3, 1, 1, ${now}, ${now})`),
    { name: "SequelizeUniqueConstraintError" },
  );
  await sequelize.close();
});

test('plain-text passwords become hashes that still verify', async () => {
  const sequelize = await migrateLegacyDatabase(seedUserAndProduct);
  const [{ password }] = await sequelize.query('SELECT password FROM Users', { type: QueryTypes.SELECT });
  assert.notEqual(password, 'secret');
  assert.equal(await verifyPassword('secret', password), true);
  assert.equal(await verifyPassword('wrong', password), false);
  await sequelize.close();
});
