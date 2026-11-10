import React, { useLayoutEffect, useRef, useState } from "react";

// A lifestyle photograph that fills its box, cropped around its focal point.
// It loads lazily and fades in once decoded, like the product cut-outs.
export default function Photo({ photo, className = "", decorative = false, eager = false }) {
  const image = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    // Cached photos can finish before React attaches the load listener.
    if (image.current?.complete && image.current.naturalWidth) setLoaded(true);
  }, [photo.src]);

  return (
    <img
      ref={image}
      className={`rx-photo rx-photo-fill ${className}`}
      src={photo.src}
      alt={decorative ? "" : photo.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable="false"
      data-loaded={loaded}
      style={{ objectPosition: photo.focus }}
      onLoad={() => setLoaded(true)}
    />
  );
}
