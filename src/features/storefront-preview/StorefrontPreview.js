import JournalFeature from "./shopping/JournalFeature";
import Highlights from "./ui/Highlights";
import CategoryPage from "./collections/CategoryPage";
import Campaign from "./collections/Campaign";
import { collections, collectionRoute } from "./collections/collections";
import StorefrontStyles from "./StorefrontStyles";
import StorefrontFooter from "./footer/StorefrontFooter";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import useReveal from "./ui/useReveal";
import { ScopedCssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import PreviewHeader from "./PreviewHeader";
import PreviewHero from "./PreviewHero";
import HeadphoneCollection from "./HeadphoneCollection";
import theme from "./theme";
import ListeningStories from "./ListeningStories";
import ProductDetail from "./ProductDetail";
import ProductShowcase from "./ProductShowcase";
import { products } from "./products";
import usePreviewRoute from "./usePreviewRoute";
import usePreviewBag from "./bag/usePreviewBag";
import BagPage from "./bag/BagPage";
import AddedToBag from "./recommendations/AddedToBag";
import SignInPage from "./auth/SignInPage";
import { AuthProvider } from "./auth/AuthContext";

function NotFound({ title, detail, href, action }) {
  return (
    <section className="bag-page" aria-labelledby="not-found-title">
      <header className="bag-page-heading">
        <h1 id="not-found-title">{title}</h1>
        <p>{detail}</p>
        <a className="bag-button" href={href}>
          {action}
        </a>
      </header>
    </section>
  );
}

function Storefront() {
  const { hash, productId, addedId } = usePreviewRoute();
  const bag = usePreviewBag();
  const main = useRef(null);
  useReveal(main, hash);
  const category = collectionRoute(hash);
  const categoryId = category?.id;
  const isCatalog = [
    "#preview-direction",
    "#preview-over-ear",
    "#preview-in-ear",
    "#compare-headphones",
  ].includes(hash);
  const isJournal = hash === "#preview-stories";
  const isBag = hash === "#bag";
  const isSignUp = hash === "#sign-up";
  const isSignIn = hash === "#sign-in" || isSignUp;
  function addToBag(id) {
    bag.add(id);
    window.location.hash = `added/${encodeURIComponent(id)}`;
  }
  const addedProduct = products.find((item) => item.id === addedId);
  const product = products.find((item) => item.id === productId);
  const pageName =
    product?.name ||
    (categoryId && collections[categoryId].name) ||
    (addedId !== null && "Your selection") ||
    (isBag && "Your bag") ||
    (isSignIn && (isSignUp ? "Sign up" : "Sign in")) ||
    (isCatalog && "The collection") ||
    (isJournal && "Listening journal") ||
    "Home";
  useEffect(() => {
    const previousTitle = document.title;
    document.title =
      pageName === "Home" ? "RESONANCE" : `${pageName} — RESONANCE`;
    return () => {
      document.title = previousTitle;
    };
  }, [pageName]);
  useLayoutEffect(() => {
    if (
      productId !== null ||
      isBag ||
      isSignIn ||
      addedId !== null ||
      categoryId
    )
      return;
    if (isCatalog || isJournal) {
      if (hash === "#compare-headphones") {
        const heading = document.getElementById("compare-all-title");
        heading?.focus({ preventScroll: true });
        heading?.scrollIntoView({ block: "start", behavior: "instant" });
        return;
      }
      document.querySelector("main h1")?.focus({ preventScroll: true });
      if (hash === "#preview-direction" || isJournal) {
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
    }
    document
      .getElementById(hash.slice(1) || "preview-home")
      ?.scrollIntoView({ behavior: "instant" });
  }, [
    hash,
    productId,
    isBag,
    addedId,
    isSignIn,
    categoryId,
    isCatalog,
    isJournal,
  ]);

  return (
    <ThemeProvider theme={theme}>
      <StorefrontStyles />
      <ScopedCssBaseline className="storefront-preview" id="preview-home">
        <a
          className="preview-skip"
          href="#preview-main"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("preview-main")?.focus();
          }}
        >
          Skip to content
        </a>
        <div className="preview-shell">
          <PreviewHeader bag={bag} />
          <main id="preview-main" tabIndex={-1} ref={main}>
            {productId !== null ? (
              product ? (
                <ProductDetail
                  key={product.id}
                  product={product}
                  onAddToBag={addToBag}
                />
              ) : (
                <NotFound
                  title="Product not found."
                  detail="This model may have moved. The rest of the collection is still here."
                  href="#preview-direction"
                  action="Back to the collection"
                />
              )
            ) : null}
            {category && <CategoryPage key={category.id} {...category} />}
            {isBag && <BagPage bag={bag} />}
            {isSignIn && <SignInPage mode={isSignUp ? "sign-up" : "sign-in"} />}
            {addedId !== null &&
              (addedProduct ? (
                <AddedToBag product={addedProduct} bag={bag} />
              ) : (
                <NotFound
                  title="Selection not found."
                  detail="Everything you added is still waiting in your bag."
                  href="#bag"
                  action="Review bag"
                />
              ))}
            {isCatalog && <HeadphoneCollection onAddToBag={addToBag} />}
            {isJournal && <ListeningStories />}
            <div
              className="rx-home"
              hidden={
                isCatalog ||
                isJournal ||
                Boolean(categoryId) ||
                productId !== null ||
                isBag ||
                isSignIn ||
                addedId !== null
              }
            >
              <PreviewHero />
              <Campaign category="over-ear" />
              <Campaign category="in-ear" />
              <ProductShowcase />
              <Highlights />
              <JournalFeature />
            </div>
          </main>
          <StorefrontFooter currentPage={pageName} />
        </div>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}

export default function StorefrontPreview() {
  return (
    <AuthProvider>
      <Storefront />
    </AuthProvider>
  );
}
