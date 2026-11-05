const test = require('node:test');
const assert = require('node:assert/strict');
const { startApi } = require('./helper');

test('the cart stays single and merges a guest bag safely', async (t) => {
  const visitor = await startApi(t);
  const { Cart, Product } = require('../../models');
  const product = (title, stock) => Product.create({ title, description: 'd', price_ore: 100, imageUrl: 'x', stock_quantity: stock });
  const roomy = await product('Roomy', 10);
  const scarce = await product('Scarce', 2);

  const api = visitor();
  const { body: user } = await api('POST', '/users/signup', { email: 'ada@example.test', password: 'long enough' });

  const parallel = await Promise.all([1, 2, 3, 4].map(() => api('PUT', `/cart/items/${roomy.id}`, { amount: 1 })));
  assert.deepEqual(parallel.map(({ status }) => status), [200, 200, 200, 200]);
  assert.equal(await Cart.count({ where: { user_id: user.id, paid: false } }), 1);

  const merge = () => api('POST', '/cart/merge', {
    items: [
      { product_id: roomy.id, amount: 3 },
      { product_id: scarce.id, amount: 5 },
      { product_id: 99999, amount: 1 },
    ],
  });
  const amounts = ({ body }) => Object.fromEntries(body.items.map((item) => [item.title, item.amount]));
  assert.deepEqual(amounts(await merge()), { Roomy: 3, Scarce: 2 });
  assert.deepEqual(amounts(await merge()), { Roomy: 3, Scarce: 2 });

  assert.equal((await api('POST', '/cart/merge', { items: [{ product_id: roomy.id, amount: -1 }] })).status, 400);
  assert.equal((await visitor()('POST', '/cart/merge', { items: [] })).status, 401);
});
