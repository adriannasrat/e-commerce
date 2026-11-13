const test = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const { startServer } = require('../server');

test('HTTP traffic is accepted only after database authentication', async () => {
  const events = [];
  let authenticate;
  const database = { authenticate: () => new Promise(resolve => { authenticate = resolve; }), close: async () => {} };
  const server = new EventEmitter();
  const app = { listen(port) { events.push(port); process.nextTick(() => server.emit('listening')); return server; } };
  const starting = startServer({ app, database, port: 5000 });
  assert.deepEqual(events, []);
  authenticate();
  assert.equal(await starting, server);
  assert.deepEqual(events, [5000]);
});

test('database failure prevents listening and closes the pool', async () => {
  let closed = false;
  const failure = new Error('Database unavailable');
  const database = { authenticate: async () => { throw failure; }, close: async () => { closed = true; } };
  const app = { listen() { assert.fail('Must not listen after failed authentication'); } };
  await assert.rejects(startServer({ app, database, port: 5000 }), failure);
  assert.equal(closed, true);
});

test('a busy HTTP port rejects startup and closes the pool', async () => {
  let closed = false;
  const failure = new Error('Port in use');
  const database = { authenticate: async () => {}, close: async () => { closed = true; } };
  const app = { listen() { const server = new EventEmitter(); process.nextTick(() => server.emit('error', failure)); return server; } };
  await assert.rejects(startServer({ app, database, port: 5000 }), failure);
  assert.equal(closed, true);
});

test('startup failures are described by cause, without driver details', () => {
  const { describeStartupFailure } = require('../server');
  const { ConfigurationError } = require('../config/environment');
  const named = (name, extra = {}) => Object.assign(new Error('secret driver message for root:hunter2'), { name, ...extra });

  assert.deepEqual(
    describeStartupFailure(new ConfigurationError(['PORT must be an integer between 1 and 65535']), undefined),
    ['PORT must be an integer between 1 and 65535'],
  );
  assert.deepEqual(describeStartupFailure(Object.assign(new Error('x'), { code: 'EADDRINUSE' }), 5001), [
    'Port 5001 is already in use. Stop the other process or set PORT.',
  ]);
  const lines = [
    describeStartupFailure(named('SequelizeAccessDeniedError'), 5001),
    describeStartupFailure(named('SequelizeConnectionError', { parent: { code: 'ER_BAD_DB_ERROR' } }), 5001),
    describeStartupFailure(named('SequelizeConnectionRefusedError'), 5001),
    describeStartupFailure(named('TypeError'), 5001),
  ].flat();
  assert.match(lines[0], /DB_USER and DB_PASS/);
  assert.match(lines[1], /DB_NAME does not exist, or DB_USER may not use it/);
  assert.match(lines[2], /could not be reached/);
  assert.match(lines[3], /API startup failed/);
  assert.ok(lines.every((line) => !line.includes('hunter2')));
});
