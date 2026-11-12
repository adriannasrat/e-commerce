const test = require('node:test');
const assert = require('node:assert/strict');
const { startApi } = require('./helper');

test('a retired product leaves the catalogue and cannot be bought, only removed', async (t) => {
  const visitor = await startApi(t);
  const { Product } = require('../../models');
  const product = (title) => Product.create({
    title, category: 'over-ear', description: 'd', price_ore: 100000, imageUrl: 'x', stock_quantity: 5,
  });
  const kept = await product('Kept');
  const retiring = await product('Retiring');

  const api = visitor();
  await api('POST', '/users/signup', { email: 'ada@example.test', password: 'long enough' });
  await api('PUT', `/cart/items/${kept.id}`, { amount: 1 });
  const { body: cart } = await api('PUT', `/cart/items/${retiring.id}`, { amount: 2 });

  await retiring.update({ retired_at: new Date() });
  const { body: catalogue } = await visitor()('GET', '/products');
  assert.equal(catalogue.some(({ id }) => id === retiring.id), false);
  assert.equal(catalogue.some(({ id }) => id === kept.id), true);

  const increase = await api('PUT', `/cart/items/${retiring.id}`, { amount: 3 });
  assert.equal(increase.status, 409);
  assert.equal(increase.body.error, 'Retiring is no longer sold');

  const { body: merged } = await api('POST', '/cart/merge', {
    items: [{ product_id: retiring.id, amount: 4 }, { product_id: kept.id, amount: 2 }],
  });
  const amounts = Object.fromEntries(merged.items.map((item) => [item.title, item.amount]));
  assert.deepEqual(amounts, { Kept: 2, Retiring: 2 });

  const refused = await api('POST', '/cart/checkout', { cartId: cart.id });
  assert.equal(refused.status, 409);
  assert.equal(refused.body.error, 'Retiring is no longer sold. Remove it to check out');
  assert.equal((await Product.findByPk(kept.id)).stock_quantity, 5);

  assert.equal((await api('PUT', `/cart/items/${retiring.id}`, { amount: 0 })).status, 200);
  const paid = await api('POST', '/cart/checkout', { cartId: cart.id });
  assert.equal(paid.status, 200);
  assert.equal(paid.body.total_ore, 200000);
});
