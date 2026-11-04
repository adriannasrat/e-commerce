import React, { useState } from "react";
import { IconButton, useMediaQuery } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import HeadphoneImage from "./HeadphoneImage";
import ScrollReveal from "./ScrollReveal";
import { products, formatPrice } from "./products";
import { productHref } from "./usePreviewRoute";

export default function RelatedProducts({ product }) {
  const [page, setPage] = useState(0);
  const mobile = useMediaQuery("(max-width: 700px)");
  const count = mobile ? 1 : 3;
  const related = products.filter((item) => item.id !== product.id);
  const pages = Math.ceil(related.length / count);
  const currentPage = Math.min(page, pages - 1);
  return (
    <ScrollReveal
      as="section"
      className="product-related"
      aria-labelledby="related-title"
    >
      <h2 id="related-title">You may also like</h2>
      <div className="product-related-gallery">
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
              <a
                key={item.id}
                href={productHref(item.id)}
                className="product-related-card"
              >
                <HeadphoneImage image={item.image} decorative />
                <span className="product-related-finish">
                  {item.finishName}
                </span>
                <h3>{item.name}</h3>
                <p>{formatPrice(item.price)}</p>
              </a>
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
      <nav
        className="product-related-pagination"
        aria-label="Recommendation pages"
      >
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index}
            aria-label={`Recommendation page ${index + 1}`}
            aria-current={index === currentPage ? "page" : undefined}
            onClick={() => setPage(index)}
          >
            <span />
          </button>
        ))}
      </nav>
    </ScrollReveal>
  );
}
