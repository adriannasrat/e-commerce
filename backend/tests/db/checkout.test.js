const test = require("node:test");
const assert = require("node:assert/strict");
const { startApi } = require("./helper");

test("checkout", async (t) => {
  const visitor = await startApi(t);
  const { Product } = require("../../models");
  let users = 0;
  const shopper = async () => {
    const api = visitor();
    users += 1;
    await api("POST", "/users/signup", {
      email: `user${users}@example.test`,
      password: "long enough",
    });
    return api;
  };
  const stocked = (stock, price = 100000) =>
    Product.create({
      title: `Model ${stock}-${price}`,
      description: "d",
      price_ore: price,
      imageUrl: "x",
      stock_quantity: stock,
    });
  const fill = async (api, product, amount) =>
    (await api("PUT", `/cart/items/${product.id}`, { amount })).body.id;
  const stockOf = async (product) =>
    (await Product.findByPk(product.id)).stock_quantity;

  await t.test(
    "freezes the price, reduces stock and keeps the purchase as history",
    async () => {
      const api = await shopper();
      const product = await stocked(5, 179000);
      const cartId = await fill(api, product, 2);

      const { status, body: order } = await api("POST", "/orders", { cartId });
      assert.equal(status, 201);
      assert.equal(order.status, "paid");
      assert.equal(order.total_ore, 358000);
      assert.equal(await stockOf(product), 3);
      assert.deepEqual((await api("GET", "/cart")).body.items, []);

      await product.update({ price_ore: 999 });
      const { body: history } = await api("GET", "/orders");
      assert.equal(history.length, 1);
      assert.equal(history[0].items[0].unit_price_ore, 179000);
      assert.equal(history[0].total_ore, 358000);
    },
  );

  await t.test("repeated requests buy only once", async () => {
    const api = await shopper();
    const product = await stocked(10);
    const cartId = await fill(api, product, 3);
    const responses = await Promise.all(
      Array.from({ length: 5 }, () => api("POST", "/orders", { cartId })),
    );
    assert.deepEqual(
      responses.map(({ status }) => status),
      [201, 201, 201, 201, 201],
    );
    assert.equal(new Set(responses.map(({ body }) => body.id)).size, 1);
    assert.equal(await stockOf(product), 7);
    assert.equal((await api("GET", "/orders")).body.length, 1);
    assert.equal(
      (await api("POST", "/orders", { cartId })).body.total_ore,
      300000,
    );
    assert.equal(await stockOf(product), 7);
  });

  await t.test("two buyers cannot both get the last item", async () => {
    const product = await stocked(1);
    const buyers = await Promise.all([
      shopper(),
      shopper(),
      shopper(),
      shopper(),
    ]);
    const carts = await Promise.all(buyers.map((api) => fill(api, product, 1)));
    const responses = await Promise.all(
      buyers.map((api, index) =>
        api("POST", "/orders", { cartId: carts[index] }),
      ),
    );
    assert.deepEqual(
      responses.map(({ status }) => status).sort(),
      [201, 409, 409, 409],
    );
    assert.equal(await stockOf(product), 0);
  });

  await t.test("opposite carts do not deadlock", async () => {
    const first = await stocked(50);
    const second = await stocked(50, 200000);
    const buyers = await Promise.all([
      shopper(),
      shopper(),
      shopper(),
      shopper(),
    ]);
    const carts = [];
    for (const [index, api] of buyers.entries()) {
      const [a, b] = index % 2 ? [first, second] : [second, first];
      await fill(api, a, 1);
      carts.push(await fill(api, b, 1));
    }
    const responses = await Promise.all(
      buyers.map((api, index) =>
        api("POST", "/orders", { cartId: carts[index] }),
      ),
    );
    assert.deepEqual(
      responses.map(({ status }) => status),
      [201, 201, 201, 201],
    );
    assert.equal(await stockOf(first), 46);
    assert.equal(await stockOf(second), 46);
  });

  await t.test("one short item leaves everything untouched", async () => {
    const api = await shopper();
    const rival = await shopper();
    const plenty = await stocked(9);
    const scarce = await stocked(1, 300000);
    await fill(api, plenty, 2);
    const cartId = await fill(api, scarce, 1);
    await fill(rival, scarce, 1);
    await rival("POST", "/orders", {
      cartId: (await rival("GET", "/cart")).body.id,
    });

    assert.equal((await api("POST", "/orders", { cartId })).status, 409);
    assert.equal(await stockOf(plenty), 9);
    assert.equal((await api("GET", "/cart")).body.items.length, 2);
    assert.deepEqual((await api("GET", "/orders")).body, []);
  });

  await t.test("only your own, non-empty cart can be paid", async () => {
    const owner = await shopper();
    const other = await shopper();
    const product = await stocked(4);
    const cartId = await fill(owner, product, 1);

    assert.equal((await other("POST", "/orders", { cartId })).status, 404);
    assert.equal((await visitor()("POST", "/orders", { cartId })).status, 401);
    await fill(owner, product, 0);
    assert.equal((await owner("POST", "/orders", { cartId })).status, 409);
    assert.equal(await stockOf(product), 4);
  });
});
