const test = require('node:test');
const assert = require('node:assert/strict');
const { startApi } = require('./helper');

test('a cart and a rating belong only to the signed-in user', async (t) => {
  const visitor = await startApi(t);
  const { Product } = require('../../models');
  const product = await Product.create({ title: 'Form', description: 'd', price_ore: 100, imageUrl: 'x', stock_quantity: 3 });

  const guest = visitor();
  assert.equal((await guest('GET', '/cart')).status, 401);
  assert.equal((await guest('PUT', `/cart/items/${product.id}`, { amount: 1 })).status, 401);
  assert.equal((await guest('POST', `/products/${product.id}/ratings`, { rating: 5 })).status, 401);

  const ada = visitor();
  const bo = visitor();
  await ada('POST', '/users/signup', { email: 'ada@example.test', password: 'long enough' });
  await bo('POST', '/users/signup', { email: 'bo@example.test', password: 'long enough' });

  const cart = await ada('PUT', `/cart/items/${product.id}`, { amount: 2 });
  assert.equal(cart.body.items[0].amount, 2);
  assert.deepEqual((await bo('GET', '/cart')).body.items, []);
  assert.equal((await ada('PUT', `/cart/items/${product.id}`, { amount: 4 })).status, 409);
  assert.equal((await ada('PUT', `/cart/items/${product.id}`, { amount: -1 })).status, 400);
  assert.deepEqual((await ada('PUT', `/cart/items/${product.id}`, { amount: 0 })).body.items, []);

  await ada('POST', `/products/${product.id}/ratings`, { rating: 5 });
  await ada('POST', `/products/${product.id}/ratings`, { rating: 3 });
  await bo('POST', `/products/${product.id}/ratings`, { rating: 5 });
  assert.equal(Number((await guest('GET', `/products/${product.id}`)).body.average_rating), 4);
  assert.equal((await ada('POST', `/products/${product.id}/ratings`, { rating: 6 })).status, 400);

  assert.equal((await guest('GET', '/users')).status, 404);
  assert.equal((await guest('DELETE', `/products/${product.id}`)).status, 404);
});
