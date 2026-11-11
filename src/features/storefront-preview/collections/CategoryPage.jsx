import BuyingGuide from "../shopping/BuyingGuide";
import { useLayoutEffect, useRef, useState } from "react";
import ViewColumnOutlined from "@mui/icons-material/ViewColumnOutlined";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import CompareArrowsRounded from "@mui/icons-material/CompareArrowsRounded";
import BookmarkBorderRounded from "@mui/icons-material/BookmarkBorderRounded";
import GraphicEqRounded from "@mui/icons-material/GraphicEqRounded";
import SellOutlined from "@mui/icons-material/SellOutlined";
import HeadphoneImage from "../HeadphoneImage";
import { formatPrice, newModels } from "../products";
import { productHref } from "../usePreviewRoute";
import ChapterNav from "../ui/ChapterNav";
import FeatureCards from "../ui/FeatureCards";
import Film from "../ui/Film";
import { films } from "../ui/films";
import LinkDirectory from "../ui/LinkDirectory";
import LocalNav from "../ui/LocalNav";
import ModelCard from "../ui/ModelCard";
import Shelf from "../ui/Shelf";
import { benefits, featureCards } from "./categoryContent";
import { collectionHref, collectionModels, collections } from "./collections";
import { paths } from "../routes";

const benefitIcons = {
  compare: CompareArrowsRounded,
  save: BookmarkBorderRounded,
  journal: GraphicEqRounded,
  pricing: SellOutlined,
};

function HeroGallery({ models, collection }) {
  return (
    <Shelf
      className="sound-gallery"
      label={`${collection.name} highlights`}
      reveal="zoom"
    >
      {models.map((model, index) => (
        <article
          key={model.id}
          className={`sound-gallery-card sound-gallery-card--${index % 2 ? "light" : "dark"}`}
          aria-labelledby={`gallery-${model.id}`}
        >
          <div className="sound-gallery-copy">
            <div>
              {newModels.includes(model.id) && <p className="rx-new">New</p>}
              <h2 id={`gallery-${model.id}`}>{model.name}</h2>
              <p>{model.tagline}</p>
            </div>
            <div className="sound-gallery-actions">
              <a className="rx-btn rx-btn--small" href={productHref(model.id)}>
                Learn more
              </a>
              <a className="rx-link" href={productHref(model.id)}>
                Buy
              </a>
            </div>
          </div>
          <HeadphoneImage
            className="sound-gallery-art"
            image={model.image}
            decorative
          />
        </article>
      ))}
    </Shelf>
  );
}

