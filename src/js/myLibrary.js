import { refs } from './refs';
const { watchedBtn, queueBtn, gallery } = refs;

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
watchedBtn.addEventListener('click', loadWatced);
queueBtn.addEventListener('click', loadQueue);
