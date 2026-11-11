import { useLayoutEffect, useRef } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HeadphoneImage from '../HeadphoneImage';
import ScrollReveal from '../ScrollReveal';
import { products, formatPrice } from '../products';
import { productHref } from '../usePreviewRoute';
import RecommendationCard from './RecommendationCard';
import { paths } from "../routes";

export default function AddedToBag({ product, bag }) {
  const heading = useRef(null);
  const inBag = bag.items.some(item => item.id === product.id);
  const sections = [
    { title: 'A different way to listen.', description: 'Discover the other side of the collection. A different format for a different moment.',
      items: products.filter(item => item.image.category !== product.image.category) },
    { title: 'Find another expression.', description: 'Explore the other designs in this collection.',
      items: products.filter(item => item.image.category === product.image.category && item.id !== product.id) },
  ];
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    heading.current.focus({ preventScroll: true });
  }, [product.id]);
  return <div className="added-page">
    <div className="added-summary" data-reveal="up">
      <HeadphoneImage image={product.image} decorative />
      <div><h1 ref={heading} tabIndex={-1}>{inBag && <CheckCircleOutlineIcon aria-hidden="true" />}{inBag ? 'Added to your bag.' : 'Explore your selection.'}</h1>
        <a href={productHref(product.id)}>{product.name} — {product.finishName}</a><p>{formatPrice(product.price)} · Demo price</p></div>
      <a href={paths.bag} className="bag-button">Review bag ({bag.count})</a>
    </div>
    {sections.map((section, index) => <section className="recommendation-section" key={section.title} aria-labelledby={`recommendation-heading-${index}`}>
      <ScrollReveal className="recommendation-heading"><h2 id={`recommendation-heading-${index}`}>{section.title}</h2><p>{section.description}</p></ScrollReveal>
      <div className="recommendation-grid">{section.items.map(item => <RecommendationCard key={item.id} product={item} bag={bag} />)}</div>
    </section>)}
    <div className="added-bottom" data-reveal="up"><p>Ready to take a closer look at your choices?</p><a href={paths.bag} className="bag-button">Review bag ({bag.count})</a></div>
  </div>;
}
