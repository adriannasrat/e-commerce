const test = require('node:test');
const assert = require('node:assert/strict');
const { ConfigurationError, readEnvironment } = require('../config/environment');

test('configuration preserves development defaults and uses MariaDB consistently', () => {
  const config = readEnvironment({});
  assert.equal(config.port, 5001);
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

const problemsFor = (env) => {
  try {
    readEnvironment(env);
    return [];
  } catch (error) {
    assert.ok(error instanceof ConfigurationError);
    return error.problems;
  }
};

test('invalid ports fail early without including supplied values in errors', () => {
  for (const key of ['PORT', 'DB_PORT']) {
    for (const value of ['', '0', '-1', '65536', '5000x', '3.5', 'sensitive-value']) {
      assert.deepEqual(problemsFor({ [key]: value }), [`${key} must be an integer between 1 and 65535`]);
    }
  }
});

test('every problem is reported at once, naming variables but never values', () => {
  const problems = problemsFor({ PORT: 'secret-1', DB_PORT: 'secret-2', DB_NAME: ' ', NODE_ENV: 'staging', DB_PASSWORD: 'secret-3' });
  assert.deepEqual(problems, [
    'NODE_ENV must be one of development, test, production',
    'DB_PASSWORD is not read; set DB_PASS instead',
    'PORT must be an integer between 1 and 65535',
    'DB_NAME must not be empty',
    'DB_PORT must be an integer between 1 and 65535',
  ]);
  assert.ok(problems.every((problem) => !problem.includes('secret')));
});

test('a misspelled password variable is fine once the real one is set', () => {
  assert.deepEqual(problemsFor({ DB_PASSWORD: 'x', DB_PASS: 'x' }), []);
});

test('production needs an explicit database host and password', () => {
  assert.deepEqual(problemsFor({ NODE_ENV: 'production' }), [
    'DB_HOST is required in production',
    'DB_PASS is required in production',
  ]);
  const config = readEnvironment({ NODE_ENV: 'production', DB_HOST: 'db.internal', DB_PASS: 'x' });
  assert.equal(config.secureCookies, true);
});

test('an unknown log level is reported', () => {
  assert.deepEqual(problemsFor({ LOG_LEVEL: 'loud' }), [
    'LOG_LEVEL must be one of fatal, error, warn, info, debug, trace, silent',
  ]);
  assert.deepEqual(problemsFor({ LOG_LEVEL: 'debug' }), []);
});
