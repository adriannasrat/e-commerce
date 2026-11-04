import React, { useLayoutEffect, useRef, useState } from "react";
import { Dialog } from "@mui/material";

// Move focus before MUI hides the background, and restore it after the exit.
export default function StorefrontDialog({
  open,
  TransitionProps = {},
  ...props
}) {
  const [visible, setVisible] = useState(false);
  const modal = useRef(null);
  const trigger = useRef(null);

  useLayoutEffect(() => {
    if (open === visible) return;
    const active = document.activeElement;
    if (open) {
      trigger.current = active instanceof HTMLElement ? active : null;
      trigger.current?.blur();
    } else if (modal.current?.contains(active)) {
      active?.blur();
    }
    setVisible(open);
  }, [open, visible]);

  function restoreFocus(...args) {
    // A navigation action or a second dialog may already have placed focus.
    if (document.activeElement === document.body) {
      const previous = trigger.current;
      const available =
        previous?.isConnected &&
        !previous.closest('[aria-hidden="true"], [hidden], [role="dialog"]');
      const target = available ? previous : document.querySelector("main");
      target?.focus({ preventScroll: true });
    }
    TransitionProps.onExited?.(...args);
  }

  return (
    <Dialog
      {...props}
      ref={modal}
      open={visible}
      disableRestoreFocus
      TransitionProps={{ ...TransitionProps, onExited: restoreFocus }}
    />
  );
}
