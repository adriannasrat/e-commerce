const test = require('node:test');
const assert = require('node:assert/strict');
const { checkoutParams } = require('../payments/stripe');

const order = {
  id: 7,
  placed_at: '2026-11-24T12:00:00.000Z',
  delivery_ore: 14900,
  items: [{ title: 'Atlas', amount: 2, unit_price_ore: 179000, details: 'Graphite · A little closer', image: 'products/atlas.webp' }],
};

test('Stripe shows each line with its finish, picture and price, then delivery', () => {
  const params = checkoutParams({ order, origin: 'https://shop.example' });
  assert.deepEqual(params.line_items, [
    {
      quantity: 2,
      price_data: {
        currency: 'sek',
        unit_amount: 179000,
        product_data: { name: 'Atlas', description: 'Graphite · A little closer', images: ['https://shop.example/media/products/atlas.webp'] },
      },
    },
    {
      quantity: 1,
      price_data: { currency: 'sek', unit_amount: 14900, product_data: { name: 'Express delivery', description: undefined, images: undefined } },
    },
  ]);
  assert.equal(params.success_url, 'https://shop.example/order/7?payment=done');
  assert.match(params.custom_text.submit.message, /test card 4242 4242 4242 4242/);
  // The page is held for 31 minutes from when the order was placed.
  assert.equal(params.expires_at, Date.parse(order.placed_at) / 1000 + 31 * 60);
});

test('pictures are left out where Stripe cannot fetch them', () => {
  const params = checkoutParams({ order: { ...order, delivery_ore: 0 }, origin: 'http://localhost:3000' });
  assert.equal(params.line_items.length, 1);
  assert.equal(params.line_items[0].price_data.product_data.images, undefined);
});
