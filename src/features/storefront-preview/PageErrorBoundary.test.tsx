import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PageErrorBoundary from "./PageErrorBoundary";

function Broken(): never {
  throw new Error("render failed");
}

test("a page that fails shows a way on, and a new address recovers", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const { rerender } = render(
    <PageErrorBoundary resetKey="/order/1">
      <Broken />
    </PageErrorBoundary>,
  );
  expect(screen.getByRole("heading", { name: "Something went wrong." })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Back to the collection" })).toHaveAttribute("href", "/store");

  rerender(
    <PageErrorBoundary resetKey="/store">
      <p>The collection</p>
    </PageErrorBoundary>,
  );
  expect(screen.getByText("The collection")).toBeInTheDocument();
});
