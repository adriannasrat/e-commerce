import { useEffect, useState } from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

// One look for waiting, wherever it happens: a thin bar along the top of the
// page while anything loads, and a spinner inside the button that started an
// action. Both are decorative; the page's own text says what is going on.

export function Spinner() {
  return <span className="rx-spinner" aria-hidden="true" />;
}

// Appears only once a wait lasts long enough to notice, so quick loads never
// flash it, and fades out as soon as everything has arrived.
export function LoadingBar() {
  const busy = useIsFetching() + useIsMutating() > 0;
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!busy) {
      setShown(false);
      return;
    }
    const timer = setTimeout(() => setShown(true), 150);
    return () => clearTimeout(timer);
  }, [busy]);
  return <div className="rx-loading-bar" data-shown={shown} aria-hidden="true" />;
}
