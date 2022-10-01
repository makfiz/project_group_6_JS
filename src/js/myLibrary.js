import { refs } from './refs';
const { watchedBtn, queueBtn, gallerySection__gallery, search,libraryFilter, galleryLibrary, libraryBtn, galleryMain } = refs;

import { makeGallaryLibrary } from './templates/renderMoviesLibrary';
import { pagination } from './pagination';
import { FirebaseService } from "./firebaseservice";
import { ApiServise } from './apiServise';
export const apiServise = new ApiServise();

const firebase = new FirebaseService();

// function openLibrary() {
//   // if
 

//   search.classList.add('visually-hidden');
//   libraryFilter.classList.remove('visually-hidden');
//   galleryLibrary.classList.remove('visually-hidden');
//   galleryLibrary.classList.add('library');
// }

function loadWatced() {
  watchedBtn.classList.add('library__btn--selected');
  queueBtn.classList.remove('library__btn--selected');
  galleryMain.innerHTML = '';
  //TODO: додати рендер карток при натискані на кнопку
}
function loadQueue() {
  watchedBtn.classList.remove('library__btn--selected');
  queueBtn.classList.add('library__btn--selected');
  galleryMain.innerHTML = '';
  //TODO: додати рендер карток при натискані на кнопку
}

watchedBtn.addEventListener('click', loadWatced);
queueBtn.addEventListener('click', loadQueue);

// libraryBtn.addEventListener('click', () => {
//   openLibrary()
//   onTrendMovies()
// });

export async function onTrendMovies() {
  const res = await apiServise.fetchTrendingMovies();

  makeGallaryLibrary(res.results);
  apiServise.totalPage = res.total_pages;
  pagination(apiServise);
}
// libraryBtn.addEventListener('click', onTrendMovies);
