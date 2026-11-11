import JournalFeature from "./shopping/JournalFeature";
import Highlights from "./ui/Highlights";
import CategoryPage from "./collections/CategoryPage";
import Campaign from "./collections/Campaign";
import { collections } from "./collections/collections";
import StorefrontStyles from "./StorefrontStyles";
import StorefrontFooter from "./footer/StorefrontFooter";
import { useEffect, useLayoutEffect, useRef } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
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
import CatalogueGate from "./CatalogueGate";
import { paths } from "./routes";

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

// Plain links stay plain <a href> elements. One handler at the root turns
// clicks on same-site links into client-side navigation, including links in
// dialogs and menus, and leaves new-tab clicks and in-page anchors alone.
function useLinkNavigation() {
  const navigate = useNavigate();
  return (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link = event.target.closest?.("a[href]");
    if (!link || (link.target && link.target !== "_self")) return;
    if (link.hasAttribute("download")) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.hash) return;
    event.preventDefault();
    navigate(url.pathname + url.search + url.hash);
  };
}

function Storefront() {
  const route = usePreviewRoute();
  const { pathname } = route;
  const navigate = useNavigate();
  const followLink = useLinkNavigation();
  const bag = usePreviewBag();
  const main = useRef(null);
  useReveal(main, pathname);
  const productId = route.name === "product" ? route.id : null;
  const addedId = route.name === "added" ? route.id : null;
  const category =
    route.name === "collection"
      ? { id: route.id, section: route.section }
      : null;
  const categoryId = category?.id;
  const isCatalog = route.name === "store" || route.name === "compare";
  const isCompare = route.name === "compare";
  const isJournal = route.name === "journal";
  const isBag = route.name === "bag";
  const isSignUp = route.name === "signUp";
  const isSignIn = route.name === "signIn" || isSignUp;
  const isNotFound = route.name === "notFound";
  function addToBag(id) {
    bag.add(id);
    navigate(paths.added(id));
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
    (isNotFound && "Page not found") ||
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
    if (isCompare) {
      const heading = document.getElementById("compare-all-title");
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ block: "start", behavior: "instant" });
      return;
    }
    if (isCatalog || isJournal || isNotFound) {
      document.querySelector("main h1")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    document
      .getElementById("preview-home")
      ?.scrollIntoView({ behavior: "instant" });
  }, [
    pathname,
    productId,
    isBag,
    addedId,
    isSignIn,
    categoryId,
    isCompare,
    isCatalog,
    isJournal,
    isNotFound,
  ]);

  return (
    <ThemeProvider theme={theme}>
      <StorefrontStyles />
      <ScopedCssBaseline
        className="storefront-preview"
        id="preview-home"
        onClick={followLink}
      >
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
            {bag.error && (
              <p className="bag-error" role="alert">
                {bag.error}
              </p>
            )}
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
                  href={paths.store}
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
                  href={paths.bag}
                  action="Review bag"
                />
              ))}
            {isCatalog && <HeadphoneCollection onAddToBag={addToBag} />}
            {isJournal && <ListeningStories />}
            {isNotFound && (
              <NotFound
                title="Page not found."
                detail="This address does not lead anywhere. The collection is still here."
                href={paths.store}
                action="Back to the collection"
              />
            )}
            <div className="rx-home" hidden={route.name !== "home"}>
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
    <BrowserRouter>
      <CatalogueGate>
        <AuthProvider>
          <Storefront />
        </AuthProvider>
      </CatalogueGate>
    </BrowserRouter>
  );
}
