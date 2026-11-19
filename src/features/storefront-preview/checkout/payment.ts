// Leaves the storefront for Stripe's hosted payment page. A module of its own
// so tests can follow the redirect without leaving the page.
export function goToPayment(url: string) {
  window.location.assign(url);
}

// Stripe's published test card. It works only in test mode.
export const TEST_CARD = "4242 4242 4242 4242";
