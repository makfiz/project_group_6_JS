import { refs } from './refs';
import { FirebaseService } from './firebaseservice';
import { onTrendMovies } from './myLibrary';
const {
  search,
  libraryBtn,
  homeBtn,
  gallery,
  libraryFilter,
  logo,
  pagEl,
  filterContainer,
  galleryMain,
  galleryLibrary,
  gallerySection__gallery
} = refs;
// import { makeGallaryLibrary } from './templates/renderMoviesLibrary';
// import { pagination } from './pagination';

import { ApiServise } from './apiServise';
export const apiServise = new ApiServise();

const firebase = new FirebaseService();

// function openLibrary() {
//   // if

//   search.classList.add('visually-hidden');
//   libraryFilter.classList.remove('visually-hidden');
// }

function openLibrary() {
  if (gallerySection__gallery.childNodes[3].nodeName == 'UL') {
    gallerySection__gallery.removeChild(galleryMain);
  }
  // gallery.innerHTML = '';
  homeBtn.addEventListener('click', openHome);
  search.classList.add('visually-hidden');
  libraryFilter.classList.remove('visually-hidden');
  homeBtn.classList.remove('nav-list__link--selected');
  libraryBtn.classList.add('nav-list__link--selected');
  pagEl.classList.add('visually-hidden');
  filterContainer.classList.add('visually-hidden');




  galleryLibrary.classList.remove('visually-hidden');
  galleryLibrary.classList.add('library');

  onTrendMovies()
}

function openHome() {
  location.reload();
  // homeBtn.classList.add('nav-list__link--selected');
  // libraryBtn.classList.remove('nav-list__link--selected');
  // gallery.innerHTML = '';
  // search.classList.remove('visually-hidden');
  // libraryFilter.classList.add('visually-hidden');
  //TODO: замінити релоад сторінки на перерендер карток
}
libraryBtn.addEventListener('click', openLibrary);
logo.addEventListener('click', openHome);
homeBtn.removeEventListener;
