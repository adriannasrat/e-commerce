import { arrival, orderNumber, orderStages } from "./orderDetails";

test("order numbers are padded and prefixed", () => {
  expect(orderNumber(42)).toBe("RS-000042");
});

test("arrival counts working days only", () => {
  // Wednesday 18 November 2026.
  const placed = new Date(2026, 10, 18, 12);
  expect(arrival(placed, "express")).toBe("19 November");
  expect(arrival(placed, "standard")).toBe("20–24 November");
  // Thursday 26 November: the weekend is skipped and the range crosses a month.
  expect(arrival(new Date(2026, 10, 26, 12), "standard")).toBe("30 November – 2 December");
});

test("a paid order has passed placed and paid", () => {
  expect(orderStages("paid").map(({ done }) => done)).toEqual([true, true, false, false]);
  expect(orderStages("pending").map(({ done }) => done)).toEqual([true, false, false, false]);
});
