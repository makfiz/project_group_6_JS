import { ApiServise } from './apiServise';
import { makeGallary } from './templates/renderMovieGallary';
import { refs } from './refs';
import { pagination, setSearchMode } from './pagination';

export const apiServise = new ApiServise();

const { movieList, searchForm } = refs;

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
  e.currentTarget.reset();
  movieList.innerHTML = '';
  apiServise.resetPage();
  const data = await apiServise.fetchSearchMovie();
  makeGallary(data);
  setSearchMode(apiServise);
}
