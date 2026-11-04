import { useEffect, useRef, useState } from "react";

// Derive controls from actual scroll boundaries, including the partially visible last card.
export default function useStoryGallery(reducedMotion) {
  const track = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  function updatePosition() {
    const element = track.current;
    if (!element) return;
    const start = element.scrollLeft <= 2;
    const end =
      element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
    setEdges((previous) =>
      previous.start === start && previous.end === end
        ? previous
        : { start, end },
    );
  }

  useEffect(() => {
    updatePosition();
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(updatePosition);
    observer?.observe(track.current);
    window.addEventListener("resize", updatePosition);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  function move(direction) {
    const element = track.current;
    const first = element.children[0];
    const step = element.children[1].offsetLeft - first.offsetLeft;
    element.scrollBy({
      left: direction * step,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  function onKeyDown(event) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    move(event.key === "ArrowRight" ? 1 : -1);
  }

  return { track, edges, move, updatePosition, onKeyDown };
}
