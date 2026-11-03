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
