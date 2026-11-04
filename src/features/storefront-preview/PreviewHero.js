import ScrollReveal from "./ScrollReveal";
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
    <ScrollReveal
      as="section"
      className="preview-hero"
      aria-labelledby="preview-headline"
    >
      <div className="preview-hero-topline">
        <span>PERSONAL AUDIO / A NEW PERSPECTIVE</span>
        <span>
          {index + 1} / {images.length}
        </span>
      </div>
      <HeroCategoryPicker selected={category} onSelect={selectCategory} />
      <h1 id="preview-headline" className="preview-headline">
        <span>Less noise</span>
        <span>More feeling</span>
      </h1>
      <ProductVisual selected={selected} onStep={step} />
      <span className="hero-swipe-tip">Swipe to explore · Tap for details</span>
      <HeadphonePicker
        images={images}
        selected={selected}
        onSelect={onSelect}
      />
      <HeroProductInfo product={product} />
    </ScrollReveal>
  );
}
