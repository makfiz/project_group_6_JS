import { refs } from './refs';

const {
  search,
  libraryBtn,
  homeBtn,
  gallery,
  libraryFilter,
  logo,
  pagEl,
  filterContainer,
} = refs;

function openLibrary() {
  gallery.innerHTML = '';
  homeBtn.addEventListener('click', openHome);
  search.classList.add('visually-hidden');
  libraryFilter.classList.remove('visually-hidden');
  homeBtn.classList.remove('nav-list__link--selected');
  libraryBtn.classList.add('nav-list__link--selected');
  pagEl.classList.add('visually-hidden');
  filterContainer.classList.add('visually-hidden');
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
