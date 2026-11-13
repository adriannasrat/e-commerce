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

test('every response carries security headers and hides the framework', async t => {
  const { createApp } = require('../app');
  const server = createApp().listen(0, '127.0.0.1');
  t.after(() => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const path of ['/health', '/api/v1/nowhere']) {
    const { headers } = await fetch(base + path);
    assert.equal(headers.get('x-content-type-options'), 'nosniff');
    assert.equal(headers.get('x-frame-options'), 'SAMEORIGIN');
    assert.equal(headers.get('referrer-policy'), 'no-referrer');
    assert.match(headers.get('content-security-policy'), /default-src 'self'/);
    assert.match(headers.get('strict-transport-security'), /max-age=/);
    assert.equal(headers.get('x-powered-by'), null);
  }
});

test('each request is logged once with its id, never with headers or cookies', async t => {
  const { createApp } = require('../app');
  const { createLogger } = require('../logger');
  const lines = [];
  const logger = createLogger({ LOG_LEVEL: 'info' }, { write: (line) => lines.push(line) });
  const server = createApp({ logger }).listen(0, '127.0.0.1');
  t.after(() => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;

  const traced = await fetch(`${base}/api/v1/nowhere`, { headers: { 'x-request-id': 'trace-1', cookie: 'session=secret-token' } });
  assert.equal(traced.headers.get('x-request-id'), 'trace-1');
  const invented = await fetch(`${base}/health`, { headers: { 'x-request-id': 'not a valid id!' } });
  assert.match(invented.headers.get('x-request-id'), /^[0-9a-f-]{36}$/);

  const entries = lines.map((line) => JSON.parse(line));
  assert.equal(entries.length, 2);
  assert.deepEqual(entries[0].req, { id: 'trace-1', method: 'GET', url: '/api/v1/nowhere' });
  assert.equal(entries[0].res.statusCode, 404);
  assert.equal(entries[0].level, 40);
  assert.equal(entries[1].req.id, invented.headers.get('x-request-id'));
  assert.equal(entries[1].level, 30);
  assert.ok(lines.every((line) => !line.includes('secret-token') && !line.includes('cookie')));
});
