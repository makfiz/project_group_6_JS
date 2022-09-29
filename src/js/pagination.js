
import { ApiServise } from './apiServise';

const newApi = new ApiServise();
console.log(newApi.totalPage);

export function pagination(ref) {
  ref.addEventListener('click', somefunc);


// import { pagination, preventDefaultForLinks } from './js/pagination';
// export const instance = new ApiServise();
// async function abc() {
//   await instance.fetchTrendingMovies();
//   await pagination(instance);
//   preventDefaultForLinks();
// }
// abc();

import { instance } from '../index';

export function preventDefaultForLinks() {
  document
    .querySelectorAll('a')
    .forEach(link => link.addEventListener('click', e => e.preventDefault()));
}

export async function pagination(instance) {
  const rootEl = document.querySelector('.pagination');
  createAndRenderPagination(instance, rootEl);
  rootEl.addEventListener('click', onPaginationBlockClick);
}

function createAndRenderPagination(instance, rootEl) {
  const totalPages = instance.totalPages;
  const currentPage = instance.page;
  const amount = currentPage + 5;

  //Створення і рендер розмітки по умові
  if (totalPages > 9) {
    let markup = '';
    for (let i = 2; i <= amount; i += 1) {
      markup += `<li class="pagination__item js-pages" data-page="${i}">
      <a href="" class="pagination__link">${i}</a>
    </li>`;
    }
    const lastItem = ` <li class="pagination__item pagination__item-additional" data-page=${totalPages}>
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

function onPaginationBlockClick(e) {
  if (
    !e.target.classList.contains('pagination__link') &&
    !e.target.closest('.pagination__link')
  )
    return;

  const activeEl = document.querySelector('.pagination__link-active');
  const itemValue = e.target.closest('.pagination__item').dataset.page;

  if (itemValue !== 'previous' && itemValue !== 'next') {
    //Поставити сторінку в екземплярі класу
    instance.npage = Number(itemValue);
    console.log('instance.page', instance.page);

    //Додавання активного фону для кнопок
    if (activeEl && instance.npage < 5) {
      activeEl.classList.remove('pagination__link-active');

      const pages = document.querySelectorAll('.js-pages');
      let counter = 2;
      pages.forEach(page => {
        // console.log(counter);
        // console.log(page);
        page.dataset.page = counter;
        page.querySelector('.pagination__link').textContent = counter;
        counter += 1;
      });

      document
        .querySelector(`.pagination__item[data-page="${instance.npage}"]`)
        .querySelector('.pagination__link')
        .classList.add('pagination__link-active');

      // e.target
      //   .closest('.pagination__link')
      //   .classList.add('pagination__link-active');

      document
        .querySelector('.pagination__item[data-page="dots-first"]')
        .classList.add('visually-hidden');
    }

    if (activeEl && instance.npage >= 5) {
      activeEl.classList.remove('pagination__link-active');

      const pages = document.querySelectorAll('.js-pages');
      const currentPage = instance.npage;
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
    }
  }

}
