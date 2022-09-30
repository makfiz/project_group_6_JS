import { refs } from './refs';

const { search, libraryBtn, homeBtn, gallery, libraryFilter, logo, pagEl } =
  refs;

function openLibrary() {
  gallery.innerHTML = '';
  search.classList.add('visually-hidden');
  libraryFilter.classList.remove('visually-hidden');
  homeBtn.addEventListener('click', openHome);
  pagEl.classList.add('visually-hidden');
}

function openHome() {
  location.reload();
  // gallery.innerHTML = '';
  // search.classList.remove('visually-hidden');
  // libraryFilter.classList.add('visually-hidden');
  //TODO: замінити релоад сторінки на перерендер карток
}
libraryBtn.addEventListener('click', openLibrary);
logo.addEventListener('click', openHome);
homeBtn.removeEventListener;
