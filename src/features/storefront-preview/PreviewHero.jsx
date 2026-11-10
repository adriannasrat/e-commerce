import { collectionHref, collectionModels } from "./collections/collections";
import { formatPrice } from "./products";
import FilmToggle from "./ui/FilmToggle";
import { films } from "./ui/films";
import useFilm from "./ui/useFilm";

const film = films.home;

// The first thing on the site: one line, two actions, and a film that plays
// once and rests on its last frame.
export default function PreviewHero() {
  const { failed, ended, playing, toggle, videoProps } = useFilm();
  const fromPrice = Math.min(
    ...collectionModels("over-ear").map((model) => model.price),
  );
  return (
    <section className="preview-hero" aria-labelledby="preview-headline">
      <div className="preview-hero-copy">
        <h1 id="preview-headline" className="rx-hero-title">
          Less noise. More feeling.
        </h1>
        <p className="rx-hero-sub">Over-ear headphones, made for the long listen.</p>
        <p className="preview-hero-price">From {formatPrice(fromPrice)}</p>
        <div className="rx-actions">
          <a className="rx-btn" href={collectionHref("over-ear")}>
            Learn more
          </a>
          <a className="rx-btn rx-btn--ghost" href="#preview-direction">
            Shop all
          </a>
        </div>
      </div>
      {!failed && (
        <div className="preview-hero-film">
          <video
            {...videoProps}
            src={film.src}
            poster={film.poster}
            aria-label={film.description}
            preload="metadata"
          />
          <FilmToggle playing={playing} ended={ended} onClick={toggle} />
        </div>
      )}
    </section>
  );
}
