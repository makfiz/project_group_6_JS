import { ApiServise } from './apiServise';
import { makeGallary } from './templates/renderMovieGallary';
import { refs } from './refs';

import { switchColorGalleryTitle } from './colorSwitcher';

import { pagination, setSearchMode, setGenresMode } from './pagination';
import genres from './genresData.json';

export const apiServise = new ApiServise();

const { movieList, searchForm, genreSelector, textSearchError, pagEl } = refs;

addEventListener('DOMContentLoaded', onTrendMovies);
searchForm.addEventListener('submit', onSearchMovie);

export async function onTrendMovies() {
  const res = await apiServise.fetchTrendingMovies();

  makeGallary(res.results);
  apiServise.totalPage = res.total_pages;
  pagination(apiServise);
  switchColorGalleryTitle(refs);
}

async function onSearchMovie(e) {
  e.preventDefault();

  apiServise.query = e.currentTarget.elements.filmName.value.trim();

  e.currentTarget.reset();
  apiServise.resetPage();
  movieList.innerHTML = '';

  const data = await apiServise.fetchSearchMovie();

  if (data.length === 0) {
    textSearchError.classList.remove('is-hidden');
    pagEl.classList.add('visually-hidden');
    return;
  } else {
    textSearchError.classList.add('is-hidden');
    pagEl.classList.remove('visually-hidden');
  }

  makeGallary(data);
  setSearchMode(apiServise);
  switchColorGalleryTitle(refs);

  genreSelector.children[1].value = 'genres';
}

genreSelector.addEventListener('change', onCreateGalleryByGenre);

async function onCreateGalleryByGenre(e) {
  const genreType = e.target.value;

  const genreId = genres
    .filter(({ name }) => name === genreType)
    .map(({ id }) => id)
    .join('');

  apiServise.genreId = genreId;

  const res = await apiServise.fetchMovieByGenre();
  makeGallary(res);
  apiServise.resetPage();
  setGenresMode(apiServise);
  switchColorGalleryTitle(refs);
}
