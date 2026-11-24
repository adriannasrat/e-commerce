const test = require("node:test");
const assert = require("node:assert/strict");
const { fakeStripe, startApi } = require("./helper");

test("demo accounts and the nightly reset", async (t) => {
  process.env.CRON_SECRET = "test-cron-secret";
  t.after(() => delete process.env.CRON_SECRET);
  const visitor = await startApi(t);
  const { Product, User } = require("../../models");
  const { DEMO_STOCK } = require("../../services/demoService");

  await t.test(
    "each visitor gets a signed-in account of their own",
    async () => {
      const first = visitor();
      const second = visitor();
      const { status, body: account } = await first("POST", "/demo/sign-in");
      assert.equal(status, 201);
      assert.match(account.email, /^demo-[a-f0-9]{12}@resonance\.test$/);
      assert.deepEqual((await first("GET", "/users/me")).body, account);
      const { body: other } = await second("POST", "/demo/sign-in");
      assert.notEqual(other.id, account.id);
    },
  );

  await t.test(
    "signing out of the demo closes its payments and removes the account",
    async () => {
      const shopper = visitor();
      const { body: account } = await shopper("POST", "/demo/sign-in");
      const product = await Product.create({
        title: "Demo model", description: "d", price_ore: 100000, imageUrl: "x", stock_quantity: 4,
      });
      const { body: cart } = await shopper("PUT", `/cart/items/${product.id}`, { amount: 2 });
      const { body: order } = await shopper("POST", "/orders", { cartId: cart.id });
      assert.equal((await Product.findByPk(product.id)).stock_quantity, 2);

      assert.equal((await shopper("POST", "/users/signout")).status, 204);
      assert.equal(fakeStripe.sessions.get(`cs_test_${order.id}`).open, false);
      assert.equal((await Product.findByPk(product.id)).stock_quantity, 4);
      assert.equal(await User.findByPk(account.id), null);
      assert.equal((await shopper("GET", "/users/me")).status, 401);
    },
  );

  await t.test(
    "signing out of a real account keeps it",
    async () => {
      const member = visitor();
      const { body: account } = await member("POST", "/users/signup", {
        email: "member@example.test",
        password: "long enough",
      });
      await member("POST", "/users/signout");
      assert.ok(await User.findByPk(account.id));
    },
  );

  await t.test(
    "only the scheduled call with the secret may reset",
    async () => {
      const api = visitor();
      assert.equal((await api("GET", "/demo/reset")).status, 401);
      const reset = (authorization) =>
        api("GET", "/demo/reset", undefined, { authorization });
      assert.equal((await reset("Bearer wrong")).status, 401);
      assert.equal((await reset("test-cron-secret")).status, 401);
    },
  );

  await t.test(
    "the reset removes everything visitors made and refills the stock",
    async () => {
      const shopper = visitor();
      await shopper("POST", "/demo/sign-in");
      const signedUp = visitor();
      await signedUp("POST", "/users/signup", {
        email: "visitor@example.test",
        password: "long enough",
      });
      const [product] = await Product.findAll({ where: { slug: "black" } });
      const { body: cart } = await shopper("PUT", `/cart/items/${product.id}`, {
        amount: 2,
      });
      assert.equal(
        (await shopper("POST", "/orders", { cartId: cart.id })).status,
        201,
      );
      assert.equal(
        (await Product.findByPk(product.id)).stock_quantity,
        DEMO_STOCK - 2,
      );

      const reset = await visitor()("GET", "/demo/reset", undefined, {
        authorization: "Bearer test-cron-secret",
      });
      assert.equal(reset.status, 204);
      assert.equal(await User.count(), 0);
      assert.equal(
        (await Product.findByPk(product.id)).stock_quantity,
        DEMO_STOCK,
      );
      assert.equal((await shopper("GET", "/users/me")).status, 401);
      assert.equal((await signedUp("GET", "/users/me")).status, 401);
    },
  );
});
