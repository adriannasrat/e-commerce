import React from "react";
import HeroProductInfo from "./HeroProductInfo";
import { products } from "./products";
import HeadphonePicker from "./HeadphonePicker";
import ProductVisual from "./ProductVisual";
import HeroCategoryPicker from "./HeroCategoryPicker";
import { headphoneImages } from "./headphoneImages";

export default function PreviewHero({ selected, onSelect }) {
  const product = products.find(({ id }) => id === selected);
  const category = product.image.category;
  const images = headphoneImages.filter((image) => image.category === category);
  const index = images.findIndex((image) => image.id === selected);
  function step(direction) {
    onSelect(images[(index + direction + images.length) % images.length].id);
  }
  const selectCategory = (nextCategory) => {
    if (nextCategory !== category) {
      onSelect(
        headphoneImages.find((image) => image.category === nextCategory).id,
      );
    }
  };

  return (
    <section
      className="preview-hero"
      aria-labelledby="preview-headline"
    >
      <HeroCategoryPicker selected={category} onSelect={selectCategory} />
      <h1 id="preview-headline" className="preview-headline">
        Less noise. More feeling.
      </h1>
      <HeroProductInfo product={product} />
      <ProductVisual selected={selected} onStep={step} />
      <div className="preview-hero-footer">
        <HeadphonePicker
          images={images}
          selected={selected}
          onSelect={onSelect}
        />
        <span className="hero-swipe-tip">
          {index + 1} of {images.length} · Swipe or tap to explore
        </span>
      </div>
    </section>
  );
}
