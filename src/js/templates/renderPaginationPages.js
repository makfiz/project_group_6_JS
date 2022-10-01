import { deleteActiveLinks } from '../paginationAPI';
import { refs } from '../refs';

export function createAndRenderPagination(instance) {
  const rootEl = refs.pagination;
  const wideScreen = window.innerWidth > 767;

  //Приховуємо пагінацію якщо нічого не прийшло
  if (instance.totalPage === 0) {
    rootEl.classList.add('is-hidden');
    return;
  }

  rootEl.classList.remove('is-hidden');
  const totalPages = instance.totalPage;
  const currentPage = instance.pages;

  //Створення і рендер розмітки по умові

  //Якщо прийшло 9 сторінок і менше і екран більше 767px
  if (totalPages <= 9 && wideScreen) {
    const amount = totalPages - 1;
    let markup = '';
    for (let i = 2; i <= amount; i += 1) {
      markup += `<li class="pagination__item js-pages js-render" data-page="${i}">
      <a href="" class="pagination__link">${i}</a>
    </li>`;
    }

    if (totalPages !== 1) {
      const lastItem = ` <li class="pagination__item pagination__item-additional js-render" data-page=${totalPages}>
      <a href="" class="pagination__link">${totalPages}</a>
    </li>`;

      rootEl
        .querySelector('.pagination__item[data-page="next"]')
        .insertAdjacentHTML('beforebegin', lastItem);
    }

    rootEl
      .querySelector('.pagination__item[data-page="dots-first"]')
      .insertAdjacentHTML('afterend', markup);

    rootEl
      .querySelector('.pagination__item[data-page="dots-second"]')
      .classList.add('visually-hidden');
  }

  //Якщо прийшло більше ніж 9 сторінок і екран більше 767px
  if (totalPages > 9 && wideScreen) {
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
    document
      .querySelector('.pagination__item[data-page="dots-second"]')
      .classList.remove('visually-hidden');
  }

  //Якщо прийшло більше ніж 5 сторінок і екран менше 767px
  if (totalPages >= 5 && !wideScreen) {
    const amount = currentPage + 4;
    let markup = '';

    for (let i = 1; i <= amount; i += 1) {
      markup += `<li class="pagination__item js-pages js-render" data-mobpage="${i}">
      <a href="" class="pagination__link">${i}</a>
    </li>`;
    }

    rootEl
      .querySelector('.pagination__item[data-page="dots-first"]')
      .insertAdjacentHTML('afterend', markup);

    deleteActiveLinks();
    document
      .querySelector(`.pagination__item[data-mobpage="1"]`)
      .querySelector('.pagination__link')
      .classList.add('pagination__link-active');
  }

  //Якщо прийшло менше ніж 5 сторінок і екран менше 767px
  if (totalPages < 5 && !wideScreen) {
    const amount = totalPages;
    let markup = '';

    for (let i = 1; i <= amount; i += 1) {
      markup += `<li class="pagination__item js-pages js-render" data-mobpage="${i}">
      <a href="" class="pagination__link">${i}</a>
    </li>`;
    }

    rootEl
      .querySelector('.pagination__item[data-page="dots-first"]')
      .insertAdjacentHTML('afterend', markup);

    deleteActiveLinks();
    document
      .querySelector(`.pagination__item[data-mobpage="1"]`)
      .querySelector('.pagination__link')
      .classList.add('pagination__link-active');
  }
}

//Видалення відрендерених сторінок
export function removePages() {
  document.querySelectorAll('.js-render').forEach(el => el.remove());
}
