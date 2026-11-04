import React, { useState } from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StorefrontDialog from "./StorefrontDialog";

function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open dialog</button>
      <StorefrontDialog
        open={open}
        onClose={() => setOpen(false)}
        transitionDuration={0}
        aria-labelledby="test-dialog-title"
      >
        <h2 id="test-dialog-title">Details</h2>
        <button autoFocus onClick={() => setOpen(false)}>
          Close dialog
        </button>
      </StorefrontDialog>
    </>
  );
}

test("moves focus into the dialog and restores the trigger after closing", async () => {
  render(<Harness />);
  const trigger = screen.getByRole("button", { name: "Open dialog" });
  userEvent.click(trigger);
  expect(screen.getByRole("button", { name: "Close dialog" })).toHaveFocus();
  fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("Escape closes the dialog and returns keyboard focus", async () => {
  render(<Harness />);
  const trigger = screen.getByRole("button", { name: "Open dialog" });
  userEvent.click(trigger);
  fireEvent.keyDown(screen.getByRole("button", { name: "Close dialog" }), {
    key: "Escape",
    code: "Escape",
  });
  await waitFor(() => expect(trigger).toHaveFocus());
});
