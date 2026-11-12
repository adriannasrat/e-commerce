import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import StorefrontPreview from "./StorefrontPreview";

vi.mock("./theme", async () => {
  const { createTheme } = await import("@mui/material/styles");
  return {
    default: createTheme({
      components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
    }),
  };
});

test("a recommendation opens its product details at the top", async () => {
  window.history.replaceState({}, "", "/product/black");
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
  render(<StorefrontPreview />);
  const recommendations = screen.getByRole("region", {
    name: "You may also like",
  });
  window.scrollTo.mockClear();
  fireEvent.click(
    within(recommendations).getByRole("link", { name: /Halo/ }),
  );
  expect(
    await screen.findByRole("heading", { level: 1, name: "Halo" }),
  ).toHaveFocus();
  expect(window.location.pathname).toBe("/product/silver");
  expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  expect(
    within(screen.getByRole("group", { name: "Product colours" })).getByRole(
      "button",
      { pressed: true },
    ),
  ).toHaveAccessibleName("Silver");
});
