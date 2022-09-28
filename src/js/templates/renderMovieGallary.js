import genresData from '../../js/genresData.json';
import { refs } from '../refs';

export function makeGallary(movies) {
  const markup = movies.reduce(
    (
      acc,
      {
        id,
        poster_path,
        title,
        release_date,
        first_air_date,
        genre_ids,
        genre,
        vote_average,
      }
    ) => {
      let filmsGenres;
      console.log(release_date.slice(0, 4));
      if (genre_ids) {
        filmsGenres = genresData
          .filter(({ id }) => genre_ids.includes(id))
          .map(({ name }) => name)
          .join(' ');
      }
      if (genre) {
        filmsGenres = genresData.map(({ name }) => name).join('');
      }

      return (
        acc +
        `  <li class="gallery__item" data-id = ${id}>
            <div class="gallery-card"></div>
            <img
              src="https://image.tmdb.org/t/p/w400/${poster_path}"
              alt="${title}"
              class="gallery-card__img"
            />
            <h3 class="gallery-card__title">${title}</h3>
            <p class="gallery-card__description">
              <span class="gallery-card__genre"
                >${filmsGenres || 'Action'}  |
                <span class="gallery-card__date">${release_date.slice(
                  0,
                  4
                )}</span></span
              >
              <span class="gallery-card__rating">${vote_average || '-'} </span>
            </p>
          </li>`
      );
    },
    ''
  );
  refs.movieList.innerHTML = markup;
}
