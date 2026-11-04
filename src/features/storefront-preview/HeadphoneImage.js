import React from "react";

// Fit visible products into the same frame without cropping wider cases or distorting proportions.
export default function HeadphoneImage({
  image,
  className,
  decorative = false,
  onError,
}) {
  const { src, label, width, height, bounds } = image;
  const [left, top, right, bottom] = bounds;
  const scale = Math.max((bottom - top) / 2014, (right - left) / 1840);
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
      <image href={src} width={width} height={height} onError={onError} />
    </svg>
  );
}
