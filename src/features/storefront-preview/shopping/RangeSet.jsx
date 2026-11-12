import { useState } from "react";
import { lifestyle } from "../lifestyleImages";
import { paths } from "../routes";

// Both series side by side, as a pause between the shelves and the films.
export default function RangeSet() {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  const photo = lifestyle.collectionPair;
  return (
    <section className="store-set rx-wrap" aria-labelledby="store-set-title">
      <div className="store-set-copy" data-reveal="up">
        <p className="rx-new">The range</p>
        <h2 className="rx-section-title" id="store-set-title">
          Two forms. One quiet idea.
        </h2>
        <p>Five Form models and three Pocket models, made to sit side by side.</p>
        <a className="rx-link" href={paths.compare}>
          Compare the range
        </a>
      </div>
      <img
        className="store-set-image"
        data-reveal="zoom"
        src={photo.src}
        alt={photo.alt}
        width={2752}
        height={1536}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </section>
  );
}
