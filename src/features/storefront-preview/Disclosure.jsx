import React, { useId, useState } from "react";
import { styled } from "@mui/material/styles";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Trigger = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  border: 0,
  background: "transparent",
  color: "inherit",
  font: "inherit",
  cursor: "pointer",
  "& > svg": {
    flexShrink: 0,
    transition: "transform 300ms cubic-bezier(.22,.68,.2,1)",
  },
  '&[aria-expanded="true"] > svg': { transform: "rotate(180deg)" },
});

const Panel = styled("div")({
  display: "grid",
  gridTemplateRows: "0fr",
  opacity: 0,
  overflowAnchor: "none",
  transition:
    "grid-template-rows 320ms cubic-bezier(.22,.68,.2,1), opacity 220ms ease",
  '&[data-open="true"]': { gridTemplateRows: "1fr", opacity: 1 },
  "& > div": { minHeight: 0, overflow: "hidden" },
});

export default function Disclosure({
  label,
  children,
  open,
  onChange,
  triggerRef,
  heading: Heading = "div",
  className = "",
}) {
  const id = useId();
  const [localOpen, setLocalOpen] = useState(false);
  const expanded = open ?? localOpen;
  const toggle = onChange ?? setLocalOpen;

  return (
    <div className={`disclosure ${className}`}>
      <Heading className="disclosure-heading">
        <Trigger
          type="button"
          ref={triggerRef}
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => toggle(!expanded)}
        >
          {label}
          <ExpandMore aria-hidden="true" />
        </Trigger>
      </Heading>
      <Panel
        id={id}
        data-open={expanded}
        aria-hidden={!expanded}
        inert={!expanded}
      >
        <div>{children}</div>
      </Panel>
    </div>
  );
}
