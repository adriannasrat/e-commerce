const test = require('node:test');
const assert = require('node:assert/strict');
const { startApi } = require('./helper');

test('the catalogue lists the headphones and leaves older products out', async (t) => {
  const visitor = await startApi(t);
  const { Product } = require('../../models');
  await Product.create({ title: 'Rose', description: 'A rose', price_ore: 4000, imageUrl: 'rose.jpg' });

  const { status, body } = await visitor()('GET', '/products');
  assert.equal(status, 200);
  assert.equal(body.length, 8);
  assert.deepEqual(
    body.map((product) => product.title),
    ['Atlas', 'Halo', 'Pearl', 'Tide', 'Grove', 'Pebble', 'Prism', 'Drift'],
  );
  assert.equal(body.some((product) => product.title === 'Rose'), false);
  const form = body.find((product) => product.slug === 'black');
  assert.equal(form.title, 'Atlas');
  assert.equal(form.price_ore, 179000);
  assert.equal(form.category, 'over-ear');
  assert.equal(form.stock_quantity, 25);
  assert.equal(form.imageUrl, '/media/products/atlas.webp');
  const roles = (product) => product.media.map((item) => item.role + ':' + item.path);
  assert.deepEqual(roles(form), [
    'film:films/form-orbit.mp4',
    'gallery:photos/atlas-cup.webp',
    'gallery:photos/atlas-mesh.webp',
    'main:products/atlas.webp',
  ]);
  const main = form.media.find((item) => item.role === 'main');
  assert.deepEqual(main.crop, [658, 159, 1738, 1437]);
  assert.equal(main.tone, 'dark');
  assert.ok(body.every((product) => product.media.some((item) => item.role === 'main')));
  const pocket = body.find((product) => product.slug === 'pocket-05');
  assert.equal(pocket.finish_name, 'Chalk');
  assert.equal(pocket.imageUrl, '/media/products/pearl.webp');
});
