import { ApiServise } from './apiServise';
import { makeGallary } from './templates/renderMovieGallary';
import { refs } from './refs';

const apiServise = new ApiServise();

const { movieList, searchForm } = refs;

addEventListener('DOMContentLoaded', onTrendMovies);
searchForm.addEventListener('submit', onSearchMovie);

async function onTrendMovies() {
  const res = await apiServise.fetchTrendingMovies();

  makeGallary(res.results);
  apiServise.totalPage = res.total_pages;
}

function onSearchMovie(e) {
  e.preventDefault();
  apiServise.query = e.currentTarget.elements.filmName.value.trim();

  movieList.innerHTML = '';
  apiServise.fetchSearchMovie().then(data => makeGallary(data));
  e.currentTarget.reset();
}
