import genresData from '../../js/genresData.json';
const galleryLibrary = document.querySelector('.gallery__list--library')

export function makeGallaryLibrary(movies) {
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
      }

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
                    ${filmsGenres || 'Action'}  |
                    <span class="gallery-card__date">
                      ${releaseDate}</span>
                  </span>
                </p>
              </div>
            </div>
          </li>`
      );
    },
    ''
  );
  galleryLibrary.innerHTML = markup;
}
