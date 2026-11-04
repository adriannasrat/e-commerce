import React from "react";
import { act, render, screen } from "@testing-library/react";
import usePreviewRoute from "./usePreviewRoute";

function Route() {
  const { productId } = usePreviewRoute();
  return (
    <output data-testid="route">
      {productId === null ? "home" : productId}
    </output>
  );
}

test("reads direct links and follows hash navigation back to the collection", () => {
  window.history.replaceState(null, "", "#product/in-ear-red");
  render(<Route />);
  expect(screen.getByTestId("route").textContent).toBe("in-ear-red");
  act(() => {
    window.history.replaceState(null, "", "#preview-direction");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  expect(screen.getByTestId("route").textContent).toBe("home");
});
