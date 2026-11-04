import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import StorefrontPreview from "./StorefrontPreview";

jest.mock("./theme", () => {
  const { createTheme } = require("@mui/material/styles");
  return createTheme({
    components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
  });
});

test("a recommendation opens its product details at the top", async () => {
  window.history.replaceState({}, "", "/#product/black");
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  render(<StorefrontPreview />);
  const recommendations = screen.getByRole("region", {
    name: "You may also like",
  });
  window.scrollTo.mockClear();
  fireEvent.click(
    within(recommendations).getByRole("link", { name: /Form 02/ }),
  );
  expect(
    await screen.findByRole("heading", { level: 1, name: "Form 02" }),
  ).toHaveFocus();
  expect(window.location.hash).toBe("#product/white");
  expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  expect(
    within(screen.getByRole("group", { name: "Product colours" })).getByRole(
      "button",
      { pressed: true },
    ),
  ).toHaveAccessibleName("Chalk");
});
