import React from "react";
import Disclosure from "./Disclosure";
import ScrollReveal from "./ScrollReveal";

export default function ProductInformation({ product, category }) {
  return (
    <ScrollReveal
      as="section"
      className="product-detail-information"
      aria-label="Product details"
    >
      <Disclosure heading="h2" label="Product Information">
        <div className="product-information-content">
          <h3>Overview</h3>
          <p>
            {product.description} {product.tagline}
          </p>
          <h3>Design details</h3>
          <dl>
            <div>
              <dt>Model</dt>
              <dd>{product.name}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>{category}</dd>
            </div>
            <div>
              <dt>Finish</dt>
              <dd>{product.finishName}</dd>
            </div>
          </dl>
          <p>
            RESONANCE is an independent portfolio concept. Model names and
            prices are illustrative. Technical specifications and included
            accessories have not been defined.
          </p>
        </div>
      </Disclosure>
      <Disclosure heading="h2" label="Compatibility">
        <div className="product-information-content">
          <p>
            Device compatibility, connectivity and system requirements have not
            been specified for this concept collection.
          </p>
        </div>
      </Disclosure>
    </ScrollReveal>
  );
}
