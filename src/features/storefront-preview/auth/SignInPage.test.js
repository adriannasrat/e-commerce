import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import StorefrontPreview from "../StorefrontPreview";
import { mockApi } from "../testApi";

jest.mock("../theme", () => {
  const { createTheme } = require("@mui/material/styles");
  return createTheme({
    components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
  });
});

beforeEach(() => {
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  window.history.replaceState({}, "", "/preview");
});

test("a rejected sign-in explains why and clears the password; a valid one signs in", async () => {
  render(<StorefrontPreview />);
  fireEvent.click(screen.getByRole("button", { name: "Your account" }));
  expect(
    await screen.findByRole("heading", { name: "Sign in." }),
  ).toBeInTheDocument();
  expect(window.location.hash).toBe("#sign-in");
  const email = screen.getByRole("textbox", { name: "Email address" });
  const password = screen.getByLabelText("Password");
  fireEvent.change(email, { target: { value: "demo@example.com" } });
  fireEvent.change(password, { target: { value: "demo-password" } });
  fireEvent.click(screen.getByRole("button", { name: "Show password" }));
  expect(password).toHaveAttribute("type", "text");

  mockApi.on("POST /users/signin", 401, { error: "Invalid email or password" });
  fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
  expect(await screen.findByText("Invalid email or password")).toBeInTheDocument();
  expect(password).toHaveValue("");

  mockApi.on("POST /users/signin", 200, (body) => ({ id: 1, email: body.email }));
  fireEvent.change(password, { target: { value: "demo-password" } });
  fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
  await waitFor(() => expect(window.location.hash).toBe("#preview-home"));
});

test("switching to registration preserves the artwork and validates matching passwords", async () => {
  window.history.replaceState({}, "", "/preview#sign-in");
  render(<StorefrontPreview />);
  fireEvent.click(screen.getByRole("button", { name: "Forgot password?" }));
  expect(screen.getByRole("status")).toHaveTextContent(
    "No reset email has been sent",
  );
  const artwork = screen.getByRole("img", { name: "Silver headphones" });
  window.scrollTo.mockClear();
  fireEvent.click(screen.getByRole("link", { name: "Sign up" }));
  expect(
    await screen.findByRole("heading", { name: "Sign up." }),
  ).toHaveFocus();
  expect(screen.getByRole("img", { name: "Silver headphones" })).toBe(artwork);
  expect(window.scrollTo).not.toHaveBeenCalled();
  fireEvent.change(screen.getByRole("textbox", { name: "Email address" }), {
    target: { value: "demo@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "demo-password" },
  });
  const confirmation = screen.getByLabelText("Confirm password");
  fireEvent.change(confirmation, { target: { value: "different-password" } });
  fireEvent.click(screen.getByRole("button", { name: "Create account" }));
  expect(confirmation).toBeInvalid();
  fireEvent.input(confirmation, { target: { value: "demo-password" } });
  mockApi.on("POST /users/signup", 409, { error: "An account with this email already exists" });
  fireEvent.click(screen.getByRole("button", { name: "Create account" }));
  expect(
    await screen.findByText("An account with this email already exists"),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("link", { name: "Sign in" }));
  expect(
    await screen.findByRole("heading", { name: "Sign in." }),
  ).toHaveFocus();
  expect(screen.getByRole("img", { name: "Silver headphones" })).toBe(artwork);
});

test("registration is reachable directly", () => {
  window.history.replaceState({}, "", "/preview#sign-up");
  render(<StorefrontPreview />);
  expect(screen.getByRole("heading", { name: "Sign up." })).toBeInTheDocument();
  expect(document.title).toBe("Sign up — RESONANCE");
});
