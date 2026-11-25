import { phoneFilm } from "../media";

// A film in two sizes. Phones load the 720 px copy and larger screens the full
// one, much as srcset works for pictures. Only the last source reports an
// error, once neither copy could play.
export default function FilmVideo({ film, onError, ...props }) {
  return (
    <video {...props} poster={film.poster} aria-label={film.description}>
      <source src={phoneFilm(film.src)} media="(max-width: 734px)" type="video/mp4" />
      <source src={film.src} type="video/mp4" onError={onError} />
    </video>
  );
}
