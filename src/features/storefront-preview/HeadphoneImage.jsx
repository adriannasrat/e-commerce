import React, { useState } from "react";

// Optical size per category: earbuds framed as tightly as headphones read
// far too large next to them, so they get extra breathing room.
const opticalScale = { "in-ear": 1.24 };

// Fit visible products into the same frame without cropping wider cases or
// distorting proportions. The photo fades in once decoded instead of popping.
export default function HeadphoneImage({
  image,
  className,
  decorative = false,
  onError,
}) {
  const [loaded, setLoaded] = useState(false);
  const { src, label, width, height, bounds, category } = image;
  const [left, top, right, bottom] = bounds;
  const scale =
    Math.max((bottom - top) / 2014, (right - left) / 1840) *
    (opticalScale[category] || 1);
  const frameHeight = scale * 2156;
  const frameWidth = (frameHeight * 1984) / 2156;
  const x = (left + right - frameWidth) / 2;
  const y = (top + bottom - frameHeight) / 2;

  return (
    <svg
      className={className}
      viewBox={`${x} ${y} ${frameWidth} ${frameHeight}`}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
      focusable="false"
    >
      <image
        href={src}
        width={width}
        height={height}
        className="rx-photo"
        data-loaded={loaded}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={onError}
      />
    </svg>
  );
}
