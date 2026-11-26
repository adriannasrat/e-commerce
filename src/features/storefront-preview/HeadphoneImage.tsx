import {
  type ReactEventHandler,
  type RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { Cutout } from "./catalogueMedia";

// Optical size per category: earbuds framed as tightly as headphones read
// far too large next to them, so they get extra breathing room.
const opticalScale: Record<string, number> = { "in-ear": 1.24 };

// SVG images have no srcset, so the frame measures how wide it draws the photo
// and picks the smallest copy that is still sharp at that size. It only moves
// to larger copies, so making the window smaller never loads another file.
// Until the frame has a size, as while it is hidden, nothing is loaded, and
// like <img loading="lazy"> nothing loads until the frame comes within half a
// screen of view, so pictures far down the page wait until they are needed.
function useSource(
  frame: RefObject<SVGSVGElement | null>,
  image: Cutout,
  frameWidth: number,
) {
  const { src, sources, width } = image;
  const [chosen, setChosen] = useState({ for: src, index: -1 });
  useLayoutEffect(() => {
    const svg = frame.current;
    if (!svg || typeof ResizeObserver === "undefined") return;
    let near = typeof IntersectionObserver === "undefined";
    const pick = () => {
      if (!near) return;
      const drawn = svg.getBoundingClientRect().width;
      if (!drawn) return;
      const needed = ((drawn * width) / frameWidth) * window.devicePixelRatio;
      const found = sources.findIndex((source) => source.width >= needed);
      const index = found === -1 ? sources.length - 1 : found;
      setChosen((current) =>
        current.for === src && current.index >= index
          ? current
          : { for: src, index },
      );
    };
    const sizes = new ResizeObserver(pick);
    sizes.observe(svg);
    const view = near
      ? null
      : new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            near = true;
            view?.disconnect();
            pick();
          },
          // Half a screen ahead in every direction, also along swipeable shelves.
          { rootMargin: "50% 50%" },
        );
    view?.observe(svg);
    return () => {
      sizes.disconnect();
      view?.disconnect();
    };
  }, [frame, src, sources, width, frameWidth]);

  // Without copies, or where nothing can be measured, the original is used.
  if (!sources.length || typeof ResizeObserver === "undefined") return src;
  return chosen.for === src && chosen.index >= 0
    ? sources[chosen.index].src
    : undefined;
}

// Fit visible products into the same frame without cropping wider cases or
// distorting proportions. The photo fades in once decoded instead of popping.
export default function HeadphoneImage({
  image,
  className,
  decorative = false,
  onError,
}: {
  image: Cutout;
  className?: string;
  decorative?: boolean;
  onError?: ReactEventHandler<SVGImageElement>;
}) {
  const [loaded, setLoaded] = useState(false);
  const frame = useRef<SVGSVGElement>(null);
  const { label, width, height, bounds, category } = image;
  const [left, top, right, bottom] = bounds;
  const scale =
    Math.max((bottom - top) / 2014, (right - left) / 1840) *
    (opticalScale[category] || 1);
  const frameHeight = scale * 2156;
  const frameWidth = (frameHeight * 1984) / 2156;
  const x = (left + right - frameWidth) / 2;
  const y = (top + bottom - frameHeight) / 2;
  const src = useSource(frame, image, frameWidth);

  return (
    <svg
      ref={frame}
      className={className}
      viewBox={`${x} ${y} ${frameWidth} ${frameHeight}`}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
      focusable="false"
    >
      {src && (
        <image
          href={src}
          width={width}
          height={height}
          className="rx-photo"
          data-loaded={loaded}
          // SVG images support async decoding, which React's types leave out.
          {...{ decoding: "async" }}
          onLoad={() => setLoaded(true)}
          onError={onError}
        />
      )}
    </svg>
  );
}
