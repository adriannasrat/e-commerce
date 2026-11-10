import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import ReplayRounded from "@mui/icons-material/ReplayRounded";
import { lifestyle } from "../lifestyleImages";
import Photo from "./Photo";
import { products } from "../products";
import { productHref } from "../usePreviewRoute";

const slideContent = [
  {
    id: "silver",
    eyebrow: "Form 03",
    title: "Quietly bold, from every angle.",
    photo: lifestyle.silverResting,
  },
  {
    id: "pocket-05",
    eyebrow: "Pocket 05",
    title: "Matte, minimal, made to disappear.",
    photo: lifestyle.pocket05Slate,
  },
  {
    id: "in-ear-white",
    eyebrow: "Pocket 02",
    title: "The everyday, made lighter.",
    photo: lifestyle.pocketChalkFloating,
  },
  {
    id: "form-04",
    eyebrow: "Form 04",
    title: "Deep focus, all day long.",
    photo: lifestyle.form04Studio,
    theme: "light",
  },
  {
    id: "silver-evening",
    model: "silver",
    eyebrow: "Form 03",
    title: "After hours, in every colour.",
    photo: lifestyle.silverAfterHours,
  },
];

// Auto-advancing gallery. Each dot fills as a progress bar while its slide is
// shown; playback pauses off-screen, in a hidden tab and for reduced motion.
export default function Highlights() {
  const slides = slideContent.map((slide) => ({
    ...slide,
    product: products.find((product) => product.id === (slide.model || slide.id)),
  }));
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [finished, setFinished] = useState(false);
  const [inView, setInView] = useState(false);
  const section = useRef(null);
  const touch = useRef(null);

  useEffect(() => {
    if (!window.IntersectionObserver) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  // Reduced motion: never start on its own, but still play when asked to.
  useEffect(() => {
    if (reducedMotion) setPlaying(false);
  }, [reducedMotion]);

  const running = playing && inView && !finished;

  function go(next) {
    setFinished(false);
    setIndex((next + slides.length) % slides.length);
  }

  function advance() {
    if (index === slides.length - 1) {
      setFinished(true);
      setPlaying(false);
      return;
    }
    setIndex(index + 1);
  }

  function togglePlayback() {
    if (finished) {
      setFinished(false);
      setIndex(0);
      setPlaying(true);
      return;
    }
    setPlaying(!playing);
  }

  const ControlIcon = finished
    ? ReplayRounded
    : playing
      ? PauseRounded
      : PlayArrowRounded;

  return (
    <section
      ref={section}
      className="rx-highlights rx-section"
      aria-roledescription="carousel"
      aria-labelledby="highlights-title"
    >
      <div className="rx-wrap rx-section-head">
        <h2 className="rx-section-title" id="highlights-title">
          Get the highlights.
        </h2>
        <a className="rx-link" href="#preview-direction">
          Shop the collection
        </a>
      </div>
      <div
        className="rx-highlights-viewport"
        onTouchStart={({ touches }) => {
          touch.current = touches.length === 1 ? touches[0].clientX : null;
        }}
        onTouchEnd={({ changedTouches }) => {
          if (touch.current === null) return;
          const dx = changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          touch.current = null;
        }}
      >
        <ul className="rx-highlights-track" style={{ "--index": index }}>
          {slides.map(({ id, eyebrow, title, photo, product, theme }, position) => {
            const active = position === index;
            return (
              <li
                key={id}
                className={`rx-highlight${theme === "light" ? " rx-highlight--light" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${position + 1} of ${slides.length}: ${eyebrow}`}
                aria-hidden={!active}
                inert={!active}
                data-active={active}
                onClick={() => !active && go(position)}
              >
                <Photo
                  className="rx-highlight-photo"
                  photo={photo}
                  decorative
                />
                <div className="rx-highlight-copy">
                  <p>{eyebrow}</p>
                  <h3>{title}</h3>
                  <a className="rx-link" href={productHref(product.id)}>
                    Learn more about {product.name}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="rx-highlights-controls">
        <div className="rx-highlights-dots">
          {slides.map(({ id, eyebrow }, position) => (
            <button
              key={id}
              type="button"
              aria-label={`Show highlight ${position + 1}: ${eyebrow}`}
              aria-current={position === index ? "true" : undefined}
              data-active={position === index}
              onClick={() => go(position)}
            >
              {position === index && (
                <span
                  key={`${index}-${finished}`}
                  className="rx-highlights-progress"
                  data-running={running}
                  data-complete={finished}
                  onAnimationEnd={advance}
                />
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="rx-highlights-play"
          aria-label={
            finished
              ? "Replay highlights"
              : playing
                ? "Pause highlights"
                : "Play highlights"
          }
          onClick={togglePlayback}
        >
          <ControlIcon />
        </button>
      </div>
    </section>
  );
}
