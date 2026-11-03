import StorefrontStyles from './StorefrontStyles';
import ScrollReveal from './ScrollReveal';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScopedCssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import PreviewHeader from './PreviewHeader';
import PreviewHero from './PreviewHero';
import HeadphoneCollection from './HeadphoneCollection';
import theme from './theme';
import ListeningStories from './ListeningStories';
import ProductDetail from './ProductDetail';
import ProductShowcase from './ProductShowcase';
import { products } from './products';
import usePreviewRoute from './usePreviewRoute';
import usePreviewBag from './bag/usePreviewBag';
import BagPage from './bag/BagPage';
import AddedToBag from './recommendations/AddedToBag';
import SignInPage from './auth/SignInPage';

export default function StorefrontPreview() {
  const [selected, setSelected] = useState('black');
  const { hash, productId, addedId } = usePreviewRoute();
  const bag = usePreviewBag();
  const isBag = hash === '#bag';
  const isSignUp = hash === '#sign-up';
  const isSignIn = hash === '#sign-in' || isSignUp;
  function addToBag(id) {
    bag.add(id);
    window.location.hash = `added/${encodeURIComponent(id)}`;
  }
  const addedProduct = products.find(item => item.id === addedId);
  const product = products.find(item => item.id === productId);
  useEffect(() => {
    const previousTitle = document.title;
    document.title = isSignIn ? `${isSignUp ? 'Sign up' : 'Sign in'} — RESONANCE` : product ? `${product.name} — RESONANCE` : addedProduct ? 'Your selection — RESONANCE' : isBag ? 'Your bag — RESONANCE' : 'RESONANCE';
    return () => { document.title = previousTitle; };
  }, [product, isBag, addedProduct, isSignIn, isSignUp]);
  useLayoutEffect(() => {
    if (productId !== null || isBag || isSignIn || addedId !== null) return;
    document.getElementById(hash.slice(1) || 'preview-home')?.scrollIntoView({ behavior: 'instant' });
  }, [hash, productId, isBag, addedId, isSignIn]);

  return (
    <ThemeProvider theme={theme}>
      <StorefrontStyles />
      <ScopedCssBaseline className="storefront-preview" id="preview-home">
        <a className="preview-skip" href="#preview-main">Skip to content</a>
        <div className="preview-shell">
          <PreviewHeader bag={bag} />
          <main id="preview-main" tabIndex={-1}>
            {productId !== null ? (product ? <ProductDetail product={product} onAddToBag={addToBag} /> :
              <section className="product-detail"><h1>Product not found</h1><a href="#preview-direction">Back to the collection</a></section>) : null}
            {isBag && <BagPage bag={bag} />}
            {isSignIn && <SignInPage mode={isSignUp ? 'sign-up' : 'sign-in'} />}
            {addedId !== null && (addedProduct ? <AddedToBag product={addedProduct} bag={bag} /> : <section className="product-detail"><h1>Selection not found</h1><a href="#bag">Review bag</a></section>)}
            <div hidden={productId !== null || isBag || isSignIn || addedId !== null}>
            <PreviewHero selected={selected} onSelect={setSelected} />
            <ScrollReveal className="preview-strip" aria-label="Collection categories">
              <span>OVER-EAR</span><span>IN-EAR</span>
              <span>EVERYDAY LISTENING</span>
              <span>YOUR OWN FREQUENCY</span>
            </ScrollReveal>
            <HeadphoneCollection />
            <ListeningStories />
            <ProductShowcase />
            </div>
          </main>
          <ScrollReveal as="footer" className="preview-footer"><span>RESONANCE</span><span>DESIGNED & BUILT BY ADRIAN NASRAT</span></ScrollReveal>
        </div>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}
