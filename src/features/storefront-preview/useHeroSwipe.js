import { useRef } from "react";

// The image remains a normal product link for taps and keyboard activation.
export default function useHeroSwipe(step) {
  const origin = useRef(null);
  const suppressClick = useRef(false);

  function cancel() {
    origin.current = null;
    suppressClick.current = true;
  }

  return {
    onTouchStart({ touches }) {
      if (touches.length !== 1) return cancel();
      origin.current = { x: touches[0].clientX, y: touches[0].clientY };
      suppressClick.current = false;
    },
    onTouchCancel: cancel,
    onTouchEnd({ changedTouches }) {
      const start = origin.current;
      origin.current = null;
      if (!start || !changedTouches.length) return;
      const dx = changedTouches[0].clientX - start.x;
      const dy = changedTouches[0].clientY - start.y;
      suppressClick.current = Math.max(Math.abs(dx), Math.abs(dy)) > 12;
      if (Math.abs(dx) >= 38 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        step(dx < 0 ? 1 : -1);
      }
    },
    onPointerDown(event) {
      if (event.pointerType === "mouse") suppressClick.current = false;
    },
    onClick(event) {
      if (suppressClick.current && event.detail !== 0) event.preventDefault();
      suppressClick.current = false;
    },
    onKeyDown(event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      step(event.key === "ArrowRight" ? 1 : -1);
    },
  };
}
