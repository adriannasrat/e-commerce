const test = require('node:test');
const assert = require('node:assert/strict');
const { startApi } = require('./helper');

test('the catalogue lists the headphones and leaves older products out', async (t) => {
  const visitor = await startApi(t);
  const { Product } = require('../../models');
  await Product.create({ title: 'Rose', description: 'A rose', price_ore: 4000, imageUrl: 'rose.jpg' });

  const { status, body } = await visitor()('GET', '/products');
  assert.equal(status, 200);
  assert.equal(body.length, 14);
  assert.equal(body.some((product) => product.title === 'Rose'), false);
  const form = body.find((product) => product.slug === 'black');
  assert.equal(form.title, 'Form 01');
  assert.equal(form.price_ore, 179000);
  assert.equal(form.category, 'over-ear');
  assert.equal(form.stock_quantity, 25);
});
