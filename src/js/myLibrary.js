import { FirebaseService } from "./firebaseservice";
import { makeGallaryLibrary } from './templates/renderMoviesLibrary';
import { pagination } from './pagination';

import { ApiServise } from './apiServise';
export const apiServise = new ApiServise();

const firebase = new FirebaseService

const refs = {
  libraryFilter: document.querySelector('.library-filter'),
  watchedBtn: document.querySelector('[data-watched]'),
  queueBtn: document.querySelector('[data-queue]'),
  search: document.querySelector('.search'),
  library: document.querySelector('[data-library]'),
  gallery: document.querySelector('.gallery'),
  // my library gallery 
  galleryMain: document.querySelector('.gallery__list'),
  galleryLibrary: document.querySelector('.gallery__list--library'),
  // my library gallery 
};
const { libraryFilter, watchedBtn, queueBtn, search, library, galleryMain, galleryLibrary, gallery } = refs;

function openLibrary() {
  // if
  if (gallery.childNodes[3].nodeName == 'UL') {
    gallery.removeChild(galleryMain);
  }
  
  search.classList.add('visually-hidden');
  libraryFilter.classList.remove('visually-hidden')
  galleryLibrary.classList.remove('visually-hidden');
  galleryLibrary.classList.add('library')
}
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
library.addEventListener('click', openLibrary);
// watchedBtn.addEventListener('click', loadWatced);
// queueBtn.addEventListener('click', loadQueue);



export async function onTrendMovies() {
  const res = await apiServise.fetchTrendingMovies();

  makeGallaryLibrary(res.results);
  apiServise.totalPage = res.total_pages;
  pagination(apiServise);
}
library.addEventListener('click', onTrendMovies);