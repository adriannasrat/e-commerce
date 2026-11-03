const test = require('node:test');
const assert = require('node:assert/strict');
const { readEnvironment } = require('../config/environment');

test('configuration preserves development defaults and uses MariaDB consistently', () => {
  const config = readEnvironment({});
  assert.equal(config.port, 5000);
  assert.equal(config.database.port, 3306);
  assert.equal(config.database.dialect, 'mariadb');
  assert.equal(config.database.logging, false);
  assert.equal(config.database.password, undefined);
});

test('explicit database and server settings override defaults', () => {
  const config = readEnvironment({ PORT: '5010', DB_PORT: '3307', DB_NAME: 'test_shop', DB_USER: 'test_user', DB_PASS: 'test-password', DB_HOST: 'database' });
  assert.equal(config.port, 5010);
  assert.deepEqual(config.database, { database: 'test_shop', username: 'test_user', password: 'test-password', host: 'database', port: 3307, dialect: 'mariadb', logging: false });
});

test('invalid ports fail early without including supplied values in errors', () => {
  for (const key of ['PORT', 'DB_PORT']) {
    for (const value of ['', '0', '-1', '65536', '5000x', '3.5', 'sensitive-value']) {
      assert.throws(() => readEnvironment({ [key]: value }), { message: `${key} must be an integer between 1 and 65535` });
    }
  }
});
