const refs = {
  libraryFilter: document.querySelector('.library-filter'),
  watchedBtn: document.querySelector('[data-watched]'),
  queueBtn: document.querySelector('[data-queue]'),
  search: document.querySelector('.search'),
  library: document.querySelector('[data-library]'),
  gallery: document.querySelector('.gallery-section'),
};
const { libraryFilter, watchedBtn, queueBtn, search, library, gallery } = refs;
function openLibrary() {
  gallery.innerHTML = '';
  search.classList.add('visually-hidden');
  libraryFilter.classList.remove('visually-hidden');
}
function loadWatced() {
  watchedBtn.classList.add('library__btn--selected');
  queueBtn.classList.remove('library__btn--selected');
  gallery.innerHTML = '';
  //TODO: додати рендер карток при натискані на кнопку
}
function loadQueue() {
  watchedBtn.classList.remove('library__btn--selected');
  queueBtn.classList.add('library__btn--selected');
  gallery.innerHTML = '';
  //TODO: додати рендер карток при натискані на кнопку
}
library.addEventListener('click', openLibrary);
watchedBtn.addEventListener('click', loadWatced);
queueBtn.addEventListener('click', loadQueue);
