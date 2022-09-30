import { ApiServise } from './apiServise';
import { makeGallary } from './templates/renderMovieGallary';
import { refs } from './refs';
import { switchColorGalleryTitle } from './colorSwitcher';

const apiServise = new ApiServise();
const { movieList, searchForm } = refs;

addEventListener('DOMContentLoaded', onTrendMovies);
searchForm.addEventListener('submit', onSearchMovie);

function onTrendMovies() {
  apiServise.fetchTrendingMovies().then(data => makeGallary(data));
}

function onSearchMovie(e) {
  e.preventDefault();
  apiServise.query = e.currentTarget.elements.filmName.value.trim();

  movieList.innerHTML = '';
  apiServise
    .fetchSearchMovie()
    .then(data => makeGallary(data))
    .then(() => switchColorGalleryTitle(refs));
  e.currentTarget.reset();
}
