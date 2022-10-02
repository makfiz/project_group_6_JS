import { refs } from '../refs';
import {
  deleteActiveLinks,
  hideFirstDotsInPagination,
  showSecondDotsInPagination,
  hideSecondDotsInPagination,
  addActiveLinkToNarrowScreen,
  addActiveLinkToWideScreen,
} from '../paginationAPI';

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
  //Для екранів розміром більше 767рх
  if (wideScreen) {
    //Якщо прийшло 9 сторінок і менше і екран більше 767px
    if (totalPages <= 9) {
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

        insertContentBeforeNextButton(rootEl, lastItem);
      }

      insertContentAfterFirstDotsInPagination(rootEl, markup);
      hideFirstDotsInPagination();
      hideSecondDotsInPagination();
      addActiveLinkToWideScreen();
    }

    //Якщо прийшло більше ніж 9 сторінок і екран більше 767px
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

      insertContentAfterFirstDotsInPagination(rootEl, markup);
      insertContentBeforeNextButton(rootEl, lastItem);

      hideFirstDotsInPagination();
      showSecondDotsInPagination();
      addActiveLinkToWideScreen();
    }
  }

  //Для екранів менших = 767рх
  else {
    //Якщо прийшло більше ніж 5 сторінок і екран менше 767px
    if (totalPages >= 5) {
      const amount = currentPage + 4;
      let markup = '';

      for (let i = 1; i <= amount; i += 1) {
        markup += `<li class="pagination__item js-pages js-render" data-mobpage="${i}">
      <a href="" class="pagination__link">${i}</a>
    </li>`;
      }

      insertContentAfterFirstDotsInPagination(rootEl, markup);
      deleteActiveLinks();
      // document
      //   .querySelector(`.pagination__item[data-mobpage="1"]`)
      //   .querySelector('.pagination__link')
      //   .classList.add('pagination__link-active');
      addActiveLinkToNarrowScreen();
    }

    //Якщо прийшло менше ніж 5 сторінок і екран менше 767px
    if (totalPages < 5) {
      const amount = totalPages;
      let markup = '';

      for (let i = 1; i <= amount; i += 1) {
        markup += `<li class="pagination__item js-pages js-render" data-mobpage="${i}">
      <a href="" class="pagination__link">${i}</a>
    </li>`;
      }

      insertContentAfterFirstDotsInPagination(rootEl, markup);
      deleteActiveLinks();
      // document
      //   .querySelector(`.pagination__item[data-mobpage="1"]`)
      //   .querySelector('.pagination__link')
      //   .classList.add('pagination__link-active');
      addActiveLinkToNarrowScreen();
    }
  }
}

//Видалення відрендерених сторінок
export function removePages() {
  document.querySelectorAll('.js-render').forEach(el => el.remove());
}

function insertContentAfterFirstDotsInPagination(selector, mark) {
  selector
    .querySelector('.pagination__item[data-page="dots-first"]')
    .insertAdjacentHTML('afterend', mark);
}

function insertContentBeforeNextButton(selector, mark) {
  selector
    .querySelector('.pagination__item[data-page="next"]')
    .insertAdjacentHTML('beforebegin', mark);
}
