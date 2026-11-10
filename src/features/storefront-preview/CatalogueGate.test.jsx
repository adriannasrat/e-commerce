import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import CatalogueGate from "./CatalogueGate";
import { products, setCatalogue } from "./products";
import { mockApi } from "./testApi";
import { testCatalogue } from "./testCatalogue";

const shop = <p>The shop</p>;

beforeEach(() => setCatalogue([]));
afterEach(() => setCatalogue(testCatalogue));

test("shows loading, then the shop with the API's data", async () => {
  mockApi.on("GET /products", 200, [{ ...testCatalogue[0], price_ore: 150050 }]);
  render(<CatalogueGate>{shop}</CatalogueGate>);
  expect(screen.getByRole("status")).toHaveTextContent("Loading the collection");
  expect(await screen.findByText("The shop")).toBeInTheDocument();
  expect(products[0]).toMatchObject({ id: "black", name: "Form 01", price: 1500.5 });
});

test("an empty catalogue says so instead of showing an empty shop", async () => {
  mockApi.on("GET /products", 200, []);
  render(<CatalogueGate>{shop}</CatalogueGate>);
  expect(await screen.findByText(/The collection is empty/)).toBeInTheDocument();
  expect(screen.queryByText("The shop")).toBeNull();
});

test("a failure can be retried", async () => {
  mockApi.on("GET /products", 500, { error: "Something went wrong" });
  render(<CatalogueGate>{shop}</CatalogueGate>);
  const retry = await screen.findByRole("button", { name: "Try again" });
  mockApi.on("GET /products", 200, testCatalogue);
  fireEvent.click(retry);
  expect(await screen.findByText("The shop")).toBeInTheDocument();
});
