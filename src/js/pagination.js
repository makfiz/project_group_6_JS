import { apiServise, onTrendMovies, onSearchMovie } from './searchFilms';
import { refs } from './refs';
import { refs as libRefs } from './myLibrary';
import { makeGallary } from './templates/renderMovieGallary';


// Заборона перезавантаження сторінки по кліку на посилання
export function preventDefaultForLinks() {
  document
    .querySelectorAll('.pagination__link')
    .forEach(link => link.addEventListener('click', e => e.preventDefault()));
}

export async function pagination(instance) {
  if (document.querySelectorAll('.js-pages').length === 0) {
    const rootEl = document.querySelector('.pagination');
    createAndRenderPagination(instance, rootEl);
    rootEl.addEventListener('click', onPaginationBlockClick);
  }
  preventDefaultForLinks();
}

export function createAndRenderPagination(instance) {
  const rootEl = document.querySelector('.pagination');
  if (instance.totalPage === 0) {
    rootEl.classList.add('is-hidden');
    return;
  }
  rootEl.classList.remove('is-hidden');

  const totalPages = instance.totalPage;
  const currentPage = instance.pages;

  // console.log(totalPages);

  //Створення і рендер розмітки по умові
  //Якщо прийшло 9 сторінок і менше
  if (totalPages <= 9) {
    const amount = totalPages - 1;
    let markup = '';
    for (let i = 2; i <= amount; i += 1) {
      markup += `<li class="pagination__item js-pages js-render" data-page="${i}">
      <a href="" class="pagination__link">${i}</a>
    </li>`;
    }
    const lastItem = ` <li class="pagination__item pagination__item-additional js-render" data-page=${totalPages}>
      <a href="" class="pagination__link">${totalPages}</a>
    </li>`;
    rootEl
      .querySelector('.pagination__item[data-page="dots-first"]')
      .insertAdjacentHTML('afterend', markup);
    rootEl
      .querySelector('.pagination__item[data-page="next"]')
      .insertAdjacentHTML('beforebegin', lastItem);
    rootEl
      .querySelector('.pagination__item[data-page="dots-second"]')
      .classList.add('visually-hidden');
  }
  //Якщо прийшло більше ніж 9 сторінок
  if (totalPages > 9) {
    const amount = currentPage + 5;
    let markup = '';
    for (let i = 2; i <= amount; i += 1) {
      markup += `<li class="pagination__item js-pages js-render" data-page="${i}">
      <a href="" class="pagination__link">${i}</a>
    </li>`;
    }
    const lastItem = ` <li class="pagination__item pagination__item-additional js-render" data-page=${totalPages}>
      <a href="" class="pagination__link">${totalPages}</a>
    </li>`;

    rootEl
      .querySelector('.pagination__item[data-page="dots-first"]')
      .insertAdjacentHTML('afterend', markup);
    rootEl
      .querySelector('.pagination__item[data-page="dots-first"]')
      .classList.add('visually-hidden');
    rootEl
      .querySelector('.pagination__item[data-page="next"]')
      .insertAdjacentHTML('beforebegin', lastItem);
  }
}

async function onPaginationBlockClick(e) {
  if (
    !e.target.classList.contains('pagination__link') &&
    !e.target.closest('.pagination__link')
  )
    return;

  const activeEl = document.querySelector('.pagination__link-active');
  const itemValue = e.target.closest('.pagination__item').dataset.page;

  //Кнопка попередня сторінка
  if (itemValue === 'previous') {
    if (apiServise.pages === 1) return;
    apiServise.decrementPage();
    // console.log('instance.page', apiServise.pages);
    // console.log('mode =>>', apiServise.mode);
    buttonsPagination(activeEl);
    await contentLoader();
    return;
  }

  //Кнопка наступна сторінка
  if (itemValue === 'next') {
    if (apiServise.pages === apiServise.totalPage) return;
    apiServise.incrementPage();
    // console.log('instance.page', apiServise.pages);
    // console.log('mode =>>', apiServise.mode);
    buttonsPagination(activeEl);
    await contentLoader();
    return;
  }

  //Кнопки із цифрами
  if (itemValue !== 'previous' && itemValue !== 'next') {
    apiServise.pages = Number(itemValue);
    // console.log('instance.page', apiServise.pages);
    // console.log('mode =>>', apiServise.mode);
    buttonsPagination(activeEl);
    contentLoader();
  }
}

