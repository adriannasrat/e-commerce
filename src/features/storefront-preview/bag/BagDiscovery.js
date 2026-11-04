import React, { useRef, useState } from "react";
import Disclosure from "../Disclosure";
import HeadphoneImage from "../HeadphoneImage";
import { products, formatPrice } from "../products";
import { productHref } from "../usePreviewRoute";

const questions = [
  [
    "When will my headphones arrive?",
    "The collection is a portfolio project. Delivery and store pickup are unavailable.",
  ],
  [
    "Will my bag be saved?",
    "Your bag is saved in this browser. You can come back on the same device to update it.",
  ],
  [
    "Can I change my selection?",
    "Use the quantity menu beside each model or select Remove to take it out of your bag.",
  ],
  [
    "Which payments do you accept?",
    "Both checkout options demonstrate the shopping flow. No payment details are collected or orders placed.",
  ],
];
const featured = products.find((product) => product.id === "silver");

function Suggestions({ models, onAdd }) {
  return (
    <div className="bag-suggestions">
      {models.map((model) => (
        <article key={model.id}>
          <a href={productHref(model.id)}>
            <HeadphoneImage image={model.image} decorative />
            <span>
              {model.image.category} / {model.finishName}
            </span>
            <h3>{model.name}</h3>
          </a>
          <p>{formatPrice(model.price)}</p>
          <button
            className="bag-button"
            aria-label={`Add ${model.name} to bag`}
            onClick={() => onAdd(model.id)}
          >
            Add to bag
          </button>
        </article>
      ))}
    </div>
  );
}

export default function BagDiscovery({ bag }) {
  const [expanded, setExpanded] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const faqHeading = useRef(null);
  const available = products.filter(
    (model) => !bag.items.some((item) => item.id === model.id),
  );
  function openQuestions() {
    setQuestionsOpen(true);
    faqHeading.current.focus({ preventScroll: true });
    faqHeading.current.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <>
      <aside className="bag-help">
        Need a hand?{" "}
        <button type="button" onClick={openQuestions}>
          Shopping questions
        </button>
      </aside>
      {available.length > 0 && (
        <section
          className="bag-discovery"
          aria-labelledby="bag-discovery-title"
        >
          <h2 id="bag-discovery-title">You may also like</h2>
          <Suggestions models={available.slice(0, 3)} onAdd={bag.add} />
          {available.length > 3 && (
            <Disclosure className="bag-more" label={expanded ? "Show fewer products" : "Show more products"} open={expanded} onChange={setExpanded}>
              <Suggestions models={available.slice(3)} onAdd={bag.add} />
            </Disclosure>
          )}
        </section>
      )}
      <a className="bag-collection-banner" href="#preview-direction">
        <div>
          <small>THE HEADPHONE COLLECTION</small>
          <h2>Find your frequency.</h2>
          <span>Explore the collection</span>
        </div>
        <HeadphoneImage image={featured.image} decorative />
      </a>
      <Disclosure className="bag-faq" heading="h2" label="Shopping questions" open={questionsOpen} onChange={setQuestionsOpen} triggerRef={faqHeading}>
        {questions.map(([question, answer]) => (
          <Disclosure key={question} heading="h3" label={question}><p>{answer}</p></Disclosure>
        ))}
      </Disclosure>
    </>
  );
}
