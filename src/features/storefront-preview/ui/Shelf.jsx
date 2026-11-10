import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";

// A horizontally scrolling row of cards. Touch users swipe (with snap
// points); pointer users get paddle buttons that page by the visible width.
export default function Shelf({
  title,
  lead,
  label,
  className = "",
  as: Element = "section",
  reveal = "item",
  children,
  ...props
}) {
  const track = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const name = label || title;
  const titleId = useId();

  const measure = useCallback(() => {
    const node = track.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    const start = node.scrollLeft <= 2;
    const end = node.scrollLeft >= max - 2;
    // Scroll fires every frame; only re-render when an edge actually flips.
    setEdges((previous) =>
      previous.start === start && previous.end === end
        ? previous
        : { start, end },
    );
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  function page(direction) {
    const node = track.current;
    node.scrollBy({
      left: direction * node.clientWidth * 0.8,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <Element
      className={`rx-shelf ${className}`}
      aria-label={title ? undefined : name}
      aria-labelledby={title ? titleId : undefined}
      data-reveal-group={reveal ? "" : undefined}
      {...props}
    >
      {title && (
        <h2 className="rx-shelf-title" id={titleId} data-reveal="up">
          <strong>{title}</strong> {lead}
        </h2>
      )}
      <ul className="rx-shelf-track" ref={track} onScroll={measure}>
        {React.Children.map(children, (child) =>
          child ? (
            <li className="rx-shelf-item" data-reveal={reveal || undefined}>
              {child}
            </li>
          ) : null,
        )}
      </ul>
      {!(edges.start && edges.end) && (
        <div className="rx-paddles" data-reveal={reveal ? "fade" : undefined}>
          <button
            type="button"
            className="rx-paddle"
            aria-label={`Previous – ${name}`}
            disabled={edges.start}
            onClick={() => page(-1)}
          >
            <ChevronLeftRounded />
          </button>
          <button
            type="button"
            className="rx-paddle"
            aria-label={`Next – ${name}`}
            disabled={edges.end}
            onClick={() => page(1)}
          >
            <ChevronRightRounded />
          </button>
        </div>
      )}
    </Element>
  );
}
