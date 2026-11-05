const test = require('node:test');
const assert = require('node:assert/strict');
const { startApi } = require('./helper');

test('accounts, sessions and passwords', async (t) => {
  const visitor = await startApi(t);
  const api = visitor();
  const credentials = { email: 'Ada@Example.test', password: 'long enough' };

  assert.equal((await api('GET', '/users/me')).status, 401);
  assert.equal((await api('POST', '/users/signup', { ...credentials, password: 'short' })).status, 400);

  const signup = await api('POST', '/users/signup', credentials);
  assert.equal(signup.status, 201);
  assert.deepEqual(Object.keys(signup.body).sort(), ['email', 'id']);
  assert.match(signup.setCookie, /HttpOnly/);
  assert.match(signup.setCookie, /SameSite=Lax/);
  assert.equal((await api('GET', '/users/me')).body.email, 'ada@example.test');

  assert.equal((await visitor()('POST', '/users/signup', credentials)).status, 409);
  assert.equal((await visitor()('POST', '/users/signin', { ...credentials, password: 'wrong password' })).status, 401);

  assert.equal((await api('POST', '/users/signout')).status, 204);
  assert.equal((await api('GET', '/users/me')).status, 401);

  const signin = await api('POST', '/users/signin', credentials);
  assert.equal(signin.status, 200);
  assert.equal(signin.body.password, undefined);
  assert.equal((await api('GET', '/users/1')).status, 404);
});

