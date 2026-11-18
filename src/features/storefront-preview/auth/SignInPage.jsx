import { useLayoutEffect } from "react";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import PersonAddAltOutlined from "@mui/icons-material/PersonAddAltOutlined";
import ArrowBack from "@mui/icons-material/ArrowBack";
import HeadphoneImage from "../HeadphoneImage";
import { products } from "../products";
import ScrollReveal from "../ScrollReveal";
import AuthForm from "./AuthForm";
import { useLocation } from "react-router-dom";
import { paths, returnPath, withReturn } from "../routes";


export default function SignInPage({ mode = "sign-in" }) {
  const image = products.find((product) => product.id === "silver")?.image;
  const signingUp = mode === "sign-up";
  const next = returnPath(useLocation().search);
  const fromCheckout = next === paths.checkout;
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <section className="resonance-sign-in" aria-labelledby="sign-in-title">
      <ScrollReveal className="sign-in-card">
        <aside className="sign-in-art" aria-label="Find your own frequency">
          <p className="sign-in-art-eyebrow">A little closer to the music.</p>
          <div className="sign-in-orbits" aria-hidden="true" />
          <h2>
            Your sound.
            <br />
            Your space.
          </h2>
          {image && <HeadphoneImage image={image} className="sign-in-headphones" />}
          <div className="sign-in-art-caption">
            <span>Halo · Silver</span>
            <span>Made for your moments.</span>
          </div>
        </aside>
        <div className="sign-in-panel">
          <div className="sign-in-panel-top">
            <a
              href={paths.home}
              className="sign-in-brand"
              aria-label="Resonance home"
            >
              RESONANCE
            </a>
            <a
              className="sign-in-text-button"
              href={withReturn(signingUp ? paths.signIn : paths.signUp, next)}
            >
              {signingUp ? <LoginOutlined /> : <PersonAddAltOutlined />}
              {signingUp ? "Sign in" : "Sign up"}
            </a>
          </div>
          <AuthForm key={mode} signingUp={signingUp} />
          <div className="sign-in-panel-bottom">
            <a href={fromCheckout ? paths.checkout : paths.store}>
              <ArrowBack /> {fromCheckout ? "Back to checkout" : "Back to the collection"}
            </a>
            <span>Listen your way.</span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
