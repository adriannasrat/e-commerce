import StorefrontDialog from "./StorefrontDialog";
import React from "react";
import { IconButton, Fade, useMediaQuery } from "@mui/material";
import MenuGlyph from "./MenuGlyph";
import { navigationLinks } from "./navigationLinks";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export default function PreviewMenu({ open, onClose, togglePosition }) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <StorefrontDialog
      fullScreen
      keepMounted
      open={open}
      onClose={onClose}
      aria-labelledby="preview-menu-title"
      TransitionComponent={Fade}
      transitionDuration={reducedMotion ? 0 : { enter: 420, exit: 420 }}
      PaperProps={{ className: "preview-menu", "data-open": open }}
    >
      <div className="preview-menu-top">
        <IconButton
          className="preview-menu-toggle"
          style={togglePosition}
          aria-label="Close navigation"
          onClick={onClose}
        >
          <MenuGlyph open={open} />
        </IconButton>
      </div>
      <nav aria-label="Main navigation" className="preview-menu-content">
        <h2 id="preview-menu-title">TUNE INTO SOMETHING DIFFERENT</h2>
        {navigationLinks.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="preview-menu-link"
            style={{ "--order": index }}
          >
            <span className="preview-menu-number">0{index + 1}</span>
            <span>
              <strong>{link.title}</strong>
              <small>{link.detail}</small>
            </span>
            <ArrowOutwardIcon aria-hidden="true" />
          </a>
        ))}
      </nav>
      <div className="preview-menu-bottom">
        <span>PERSONAL AUDIO. INDIVIDUAL TASTE.</span>
        <span>DESIGN CONCEPT / 01</span>
      </div>
    </StorefrontDialog>
  );
}
