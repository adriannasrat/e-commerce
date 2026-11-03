const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { Sequelize } = require('sequelize');

test('constructing the app does not connect or listen; health works without a database', async t => {
  const authenticate = t.mock.method(Sequelize.prototype, 'authenticate', async () => { throw new Error('Unexpected database access'); });
  const { createApp } = require('../app');
  const app = createApp();
  assert.equal(authenticate.mock.callCount(), 0);
  const server = app.listen(0, '127.0.0.1');
  t.after(() => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
  await once(server, 'listening');
  const response = await fetch(`http://127.0.0.1:${server.address().port}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
  assert.equal(authenticate.mock.callCount(), 0);
});
