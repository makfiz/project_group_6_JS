import { ApiServise } from './apiServise';
import { makeGallary } from './templates/renderMovieGallary';
import { refs } from './refs';

import { switchColorGalleryTitle } from './colorSwitcher';

import { pagination, setSearchMode } from './pagination';
import genres from './genresData.json';

export const apiServise = new ApiServise();

const { movieList, searchForm, genreSelector, textSearchError } = refs;


addEventListener('DOMContentLoaded', onTrendMovies);
searchForm.addEventListener('submit', onSearchMovie);

export async function onTrendMovies() {
  const res = await apiServise.fetchTrendingMovies();

  makeGallary(res.results);
  apiServise.totalPage = res.total_pages;
  pagination(apiServise);
}

async function onSearchMovie(e) {
  e.preventDefault();
  apiServise.query = e.currentTarget.elements.filmName.value.trim();


  movieList.innerHTML = '';
  apiServise
    .fetchSearchMovie()
    .then(data => makeGallary(data))
    .then(() => switchColorGalleryTitle(refs));

  e.currentTarget.reset();
  movieList.innerHTML = '';
  apiServise.resetPage();

  const data = await apiServise.fetchSearchMovie();

  data.length === 0
    ? textSearchError.classList.remove('is-hidden')
    : textSearchError.classList.add('is-hidden');

  makeGallary(data);
  setSearchMode(apiServise);

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
}
