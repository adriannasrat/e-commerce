const test = require("node:test");
const assert = require("node:assert/strict");
const { startApi } = require("./helper");

test("repeated sign-in attempts", async (t) => {
  const visitor = await startApi(t);
  const { SignInFailure } = require("../../models");
  const { PER_ACCOUNT, PER_ADDRESS } = require("../../services/signInLimit");
  let accounts = 0;
  const account = async () => {
    accounts += 1;
    const credentials = { email: `guess${accounts}@example.test`, password: "long enough" };
    await visitor()("POST", "/users/signup", credentials);
    return credentials;
  };
  // Each network address is its own visitor, as Vercel's edge reports it.
  const from = (address) => {
    const api = visitor();
    return (credentials) => api("POST", "/users/signin", credentials, { "x-forwarded-for": address });
  };

  await t.test("a few wrong passwords, then a wait that says how long", async () => {
    const credentials = await account();
    const signIn = from("203.0.113.1");
    for (let attempt = 0; attempt < PER_ACCOUNT; attempt += 1) {
      assert.equal((await signIn({ ...credentials, password: "wrong guess" })).status, 401);
    }
    const blocked = await signIn(credentials);
    assert.equal(blocked.status, 429);
    assert.equal(blocked.body.error, "Too many sign-in attempts. Try again in 15 minutes.");
    assert.ok(Number(blocked.headers.get("retry-after")) > 14 * 60);

    // Nobody can lock the owner out by guessing from somewhere else.
    assert.equal((await from("203.0.113.2")(credentials)).status, 200);
  });

  await t.test("signing in clears the count", async () => {
    const credentials = await account();
    const signIn = from("203.0.113.3");
    for (let attempt = 0; attempt < PER_ACCOUNT - 1; attempt += 1) {
      await signIn({ ...credentials, password: "wrong guess" });
    }
    assert.equal((await signIn(credentials)).status, 200);
    for (let attempt = 0; attempt < PER_ACCOUNT - 1; attempt += 1) {
      assert.equal((await signIn({ ...credentials, password: "wrong guess" })).status, 401);
    }
  });

  await t.test("one address trying many accounts is slowed too", async () => {
    const signIn = from("203.0.113.4");
    for (let attempt = 0; attempt < PER_ADDRESS; attempt += 1) {
      const response = await signIn({ email: `nobody${attempt}@example.test`, password: "wrong guess" });
      assert.equal(response.status, 401);
    }
    assert.equal((await signIn(await account())).status, 429);
  });

  await t.test("failures older than the window no longer count", async () => {
    const credentials = await account();
    const signIn = from("203.0.113.5");
    for (let attempt = 0; attempt < PER_ACCOUNT; attempt += 1) {
      await signIn({ ...credentials, password: "wrong guess" });
    }
    await SignInFailure.update(
      { createdAt: new Date(Date.now() - 16 * 60 * 1000) },
      { where: {} },
    );
    assert.equal((await signIn(credentials)).status, 200);
  });
});