export function setSearchMode(apiServise) {
  removePages();
  apiServise.mode = 'search';
  pagination(apiServise);
  document
    .querySelector(`.pagination__item[data-page="${apiServise.pages}"]`)
    .querySelector('.pagination__link')
    .classList.add('pagination__link-active');
  // console.log('apiServise', apiServise);
}

function removePages() {
  document.querySelectorAll('.js-render').forEach(el => el.remove());
}

//===================================================================
//===================================================================

// Завантаження контенту по умові
async function contentLoader() {
  switch (apiServise.mode) {
    case 'trending':
      await onTrendMovies();
      return;
    case 'search':
      const data = await apiServise.fetchSearchMovie();
      refs.movieList.innerHTML = '';
      makeGallary(data);
      return;
  }
}

//Додавання активного фону для кнопок
function buttonsPagination(activeEl) {
  if (activeEl && apiServise.totalPage <= 9) {
    activeEl.classList.remove('pagination__link-active');
    document
      .querySelector(`.pagination__item[data-page="${apiServise.pages}"]`)
      .querySelector('.pagination__link')
      .classList.add('pagination__link-active');
  }

  if (activeEl && apiServise.pages < 5 && apiServise.totalPage > 9) {
    activeEl.classList.remove('pagination__link-active');

    const pages = document.querySelectorAll('.js-pages');
    let counter = 2;
    pages.forEach(page => {
      page.dataset.page = counter;
      page.querySelector('.pagination__link').textContent = counter;
      counter += 1;
    });

    document
      .querySelector(`.pagination__item[data-page="${apiServise.pages}"]`)
      .querySelector('.pagination__link')
      .classList.add('pagination__link-active');

    document
      .querySelector('.pagination__item[data-page="dots-first"]')
      .classList.add('visually-hidden');
    document
      .querySelector('.pagination__item[data-page="dots-second"]')
      .classList.remove('visually-hidden');
  }

  if (
    activeEl &&
    apiServise.pages >= 5 &&
    apiServise.pages <= apiServise.totalPage - 5 &&
    apiServise.totalPage > 9
  ) {
    activeEl.classList.remove('pagination__link-active');

    const pages = document.querySelectorAll('.js-pages');
    const currentPage = apiServise.pages;
    let counter = currentPage - 2;

    pages.forEach(page => {
      page.dataset.page = counter;
      page.querySelector('.pagination__link').textContent = counter;

      if (counter === currentPage) {
        page
          .querySelector('.pagination__link')
          .classList.add('pagination__link-active');
      }
      counter += 1;
    });

    document
      .querySelector('.pagination__item[data-page="dots-first"]')
      .classList.remove('visually-hidden');
    document
      .querySelector('.pagination__item[data-page="dots-second"]')
      .classList.remove('visually-hidden');
  }

  if (
    activeEl &&
    apiServise.pages > apiServise.totalPage - 5 &&
    apiServise.totalPage > 9
  ) {
    activeEl.classList.remove('pagination__link-active');

    const pages = document.querySelectorAll('.js-pages');
    let counter = apiServise.totalPage - 5;
    pages.forEach(page => {
      if (counter === apiServise.totalPage) return;
      page.dataset.page = counter;
      page.querySelector('.pagination__link').textContent = counter;
      counter += 1;
    });

    document
      .querySelector(`.pagination__item[data-page="${apiServise.pages}"]`)
      .querySelector('.pagination__link')
      .classList.add('pagination__link-active');

    document
      .querySelector('.pagination__item[data-page="dots-second"]')
      .classList.add('visually-hidden');
    document
      .querySelector('.pagination__item[data-page="dots-first"]')
      .classList.remove('visually-hidden');
  }
}
window.onload = () => refs.pagEl.classList.remove('visually-hidden');
