import BuyingGuide from "../shopping/BuyingGuide";
import React, { useLayoutEffect, useRef, useState } from "react";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import ViewColumnOutlined from "@mui/icons-material/ViewColumnOutlined";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import HeadphoneImage from "../HeadphoneImage";
import ScrollReveal from "../ScrollReveal";
import { formatPrice } from "../products";
import { productHref } from "../usePreviewRoute";
import { collectionHref, collectionModels, collections } from "./collections";

function Lineup({ models, headingRef }) {
  return (
    <section className="sound-section" aria-labelledby="sound-lineup">
      <h2 ref={headingRef} tabIndex={-1} id="sound-lineup">
        Explore the lineup.
      </h2>
      <div className="sound-lineup">
        {models.map((model, index) => (
          <ScrollReveal as="article" key={model.id} delay={index * 65}>
            <a href={productHref(model.id)}>
              <HeadphoneImage image={model.image} decorative />
              <small>{model.finishName}</small>
              <h3>{model.name}</h3>
            </a>
            <p>{model.tagline}</p>
            <strong>{formatPrice(model.price)}</strong>
            <a className="sound-model-link" href={productHref(model.id)}>
              View {model.name}
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function FinishStudio({ models, collection }) {
  const [selected, select] = useState(collection.feature);
  const model = models.find((item) => item.id === selected);
  return (
    <ScrollReveal as="section" className="sound-studio">
      <div>
        <small>THE DESIGN STUDIO</small>
        <h2>{collection.art}</h2>
        <p aria-live="polite">{model.description}</p>
        <div className="sound-switch" role="group" aria-label="Featured model">
          {models.map((item) => (
            <button
              key={item.id}
              aria-pressed={selected === item.id}
              onClick={() => select(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <a className="sound-study" href={productHref(model.id)} key={model.id}>
        <HeadphoneImage image={model.image} decorative />
        <span>
          {model.name} / {model.finishName}
        </span>
      </a>
    </ScrollReveal>
  );
}

export default function CategoryPage({ id, section }) {
  const collection = collections[id];
  const models = collectionModels(id);
  const title = useRef(null);
  const lineup = useRef(null);
  const comparison = useRef(null);
  const otherId = id === "in-ear" ? "over-ear" : "in-ear";
  const other = collections[otherId];
  useLayoutEffect(() => {
    const target =
      section === "models"
        ? lineup.current
        : section === "compare"
          ? comparison.current
          : title.current;
    target.focus({ preventScroll: true });
    if (section) target.scrollIntoView({ block: "start", behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [id, section]);

  return (
    <div className={`sound-category category-${id}`}>
      <header className="sound-intro">
        <small>RESONANCE / {collection.series}</small>
        <h1 ref={title} tabIndex={-1}>
          {collection.name}
        </h1>
        <p>{collection.description}</p>
      </header>
      <nav
        className="sound-rail"
        aria-label={`${collection.name} collection navigation`}
      >
        {models.map((model) => (
          <a href={productHref(model.id)} key={model.id}>
            <HeadphoneImage image={model.image} decorative />
            {model.name}
          </a>
        ))}
        <a href={collectionHref(id, "compare")}>
          <ViewColumnOutlined />
          Compare
        </a>
        <a href={collectionHref(id, "models")}>
          <ShoppingBagOutlined />
          Shop all
        </a>
      </nav>
      {id === "in-ear" && (
        <FinishStudio models={models} collection={collection} />
      )}
      <Lineup models={models} headingRef={lineup} />
      {id === "over-ear" && (
        <FinishStudio models={models} collection={collection} />
      )}
      <BuyingGuide category={id} />
      <section className="sound-section">
        <h2 tabIndex={-1} ref={comparison}>
          Find your model.
        </h2>
        <div className="sound-table-wrap">
          <table>
            <caption>Compare the {collection.series}</caption>
            <thead>
              <tr>
                <th scope="col">Model</th>
                {models.map((model) => (
                  <th scope="col" key={model.id}>
                    <a href={productHref(model.id)}>{model.name}</a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Finish", (m) => m.finishName],
                ["Price", (m) => formatPrice(m.price)],
              ].map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {models.map((model) => (
                    <td key={model.id}>{value(model)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a className="sound-crosslink" href={collectionHref(otherId)}>
          <span>
            <small>ALSO FROM RESONANCE</small>
            <strong>Discover {other.name.toLowerCase()}.</strong>
          </span>
          <ArrowForwardRounded />
        </a>
      </section>
    </div>
  );
}
