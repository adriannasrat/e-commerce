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

test('the API lives under /api/v1 and answers unknown paths there with JSON', async t => {
  const { API_PREFIX, createApp } = require('../app');
  const server = createApp().listen(0, '127.0.0.1');
  t.after(() => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  assert.equal(API_PREFIX, '/api/v1');
  const unknown = await fetch(`${base}/api/v1/nowhere`);
  assert.equal(unknown.status, 404);
  assert.deepEqual(await unknown.json(), { error: 'Not found' });
  const unversioned = await fetch(`${base}/products`);
  assert.equal(unversioned.status, 404);
  assert.notEqual(unversioned.headers.get('content-type')?.includes('json'), true);
});
