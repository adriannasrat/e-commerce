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

// Seeds a database in its original schema, then migrates it up to `to`, or to
// the end. A test stops right after the migration it is about, so later data
// changes such as retiring products do not blur what it checks.
async function migrateLegacyDatabase(seed, to) {
  await resetDatabase();
  const sequelize = new Sequelize(config);
  const migrator = createMigrator(sequelize);
  await migrator.up({ to: '001-baseline.js' });
  await seed(sequelize);
  await migrator.up(to ? { to } : undefined);
  return sequelize;
}

const now = "'2025-08-25 16:54:34'";
const BEFORE_RETIREMENT = "010-product-retirement.js";

test('existing products keep their data with prices converted to öre', async () => {
  const sequelize = await migrateLegacyDatabase(async (db) => {
    await db.query('ALTER TABLE Products MODIFY price DOUBLE NOT NULL');
    await db.query(`INSERT INTO Products (title, description, price, stock_quantity, imageUrl, createdAt, updatedAt)
      VALUES ('Rose', 'A rose', 40, 5, 'rose.jpg', ${now}, ${now}), ('Tulip', 'A tulip', 30.5, 5, 'tulip.jpg', ${now}, ${now})`);
  });
  const rows = await sequelize.query('SELECT title, price_ore, stock_quantity FROM Products WHERE slug IS NULL ORDER BY id', { type: QueryTypes.SELECT });
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
  }, BEFORE_RETIREMENT);
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

test('several unpaid carts merge into one, and paid carts are left alone', async () => {
  const sequelize = await migrateLegacyDatabase(async (db) => {
    await seedUserAndProduct(db);
    await db.query(`INSERT INTO Products (id, title, description, price, stock_quantity, imageUrl, createdAt, updatedAt)
      VALUES (2, 'Tulip', 'A tulip', 30, 5, 'tulip.jpg', ${now}, ${now})`);
    await db.query(`INSERT INTO Carts (id, user_id, payed, createdAt, updatedAt)
      VALUES (1, 1, 1, ${now}, ${now}), (2, 1, 0, ${now}, ${now}), (3, 1, 0, ${now}, ${now})`);
    await db.query(`INSERT INTO CartRows (amount, cart_id, product_id, createdAt, updatedAt)
      VALUES (9, 1, 1, ${now}, ${now}), (1, 2, 1, ${now}, ${now}), (2, 2, 2, ${now}, ${now}), (3, 3, 1, ${now}, ${now})`);
  }, BEFORE_RETIREMENT);
  const select = (sql) => sequelize.query(sql, { type: QueryTypes.SELECT });
  assert.deepEqual(await select('SELECT id, paid FROM Carts ORDER BY id'), [{ id: 1, paid: 1 }, { id: 3, paid: 0 }]);
  assert.deepEqual(await select('SELECT cart_id, product_id, amount FROM CartRows ORDER BY cart_id, product_id'), [
    { cart_id: 1, product_id: 1, amount: 9 },
    { cart_id: 3, product_id: 1, amount: 4 },
    { cart_id: 3, product_id: 2, amount: 2 },
  ]);
  await assert.rejects(
    sequelize.query(`INSERT INTO Carts (user_id, paid, createdAt, updatedAt) VALUES (1, 0, ${now}, ${now})`),
    { name: 'SequelizeUniqueConstraintError' },
  );
  await sequelize.close();
});

test('the original flowers are retired, while the headphones stay for sale', async () => {
  const sequelize = await migrateLegacyDatabase(seedUserAndProduct, BEFORE_RETIREMENT);
  const select = (sql) => sequelize.query(sql, { type: QueryTypes.SELECT });
  const [rose] = await select("SELECT retired_at FROM Products WHERE title = 'Rose'");
  assert.ok(rose.retired_at instanceof Date);
  const [{ count }] = await select('SELECT COUNT(*) AS count FROM Products WHERE category IS NOT NULL AND retired_at IS NOT NULL');
  assert.equal(Number(count), 0);
  await sequelize.close();
});

test('retired models leave open carts but stay in paid ones', async () => {
  await resetDatabase();
  const sequelize = new Sequelize(config);
  const migrator = createMigrator(sequelize);
  const select = (sql) => sequelize.query(sql, { type: QueryTypes.SELECT });
  await migrator.up({ to: '010-product-retirement.js' });
  const [{ id: form04 }] = await select("SELECT id FROM Products WHERE slug = 'form-04'");
  const [{ id: form05 }] = await select("SELECT id FROM Products WHERE slug = 'form-05'");
  await sequelize.query(`INSERT INTO Users (id, email, password, createdAt, updatedAt) VALUES (1, 'a@example.test', 'secret', ${now}, ${now})`);
  await sequelize.query(`INSERT INTO Carts (id, user_id, paid, paid_at, createdAt, updatedAt)
    VALUES (1, 1, 1, ${now}, ${now}, ${now}), (2, 1, 0, NULL, ${now}, ${now})`);
  await sequelize.query(`INSERT INTO CartRows (cart_id, product_id, amount, unit_price_ore, createdAt, updatedAt)
    VALUES (1, ${form04}, 1, 279000, ${now}, ${now}), (2, ${form04}, 2, NULL, ${now}, ${now}), (2, ${form05}, 1, NULL, ${now}, ${now})`);

  await migrator.up();
  assert.deepEqual(await select('SELECT cart_id, product_id FROM CartRows ORDER BY cart_id, product_id'), [
    { cart_id: 1, product_id: form04 },
    { cart_id: 2, product_id: form05 },
  ]);
  const forSale = await select('SELECT slug FROM Products WHERE retired_at IS NULL AND category IS NOT NULL ORDER BY id');
  assert.deepEqual(forSale.map(({ slug }) => slug), ['black', 'silver', 'pocket-05', 'form-05', 'form-06', 'pocket-06', 'pocket-07', 'pocket-08']);
  await sequelize.close();
});

test('product media allows one main image per product and only known roles', async () => {
  await resetDatabase();
  const sequelize = new Sequelize(config);
  await createMigrator(sequelize).up();
  const [{ id }] = await sequelize.query("SELECT id FROM Products WHERE slug = 'black'", { type: QueryTypes.SELECT });
  const insert = (role, position) => sequelize.query(
    `INSERT INTO ProductMedia (product_id, role, kind, position, path, alt, createdAt, updatedAt)
     VALUES (${id}, '${role}', 'photo', ${position}, 'x.webp', 'x', ${now}, ${now})`,
  );
  await assert.rejects(insert('main', 0), { name: 'SequelizeUniqueConstraintError' });
  await assert.rejects(insert('main', 1), /CONSTRAINT/);
  await assert.rejects(insert('poster', 5), /CONSTRAINT/);
  await insert('gallery', 9);
  await sequelize.close();
});
