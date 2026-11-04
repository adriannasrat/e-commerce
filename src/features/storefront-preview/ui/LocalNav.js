import React from "react";

// Sticky product-family bar: title on the left, section links and a Buy
// button on the right. It stays pinned under the global navigation.
export default function LocalNav({ title, href, links = [], buy }) {
  return (
    <nav className="rx-localnav" aria-label={`${title} local navigation`}>
      <div className="rx-wrap rx-localnav-inner">
        <a className="rx-localnav-title" href={href}>
          {title}
        </a>
        <div className="rx-localnav-menu">
          {links.map(([text, target]) => (
            <a key={target} href={target}>
              {text}
            </a>
          ))}
          {buy &&
            (buy.onClick ? (
              <button
                type="button"
                className="rx-btn"
                aria-label={buy.label}
                onClick={buy.onClick}
              >
                {buy.text || "Buy"}
              </button>
            ) : (
              <a className="rx-btn" href={buy.href} aria-label={buy.label}>
                {buy.text || "Buy"}
              </a>
            ))}
        </div>
      </div>
    </nav>
  );
}
