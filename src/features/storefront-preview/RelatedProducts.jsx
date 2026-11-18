import { useRef, useState } from "react";
import { IconButton, useMediaQuery } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import HeadphoneImage from "./HeadphoneImage";
import { products, formatPrice } from "./products";
import { productHref } from "./usePreviewRoute";

const RelatedCard = ({ item }) => (
  <a href={productHref(item.id)} className="product-related-card">
    <HeadphoneImage image={item.image} decorative />
    <span className="product-related-finish">{item.finishName}</span>
    <h3>{item.name}</h3>
    <p>{formatPrice(item.price)}</p>
  </a>
);

// On a phone the cards sit in one row that is swiped, with the dots following
// along. Larger screens page through three at a time with the arrows.
export default function RelatedProducts({ product }) {
  const [page, setPage] = useState(0);
  const track = useRef(null);
  const mobile = useMediaQuery("(max-width: 833px)", { noSsr: true });
  const count = mobile ? 1 : 3;
  const related = products.filter((item) => item.id !== product.id);
  const pages = Math.ceil(related.length / count);
  const currentPage = Math.min(page, pages - 1);

  const followSwipe = () => {
    const { scrollLeft, scrollWidth, clientWidth } = track.current;
    const step = (scrollWidth - clientWidth) / Math.max(related.length - 1, 1);
    setPage(Math.round(scrollLeft / step));
  };
  const showPage = (index) => {
    if (!mobile) return setPage(index);
    const card = track.current.children[index];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.current.scrollTo({
      left: card.offsetLeft - track.current.offsetLeft,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section className="product-related" aria-labelledby="related-title">
      <h2 id="related-title" data-reveal="up">
        You may also like
      </h2>
      {mobile ? (
        <div
          ref={track}
          className="product-related-track"
          onScroll={followSwipe}
          data-reveal="up"
        >
          {related.map((item) => (
            <RelatedCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="product-related-gallery" data-reveal="up">
          <IconButton
            aria-label="Previous recommendations"
            disabled={currentPage === 0}
            onClick={() => setPage(currentPage - 1)}
          >
            <ChevronLeft />
          </IconButton>
          <div className="product-related-grid" aria-live="polite">
            {related
              .slice(currentPage * count, (currentPage + 1) * count)
              .map((item) => (
                <RelatedCard key={item.id} item={item} />
              ))}
          </div>
          <IconButton
            aria-label="Next recommendations"
            disabled={currentPage === pages - 1}
            onClick={() => setPage(currentPage + 1)}
          >
            <ChevronRight />
          </IconButton>
        </div>
      )}
      <nav
        className="product-related-pagination"
        aria-label="Recommendation pages"
      >
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index}
            aria-label={`Recommendation page ${index + 1}`}
            aria-current={index === currentPage ? "page" : undefined}
            onClick={() => showPage(index)}
          >
            <span />
          </button>
        ))}
      </nav>
    </section>
  );
}
