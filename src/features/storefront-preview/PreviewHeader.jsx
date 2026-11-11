import BagPanel from "./bag/BagPanel";
import { useEffect, useRef, useState } from "react";
import { Badge, IconButton, useMediaQuery } from "@mui/material";
import GraphicEqRounded from "@mui/icons-material/GraphicEqRounded";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import MenuGlyph from "./MenuGlyph";
import { navigationLinks } from "./navigationLinks";
import { getFlyouts } from "./flyouts";
import PreviewMenu from "./PreviewMenu";
import PreviewActionDialog from "./PreviewActionDialog";
import { paths } from "./routes";

const actions = [
  { id: "search", label: "Search products", Icon: SearchIcon },
  { id: "account", label: "Your account", Icon: PersonOutlineIcon },
  { id: "bag", label: "Shopping bag", Icon: ShoppingBagOutlinedIcon },
];

function Flyout({ id, open, onNavigate }) {
  const columns = getFlyouts()[id] || [];
  return (
    <div
      className="rx-flyout"
      id="rx-flyout"
      data-open={open}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="rx-flyout-content rx-wrap" key={id}>
        {columns.map(([heading, links], index) => (
          <div
            key={heading}
            className={index === 0 ? "rx-flyout-primary" : undefined}
            style={{ "--column": index }}
          >
            <h2>{heading}</h2>
            <ul>
              {links.map(([text, href], order) => (
                <li key={text} style={{ "--order": order }}>
                  <a href={href} onClick={onNavigate}>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PreviewHeader({ bag }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [togglePosition, setTogglePosition] = useState(null);
  const [flyout, setFlyout] = useState(null);
  const [lastFlyout, setLastFlyout] = useState("store");
  const timer = useRef(null);
  const compactNavigation = useMediaQuery("(max-width: 833px)");
  const [action, setAction] = useState(null);

  function openMenu(event) {
    const { top, left, width, height } =
      event.currentTarget.getBoundingClientRect();
    setTogglePosition({ top, left, width, height });
    setMenuOpen(true);
  }

  function showFlyout(id, immediate = false) {
    clearTimeout(timer.current);
    if (!getFlyouts()[id]) {
      setFlyout(null);
      return;
    }
    // The first flyout waits briefly so a passing cursor does not trigger it;
    // moving between items once one is open switches instantly.
    const open = () => {
      setFlyout(id);
      setLastFlyout(id);
    };
    if (flyout || immediate) open();
    else timer.current = setTimeout(open, 140);
  }

  function hideFlyout(delay = 120) {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlyout(null), delay);
  }

  useEffect(() => {
    const close = () => setFlyout(null);
    const onKey = (event) => event.key === "Escape" && close();
    window.addEventListener("hashchange", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer.current);
    };
  }, []);

  function openAction(id) {
    setFlyout(null);
    if (id === "account" || id === "signin") {
      setAction(null);
      window.location.hash = paths.signIn;
      return;
    }
    setAction(id);
  }

  return (
    <>
      <header
        className="rx-globalnav"
        data-flyout={flyout ? "open" : undefined}
        onMouseLeave={() => hideFlyout()}
      >
        <nav className="rx-globalnav-bar rx-wrap" aria-label="Main navigation">
          <a
            className="rx-globalnav-logo"
            href={paths.home}
            aria-label="Resonance home"
            onMouseEnter={() => hideFlyout(80)}
          >
            <GraphicEqRounded aria-hidden="true" />
            <span>RESONANCE</span>
          </a>
          {!compactNavigation && (
            <ul className="rx-globalnav-list">
              {navigationLinks.map(({ id, title, href }) => (
                <li key={href} onMouseEnter={() => showFlyout(id)}>
                  <a
                    href={href}
                    aria-current={flyout === id ? "true" : undefined}
                  >
                    {title}
                  </a>
                  {getFlyouts()[id] && (
                    <button
                      type="button"
                      className="rx-globalnav-submenu"
                      aria-label={`${title} menu`}
                      aria-expanded={flyout === id}
                      aria-controls="rx-flyout"
                      onClick={() =>
                        flyout === id ? setFlyout(null) : showFlyout(id, true)
                      }
                    >
                      <ExpandMoreRounded aria-hidden="true" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
          <div
            className="rx-globalnav-actions"
            onMouseEnter={() => hideFlyout(80)}
          >
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
        </nav>
        {!compactNavigation && (
          <Flyout
            id={flyout || lastFlyout}
            open={Boolean(flyout)}
            onNavigate={() => setFlyout(null)}
          />
        )}
      </header>
      <div
        className="rx-globalnav-curtain"
        data-open={Boolean(flyout)}
        aria-hidden="true"
        onMouseEnter={() => hideFlyout(0)}
      />
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
