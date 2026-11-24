const test = require("node:test");
const assert = require("node:assert/strict");
const { fakeStripe, startApi, stripeEvent } = require("./helper");

test("payments", async (t) => {
  const visitor = await startApi(t);
  const { Product } = require("../../models");
  let users = 0;
  const shopper = async () => {
    const api = visitor();
    users += 1;
    await api("POST", "/users/signup", { email: `payer${users}@example.test`, password: "long enough" });
    return api;
  };
  const stocked = (stock) =>
    Product.create({ title: `Model ${stock}`, description: "d", price_ore: 100000, imageUrl: "x", stock_quantity: stock });
  const order = async (api, product, amount = 1, delivery = "standard") => {
    const cartId = (await api("PUT", `/cart/items/${product.id}`, { amount })).body.id;
    return (await api("POST", "/orders", { cartId, delivery })).body;
  };
  const stockOf = async (product) => (await Product.findByPk(product.id)).stock_quantity;
  const deliver = (type, orderId, options) => {
    const { event, headers } = stripeEvent(type, orderId, options);
    return visitor()("POST", "/payments/webhook", event, headers);
  };

  await t.test("Stripe is sent the stored prices and the way back to the store", async () => {
    const api = await shopper();
    const placed = await order(api, await stocked(4), 2, "express");
    const { order: sent, origin } = fakeStripe.sessions.get(`cs_test_${placed.id}`);
    assert.equal(sent.total_ore, 214900);
    assert.equal(sent.delivery_ore, 14900);
    assert.match(origin, /^http:\/\/127\.0\.0\.1:\d+$/);
  });

  await t.test("only a signed event marks an order paid, once", async () => {
    const api = await shopper();
    const product = await stocked(3);
    const placed = await order(api, product);
    assert.equal((await api("GET", `/orders/${placed.id}`)).body.status, "pending");

    const { event } = stripeEvent("checkout.session.completed", placed.id);
    const forged = await visitor()("POST", "/payments/webhook", event, { "stripe-signature": "t=1,v1=forged" });
    assert.equal(forged.status, 400);
    assert.equal((await api("GET", `/orders/${placed.id}`)).body.status, "pending");

    assert.equal((await deliver("checkout.session.completed", placed.id)).status, 200);
    assert.equal((await deliver("checkout.session.completed", placed.id)).status, 200);
    const paid = (await api("GET", `/orders/${placed.id}`)).body;
    assert.equal(paid.status, "paid");
    assert.ok(paid.paid_at);
    assert.equal(await stockOf(product), 2);

    // An expiry arriving late never undoes a payment.
    await deliver("checkout.session.expired", placed.id);
    assert.equal((await api("GET", `/orders/${placed.id}`)).body.status, "paid");
    assert.equal(await stockOf(product), 2);
  });

  await t.test("an event for another session, or an unpaid one, changes nothing", async () => {
    const api = await shopper();
    const placed = await order(api, await stocked(3));
    await deliver("checkout.session.completed", placed.id, { sessionId: "cs_test_someone_else" });
    await deliver("checkout.session.completed", placed.id, { paymentStatus: "unpaid" });
    assert.equal((await api("GET", `/orders/${placed.id}`)).body.status, "pending");
  });

  await t.test("an expired payment cancels the order and returns its stock", async () => {
    const api = await shopper();
    const product = await stocked(5);
    const placed = await order(api, product, 3);
    assert.equal(await stockOf(product), 2);
    await deliver("checkout.session.expired", placed.id);
    await deliver("checkout.session.expired", placed.id);
    assert.equal((await api("GET", `/orders/${placed.id}`)).body.status, "cancelled");
    assert.equal(await stockOf(product), 5);
    assert.equal((await api("POST", `/orders/${placed.id}/payment`)).status, 409);
  });

  await t.test("an unpaid order can return to its payment page, only for its owner", async () => {
    const api = await shopper();
    const placed = await order(api, await stocked(2));
    const resumed = await api("POST", `/orders/${placed.id}/payment`);
    assert.deepEqual(resumed.body, { checkout_url: placed.checkout_url });
    assert.equal((await (await shopper())("POST", `/orders/${placed.id}/payment`)).status, 404);
  });

  await t.test("the bag stays until Stripe confirms the payment, and checking out again resumes it", async () => {
    const api = await shopper();
    const product = await stocked(5);
    const placed = await order(api, product, 2);
    const bag = (await api("GET", "/cart")).body;
    assert.deepEqual(bag.items.map(({ amount }) => amount), [2]);

    const again = (await api("POST", "/orders", { cartId: bag.id })).body;
    assert.equal(again.id, placed.id);
    assert.equal(again.checkout_url, placed.checkout_url);
    assert.equal(await stockOf(product), 3);

    await deliver("checkout.session.completed", placed.id);
    assert.equal((await api("GET", "/cart")).body.items.length, 0);
    assert.equal((await api("GET", `/orders/${placed.id}`)).body.status, "paid");
  });

  await t.test("changing the bag or the delivery closes the open payment", async () => {
    const api = await shopper();
    const product = await stocked(5);
    const placed = await order(api, product, 2);
    const { id: cartId } = await api("PUT", `/cart/items/${product.id}`, { amount: 3 }).then((r) => r.body);
    assert.equal(fakeStripe.sessions.get(`cs_test_${placed.id}`).open, false);
    assert.equal((await api("GET", `/orders/${placed.id}`)).body.status, "cancelled");
    assert.equal(await stockOf(product), 5);

    const bigger = (await api("POST", "/orders", { cartId })).body;
    assert.notEqual(bigger.id, placed.id);
    assert.equal(bigger.items[0].amount, 3);
    const express = (await api("POST", "/orders", { cartId, delivery: "express" })).body;
    assert.notEqual(express.id, bigger.id);
    assert.equal((await api("GET", `/orders/${bigger.id}`)).body.status, "cancelled");
    assert.equal(await stockOf(product), 2);
  });

  await t.test("a payment page that expired gives the bag a new order", async () => {
    const api = await shopper();
    const product = await stocked(5);
    const placed = await order(api, product, 2);
    await deliver("checkout.session.expired", placed.id);
    const { id: cartId } = (await api("GET", "/cart")).body;
    const fresh = (await api("POST", "/orders", { cartId })).body;
    assert.notEqual(fresh.id, placed.id);
    assert.equal(fresh.status, "pending");
    assert.equal(await stockOf(product), 3);
  });

  await t.test("cancelling a payment closes Stripe's page and keeps the bag", async () => {
    const api = await shopper();
    const product = await stocked(5);
    const placed = await order(api, product, 3);

    const cancelled = await api("POST", `/orders/${placed.id}/cancel`);
    assert.equal(cancelled.status, 200);
    assert.equal(cancelled.body.status, "cancelled");
    assert.equal(fakeStripe.sessions.get(`cs_test_${placed.id}`).open, false);
    assert.equal(await stockOf(product), 5);
    assert.deepEqual((await api("GET", "/cart")).body.items.map(({ amount }) => amount), [3]);

    // Repeating it, or Stripe's expiry arriving afterwards, changes nothing.
    await api("POST", `/orders/${placed.id}/cancel`);
    await deliver("checkout.session.expired", placed.id);
    assert.equal(await stockOf(product), 5);
    assert.equal((await (await shopper())("POST", `/orders/${placed.id}/cancel`)).status, 404);
  });

  await t.test("a payment Stripe has taken, or a paid order, is never cancelled", async () => {
    const api = await shopper();
    const product = await stocked(5);
    const placed = await order(api, product, 2);
    fakeStripe.sessions.get(`cs_test_${placed.id}`).paid = true;
    assert.equal((await api("POST", `/orders/${placed.id}/cancel`)).status, 409);
    assert.equal((await api("GET", `/orders/${placed.id}`)).body.status, "pending");

    await deliver("checkout.session.completed", placed.id);
    assert.equal((await api("POST", `/orders/${placed.id}/cancel`)).status, 409);
    assert.equal((await api("GET", `/orders/${placed.id}`)).body.status, "paid");
    assert.equal(await stockOf(product), 3);
    assert.equal((await api("GET", "/cart")).body.items.length, 0);
  });

  await t.test("if Stripe cannot open a payment page, nothing is reserved", async () => {
    const api = await shopper();
    const product = await stocked(4);
    fakeStripe.fail = true;
    try {
      const cartId = (await api("PUT", `/cart/items/${product.id}`, { amount: 2 })).body.id;
      const response = await api("POST", "/orders", { cartId });
      assert.equal(response.status, 502);
    } finally {
      fakeStripe.fail = false;
    }
    assert.equal(await stockOf(product), 4);
    assert.equal((await api("GET", "/orders")).body[0].status, "cancelled");
  });
});
