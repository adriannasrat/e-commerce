import BagPanel from "./bag/BagPanel";
import ScrollReveal from "./ScrollReveal";
import React, { useState } from "react";
import { Badge, IconButton, useMediaQuery } from "@mui/material";
import MenuGlyph from "./MenuGlyph";
import { navigationLinks } from "./navigationLinks";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PreviewMenu from "./PreviewMenu";
import PreviewActionDialog from "./PreviewActionDialog";

const actions = [
  { id: "search", label: "Search products", Icon: SearchIcon },
  { id: "account", label: "Your account", Icon: PersonOutlineIcon },
  { id: "bag", label: "Shopping bag", Icon: ShoppingBagOutlinedIcon },
];

export default function PreviewHeader({ bag }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [togglePosition, setTogglePosition] = useState(null);
  function openMenu(event) {
    const { top, left, width, height } =
      event.currentTarget.getBoundingClientRect();
    setTogglePosition({ top, left, width, height });
    setMenuOpen(true);
  }
  const compactNavigation = useMediaQuery("(max-width: 900px)");
  const [action, setAction] = useState(null);

  function openAction(id) {
    if (id === "account" || id === "signin") {
      setAction(null);
      window.location.hash = "sign-in";
      return;
    }
    setAction(id);
  }

  return (
    <>
      <ScrollReveal as="header" className="preview-header">
        <a
          className="preview-wordmark"
          href="#preview-home"
          aria-label="Resonance home"
        >
          RESONANCE
        </a>
        {!compactNavigation && (
          <nav
            className="preview-desktop-navigation"
            aria-label="Main navigation"
          >
            {navigationLinks.map(({ title, href }) => (
              <a key={href} href={href}>
                {title}
              </a>
            ))}
          </nav>
        )}
        <div className="preview-header-actions">
          {actions.map(({ id, label, Icon }) => (
            <IconButton
              key={id}
              aria-label={
                id === "bag"
                  ? `Shopping bag, ${bag.count} ${bag.count === 1 ? "item" : "items"}`
                  : label
              }
              aria-haspopup={id === "account" ? undefined : "dialog"}
              aria-expanded={id === "account" ? undefined : action === id}
              onClick={() => openAction(id)}
            >
              {id === "bag" ? (
                <Badge
                  badgeContent={bag.count}
                  max={99}
                  className="preview-bag-badge"
                >
                  <Icon fontSize="small" />
                </Badge>
              ) : (
                <Icon fontSize="small" />
              )}
            </IconButton>
          ))}
          {compactNavigation && (
            <IconButton
              aria-label="Open navigation"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={openMenu}
            >
              <MenuGlyph open={menuOpen} />
            </IconButton>
          )}
        </div>
      </ScrollReveal>
      <PreviewMenu
        togglePosition={togglePosition}
        open={menuOpen && compactNavigation}
        onClose={() => setMenuOpen(false)}
      />
      <BagPanel
        open={action === "bag"}
        onClose={() => setAction(null)}
        bag={bag}
        onProfile={openAction}
      />
      <PreviewActionDialog
        action={action === "bag" ? null : action}
        onClose={() => setAction(null)}
      />
    </>
  );
}
