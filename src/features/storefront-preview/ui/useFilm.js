import { useEffect, useRef, useState } from "react";

// Playback shared by every film: it runs only while on screen, nothing starts
// by itself under reduced motion, and a visitor's pause stays a pause when the
// film scrolls back into view. A film that has finished stays on its last
// frame until the visitor asks to see it again.
export default function useFilm() {
  const video = useRef(null);
  const held = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element || !window.IntersectionObserver) return undefined;
    held.current = Boolean(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    );
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) element.pause();
        else if (!held.current && !element.ended) element.play()?.catch(() => {});
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [failed]);

  function toggle() {
    const element = video.current;
    held.current = !element.paused;
    if (element.paused) element.play()?.catch(() => {});
    else element.pause();
  }

  return {
    failed,
    ended,
    playing,
    toggle,
    videoProps: {
      ref: video,
      muted: true,
      playsInline: true,
      onPlay: () => {
        setEnded(false);
        setPlaying(true);
      },
      onPause: () => setPlaying(false),
      onEnded: () => setEnded(true),
      onError: () => setFailed(true),
    },
  };
}
