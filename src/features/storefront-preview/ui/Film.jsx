import FilmToggle from "./FilmToggle";
import useFilm from "./useFilm";
import FilmVideo from "./FilmVideo";

// A silent looping film section. Nothing downloads until it comes on screen.
export default function Film({ film }) {
  const { failed, ended, playing, toggle, videoProps } = useFilm();
  if (failed) return null;

  const titleId = `film-${film.id}`;
  return (
    <section className="rx-film rx-wrap" aria-labelledby={titleId}>
      <header className="rx-film-head" data-reveal="up">
        <h2 className="rx-section-title" id={titleId}>
          {film.title}
        </h2>
        <p>{film.lead}</p>
      </header>
      <div className="rx-film-frame" data-reveal="zoom">
        <FilmVideo {...videoProps} film={film} loop preload="none" />
        <FilmToggle playing={playing} ended={ended} onClick={toggle} />
      </div>
    </section>
  );
}
