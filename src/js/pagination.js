import { apiServise, onTrendMovies, onSearchMovie } from './searchFilms';
import { refs } from './refs';
import { makeGallary } from './templates/renderMovieGallary';

import { switchColorGalleryTitle } from './colorSwitcher';

import * as pagRender from './templates/renderPaginationPages';
import * as pagAPI from './paginationAPI';

const { createAndRenderPagination, removePages } = pagRender;
const { smoothScroll, preventDefaultForLinks, buttonsPagination } = pagAPI;

export async function pagination(instance) {
  console.log('apiServise.mode', apiServise.mode);
  if (document.querySelectorAll('.js-pages').length === 0) {
    createAndRenderPagination(instance);
    refs.pagination.addEventListener('click', onPaginationBlockClick);
  }
  preventDefaultForLinks();
}

//Обробка кліків по кнопках блоку пагінації
async function onPaginationBlockClick(e) {
  if (
    !e.target.classList.contains('pagination__link') &&
    !e.target.closest('.pagination__link')
  )
    return;

  const itemValue =
    e.target.closest('.pagination__item').dataset.page ??
    e.target.closest('.pagination__item').dataset.mobpage;

  //Кнопка попередня сторінка
  if (itemValue === 'previous') {
    if (apiServise.pages === 1) return;
    apiServise.decrementPage();
    buttonsPagination();
    await contentLoader();
    return;
  }

  //Кнопка наступна сторінка
  if (itemValue === 'next') {
    if (apiServise.pages === apiServise.totalPage) return;
    apiServise.incrementPage();
    buttonsPagination();
    await contentLoader();
    return;
  }

  //Кнопки із цифрами
  if (itemValue !== 'previous' && itemValue !== 'next') {
    apiServise.pages = Number(itemValue);

    buttonsPagination();
    contentLoader();
  }
}

//Перемикання сторінок за ключовим словом
export function setSearchMode(apiServise) {
  removePages();
  apiServise.mode = 'search';
  pagination(apiServise);
}

//Перемикання сторінок за жанрами
export function setGenresMode(apiServise) {
  removePages();
  apiServise.mode = 'genres';
  pagination(apiServise);
}

// Завантаження контенту по умові
async function contentLoader() {
  switch (apiServise.mode) {
    case 'trending':
      await onTrendMovies();

      switchColorGalleryTitle(refs);

      smoothScroll();

      return;
    case 'search':
      const data = await apiServise.fetchSearchMovie();
      refs.movieList.innerHTML = '';
      makeGallary(data);

      switchColorGalleryTitle(refs);

      smoothScroll();

      return;
    case 'genres':
      const info = await apiServise.fetchMovieByGenre();
      refs.movieList.innerHTML = '';
      makeGallary(info);

      switchColorGalleryTitle(refs);

      smoothScroll();

      return;
  }
}

window.onload = () => refs.pagEl.classList.remove('visually-hidden');
window.addEventListener('resize', e => {
  document.querySelectorAll('.js-render').forEach(link => link.remove());
  pagination(apiServise);
});
