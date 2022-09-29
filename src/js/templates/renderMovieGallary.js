import genresData from '../../js/genresData.json';
import { refs } from '../refs';

export function makeGallary(movies) {
  const markup = movies.reduce(
    (
      acc,
      { id, poster_path, title, release_date, genre_ids, vote_average }
    ) => {
      let releaseDate = release_date;

      if (releaseDate === undefined) {
        releaseDate = '2022';
      } else {
        releaseDate = release_date.slice(0, 4);
      }

      let filmsGenres;

      if (genre_ids) {
        filmsGenres = genresData
          .filter(({ id }) => genre_ids.includes(id))
          .map(({ name }) => name)
          .join(' ');
      }

      let image = `https://image.tmdb.org/t/p/w400/${poster_path}`;
      if (poster_path === null) {
        image =
          'https://dummyimage.com/400x600/7d7d7d/fff.jpg&text=image+not+found';
        console.log('empty');
      }

      return (
        acc +
        `  <li class="gallery__item" data-id = ${id}>
            <div class="gallery-card"></div>
            <img
              src="${image}"
              alt="${title}"
              class="gallery-card__img"
            />
            <h3 class="gallery-card__title">${title}</h3>
            <p class="gallery-card__description">
              <span class="gallery-card__genre"
                >${filmsGenres || 'Action'}  |
                <span class="gallery-card__date">${releaseDate}</span></span
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
