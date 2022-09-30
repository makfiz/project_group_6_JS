import { apiServise, onTrendMovies } from './searchFilms';

let mode = 'trending';

// Заборона перезавантаження сторінки по кліку на посилання
export function preventDefaultForLinks() {
  document
    .querySelectorAll('a')
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
  const totalPages = instance.totalPage;
  const currentPage = instance.pages;
  const amount = currentPage + 5;
  console.log(totalPages);

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

async function onPaginationBlockClick(e) {
  if (
    !e.target.classList.contains('pagination__link') &&
    !e.target.closest('.pagination__link')
  )
    return;

  const activeEl = document.querySelector('.pagination__link-active');
  const itemValue = e.target.closest('.pagination__item').dataset.page;

  if (itemValue !== 'previous' && itemValue !== 'next') {
    //Поставити сторінку в екземплярі класу
    apiServise.pages = Number(itemValue);
    console.log('instance.page', apiServise.pages);

    //Додавання активного фону для кнопок
    if (activeEl && apiServise.pages < 5) {
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
    }

    if (
      activeEl &&
      apiServise.pages >= 5 &&
      apiServise.pages <= apiServise.totalPage - 5
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

    if (activeEl && apiServise.pages > apiServise.totalPage - 5) {
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
    }

    switch (mode) {
      case 'trending':
        console.log(apiServise);
        await onTrendMovies();
        return;
      case 'search':
        return;
    }
  }
}
