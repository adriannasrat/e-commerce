import { useState } from "react";
import { sandSetImage } from "../lifestyleImages";
import { productHref } from "../usePreviewRoute";

export default function SandSet() {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <section className="store-set rx-wrap" aria-labelledby="store-set-title">
      <div className="store-set-copy" data-reveal="up">
        <p className="rx-new">New · Form 07</p>
        <h2 className="rx-section-title" id="store-set-title">
          One tone, band to case.
        </h2>
        <p>Warm Sand, from the headband to the case beside it.</p>
        <a className="rx-link" href={productHref("form-07")}>
          Explore Form 07
        </a>
      </div>
      <img
        className="store-set-image"
        data-reveal="zoom"
        src={sandSetImage.src}
        alt={sandSetImage.label}
        width={sandSetImage.width}
        height={sandSetImage.height}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </section>
  );
}
