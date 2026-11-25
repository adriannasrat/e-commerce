import { expect, test, type Page } from "@playwright/test";

// The storefront's own navigation, as a visitor uses it. After clicking in the
// menu bar a visitor moves the pointer down to the page, which closes the
// menu's hover panel; staying over the bar would keep it open over the page.
async function useMenuLink(page: Page, name: string) {
  await page.getByRole("link", { name, exact: true }).first().click();
  await page.mouse.move(640, 600);
  await expect(page.locator("header.rx-globalnav")).not.toHaveAttribute("data-flyout", "open");
}
const openBag = (page: Page) => page.getByRole("link", { name: /^Review bag/ }).first().click();
const bagButton = (page: Page) => page.getByRole("button", { name: /^Shopping bag/ });

async function addAtlasToBag(page: Page) {
  await page.goto("/");
  await useMenuLink(page, "Store");
  await expect(page.getByRole("heading", { name: "The collection." })).toBeVisible();
  await page.getByRole("link", { name: "Explore Atlas in Graphite" }).first().click();
  await expect(page.getByRole("heading", { level: 1, name: "Atlas" })).toBeVisible();
  await page.getByRole("button", { name: "Add to bag" }).first().click();
  await openBag(page);
  await expect(page.getByRole("heading", { name: "Your bag total is 1 790 SEK." })).toBeVisible();
}

async function checkOutWithTheDemo(page: Page) {
  await page.getByRole("link", { name: "Check out" }).first().click();
  await expect(page.getByRole("heading", { name: "Sign in for faster checkout." })).toBeVisible();
  await page.getByRole("button", { name: "Continue with the demo" }).click();
  await expect(page.getByRole("heading", { name: "Checkout." })).toBeVisible();
}

test("a visitor browses, fills the bag, checks out with the demo and pays", async ({ page }) => {
  await addAtlasToBag(page);
  await page.getByRole("combobox", { name: "Quantity for Atlas" }).selectOption("2");
  await expect(page.getByRole("heading", { name: "Your bag total is 3 580 SEK." })).toBeVisible();

  await checkOutWithTheDemo(page);
  await page.getByRole("radio", { name: /Express delivery/ }).check();
  await page.getByRole("button", { name: "Continue to payment" }).click();

  // Stripe's page, played by the stand-in, shows what the server ordered.
  await expect(page.getByRole("heading", { name: "Test payment" })).toBeVisible();
  await expect(page.getByText("Atlas × 2")).toBeVisible();
  await expect(page.getByText("Express delivery × 1")).toBeVisible();
  await page.getByRole("button", { name: "Pay" }).click();

  // Only the signed webhook marks the order paid; the page waits for it.
  await expect(page.getByRole("heading", { name: "Your order is placed." })).toBeVisible();
  await expect(page.getByText("3 729 SEK")).toBeVisible();
  await expect(bagButton(page)).toHaveAccessibleName("Shopping bag, 0 items");

  await page.goto("/account");
  const orders = page.getByRole("list", { name: "Your orders, newest first" });
  await expect(orders.getByRole("link")).toHaveCount(1);
  await expect(orders.getByRole("link").first()).toContainText("Paid");
});

test("leaving the payment keeps the bag, and cancelling closes the payment", async ({ page }) => {
  await addAtlasToBag(page);
  await checkOutWithTheDemo(page);
  await page.getByRole("button", { name: "Continue to payment" }).click();
  await expect(page.getByRole("heading", { name: "Test payment" })).toBeVisible();
  await page.getByRole("link", { name: "Back" }).click();

  await expect(page.getByRole("heading", { name: "Complete your payment." })).toBeVisible();
  await page.getByRole("button", { name: "Cancel payment" }).click();
  await expect(page).toHaveURL(/\/bag$/);
  await expect(page.getByRole("heading", { name: "Your bag total is 1 790 SEK." })).toBeVisible();
  await expect(page.getByText("Your payment is waiting.")).toHaveCount(0);
});

test("a visitor signs up, signs out and signs back in", async ({ page }) => {
  const email = `e2e-${Date.now()}@example.test`;
  await page.goto("/sign-up");
  await page.getByRole("textbox", { name: "Email address" }).fill(email);
  await page.getByLabel("Password", { exact: true }).fill("long enough");
  await page.getByLabel("Confirm password").fill("long enough");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.goto("/account");
  await expect(page.getByText(email)).toBeVisible();
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page.getByRole("heading", { name: "Sign in to see your account." })).toBeVisible();

  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill(email);
  await page.getByLabel("Password", { exact: true }).fill("wrong guess");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByText("Invalid email or password")).toBeVisible();

  await page.getByLabel("Password", { exact: true }).fill("long enough");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page).toHaveURL(/\/account$/);
  await expect(page.getByRole("heading", { name: "Your account." })).toBeVisible();
});
