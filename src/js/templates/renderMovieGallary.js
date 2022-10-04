import genresData from '../../js/genresData.json';
import { refs } from '../refs';

function getGenre(genre, genreIds) {
  let filmsGenres = genre
    .filter(({ id }) => genreIds.includes(id))
    .map(({ name }) => name)
    .join(' ');
  return filmsGenres;
}

export function makeGallary(movies) {
  const markup = movies.reduce(
    (
      acc,
      { id, poster_path, title, release_date, genre_ids, vote_average }
    ) => {
      const genreType = getGenre(genresData, genre_ids);

      let image =
        poster_path === null
          ? 'https://dummyimage.com/400x600/7d7d7d/fff.jpg&text=image+not+found'
          : `https://image.tmdb.org/t/p/w400/${poster_path}`;

      return (
        acc +
        ` <li class="gallery__item" data-id = ${id}>
            <div class="gallery-card">
              <div class="gallery-card__main">
                <img
                  src="${image}"
                  alt="${title}"
                  class="gallery-card__img"
                />
                <span class="gallery-card__rating"> ${
                  vote_average || '-'
                } </span>
              </div>
              <div class="gallery-card__content">
                <h3 class="gallery-card__title">${title}</h3>
                <p class="gallery-card__description">
                  <span class="gallery-card__genre">
                    ${genreType || 'Action'}  |
                    <span class="gallery-card__date">
                      ${release_date.slice(0, 4) || '2025'}</span>
                  </span>
                </p>
              </div>
            </div>
          </li>`
      );
    },
    ''
  );
  refs.movieList.innerHTML = markup;
}