function FinishStudio({ models, collection }) {
  const [selected, select] = useState(collection.feature);
  const model = models.find((item) => item.id === selected);
  return (
    <section className="sound-studio rx-wrap">
      <div className="sound-studio-copy" data-reveal="up">
        <p className="rx-eyebrow">The design studio</p>
        <h2 className="rx-section-title">{collection.art}</h2>
        <p aria-live="polite">{model.description}</p>
        <div
          className="sound-switch rx-segmented"
          role="group"
          aria-label="Featured model"
        >
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
      <a
        className="sound-study"
        href={productHref(model.id)}
        key={model.id}
        data-reveal="zoom"
      >
        <HeadphoneImage image={model.image} decorative />
        <span>
          {model.name} · {model.finishName}
        </span>
      </a>
    </section>
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
      <LocalNav
        title={collection.name}
        href={collectionHref(id)}
        links={[
          ["Overview", collectionHref(id)],
          ["Models", collectionHref(id, "models")],
          ["Compare models", collectionHref(id, "compare")],
        ]}
        buy={{
          href: collectionHref(id, "models"),
          label: `Buy ${collection.name} headphones`,
        }}
      />
      <p className="rx-ribbon">
        Every {collection.series.replace(" series", "")} model has its own
        finish.{" "}
        <a className="rx-link" href={collectionHref(id, "compare")}>
          Compare the {collection.series}
        </a>
      </p>
      <header className="sound-intro rx-wrap">
        <h1
          ref={title}
          tabIndex={-1}
          className="rx-page-title"
          data-reveal="up"
        >
          {collection.name}
        </h1>
        <p data-reveal="up">{collection.line}</p>
      </header>
      <ChapterNav
        label={`${collection.name} collection navigation`}
        items={[
          ...models.map((model) => ({
            href: productHref(model.id),
            label: model.name,
            image: model.image,
            isNew: newModels.includes(model.id),
          })),
          {
            href: collectionHref(id, "compare"),
            label: "Compare",
            Icon: ViewColumnOutlined,
          },
          {
            href: collectionHref(id, "models"),
            label: "Shop all",
            Icon: ShoppingBagOutlined,
          },
        ]}
      />
      <HeroGallery models={models} collection={collection} />

      <Film film={films[id]} />

      <section
        className="rx-section rx-section--gray sound-models"
        aria-labelledby="sound-lineup"
      >
        <div className="rx-wrap rx-section-head" data-reveal="up">
          <h2
            className="rx-section-title"
            ref={lineup}
            tabIndex={-1}
            id="sound-lineup"
          >
            See all models.
          </h2>
          <a className="rx-link" href={collectionHref(id, "compare")}>
            Compare all models
          </a>
        </div>
        <Shelf label={`${collection.series} models`}>
          {models.map((model) => (
            <ModelCard key={model.id} product={model} />
          ))}
        </Shelf>
      </section>

      <section className="rx-section sound-benefits" aria-labelledby="sound-benefits">
        <div className="rx-wrap rx-section-head" data-reveal="up">
          <h2 className="rx-section-title" id="sound-benefits">
            Why shop with RESONANCE.
          </h2>
          <a className="rx-link" href={paths.store}>
            Shop the collection
          </a>
        </div>
        <Shelf label="Reasons to shop with RESONANCE">
          {benefits.map(({ id: key, eyebrow, title: heading, text, href, action }) => {
            const Icon = benefitIcons[key];
            return (
              <a key={key} className="rx-card sound-benefit" href={href}>
                <Icon aria-hidden="true" />
                <span className="rx-eyebrow">{eyebrow}</span>
                <strong>{heading}</strong>
                <span>{text}</span>
                <span className="sound-benefit-action">{action}</span>
              </a>
            );
          })}
        </Shelf>
      </section>

      <section className="rx-section rx-section--gray sound-get-to-know">
        <FeatureCards
          title={`Get to know ${collection.name}.`}
          cards={featureCards[id]}
        />
      </section>

      <FinishStudio models={models} collection={collection} />

      <BuyingGuide category={id} />

      <section className="rx-section rx-section--gray sound-compare">
        <div className="rx-wrap">
          <h2
            className="rx-section-title sound-compare-title"
            tabIndex={-1}
            ref={comparison}
            data-reveal="up"
          >
            Find your model.
          </h2>
          <div className="sound-table-wrap" data-reveal="up">
            <table>
              <caption>Compare the {collection.series}</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="preview-sr-only">Model</span>
                  </th>
                  {models.map((model) => (
                    <th scope="col" key={model.id}>
                      <a href={productHref(model.id)}>
                        <HeadphoneImage image={model.image} decorative />
                        {model.name}
                      </a>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Finish", (m) => m.finishName],
                  ["Price", (m) => formatPrice(m.price)],
                  ["In a word", (m) => m.tagline],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {models.map((model) => (
                      <td key={model.id}>{value(model)}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row">
                    <span className="preview-sr-only">Shop</span>
                  </th>
                  {models.map((model) => (
                    <td key={model.id}>
                      <a
                        className="rx-btn rx-btn--small"
                        href={productHref(model.id)}
                        aria-label={`Buy ${model.name}`}
                      >
                        Buy
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="sound-compare-more" data-reveal="fade">
            <a className="rx-link" href={paths.compare}>
              Compare across both series
            </a>
          </p>
        </div>
      </section>

      <LinkDirectory
        title={collection.name}
        motto={collection.line}
        groups={[
          [
            `Explore ${collection.name}`,
            [
              [`Explore all ${collection.name}`, collectionHref(id)],
              ...models.map((model) => [model.name, productHref(model.id)]),
            ],
          ],
          [
            `Shop ${collection.name}`,
            [
              [`Shop ${collection.name}`, collectionHref(id, "models")],
              ["Compare models", collectionHref(id, "compare")],
              ["Your bag", paths.bag],
            ],
          ],
          [
            "More from RESONANCE",
            [
              [`Discover ${other.name}`, collectionHref(otherId)],
              ["Listening journal", paths.journal],
              ["Compare any two", paths.compare],
            ],
          ],
        ]}
      />
    </div>
  );
}
