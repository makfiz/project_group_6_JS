import { apiServise } from './searchFilms';

//Додавання активного фону для кнопок
export function buttonsPagination() {
  const wideScreen = window.innerWidth > 767;

  if (apiServise.totalPage <= 9 && wideScreen) {
    deleteActiveLinks();
    // addActiveLinkToWideScreen();
    document
      .querySelector(`.pagination__item[data-page="${apiServise.pages}"]`)
      .querySelector('.pagination__link')
      .classList.add('pagination__link-active');
  }

  if (apiServise.pages < 5 && apiServise.totalPage > 9 && wideScreen) {
    deleteActiveLinks();

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
    // addActiveLinkToWideScreen();

    document
      .querySelector('.pagination__item[data-page="dots-first"]')
      .classList.add('visually-hidden');
    document
      .querySelector('.pagination__item[data-page="dots-second"]')
      .classList.remove('visually-hidden');
  }

  if (
    apiServise.pages >= 5 &&
    apiServise.pages <= apiServise.totalPage - 5 &&
    apiServise.totalPage > 9 &&
    wideScreen
  ) {
    deleteActiveLinks();

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
    apiServise.pages > apiServise.totalPage - 5 &&
    apiServise.totalPage > 9 &&
    wideScreen
  ) {
    deleteActiveLinks();

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
    // addActiveLinkToWideScreen();

    document
      .querySelector('.pagination__item[data-page="dots-second"]')
      .classList.add('visually-hidden');
    document
      .querySelector('.pagination__item[data-page="dots-first"]')
      .classList.remove('visually-hidden');
  }

  //Умови для маленької ширини екрана
  if (apiServise.totalPage <= 5 && !wideScreen) {
    deleteActiveLinks();
    // addActiveLinkToNarrowScreen();
    document
      .querySelector(`.pagination__item[data-mobpage="${apiServise.pages}"]`)
      .querySelector('.pagination__link')
      .classList.add('pagination__link-active');
  }

  if (apiServise.pages < 3 && apiServise.totalPage > 5 && !wideScreen) {
    deleteActiveLinks();

    const pages = document.querySelectorAll('.js-pages');
    let counter = 1;
    pages.forEach(page => {
      page.dataset.page = counter;
      page.querySelector('.pagination__link').textContent = counter;
      counter += 1;
    });

    document
      .querySelector(`.pagination__item[data-mobpage="${apiServise.pages}"]`)
      .querySelector('.pagination__link')
      .classList.add('pagination__link-active');
    // addActiveLinkToNarrowScreen();
  }

  if (
    apiServise.pages >= 3 &&
    apiServise.pages <= apiServise.totalPage - 3 &&
    apiServise.totalPage > 5 &&
    !wideScreen
  ) {
    deleteActiveLinks();

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
  }

  if (
    apiServise.pages > apiServise.totalPage - 3 &&
    apiServise.totalPage > 5 &&
    !wideScreen
  ) {
    deleteActiveLinks();

    const pages = document.querySelectorAll('.js-pages');
    let counter = apiServise.totalPage - 4;
    pages.forEach(page => {
      page.dataset.page = counter;
      page.querySelector('.pagination__link').textContent = counter;
      if (counter === apiServise.totalPage) {
        return;
      }
      counter += 1;
    });

    document
      .querySelector(`.pagination__item[data-page="${apiServise.pages}"]`)
      .querySelector('.pagination__link')
      .classList.add('pagination__link-active');
    // addActiveLinkToNarrowScreen();
  }
}

//Скрол нової сторінки вверх контейнера
export function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery__list')
    .firstElementChild.getBoundingClientRect();

  const screenSize = window.innerWidth;

  if (screenSize <= 767) {
    window.scrollBy({
      top: -cardHeight * 20,
      behavior: 'smooth',
    });
  }
  if (screenSize > 767 && screenSize < 1280) {
    window.scrollBy({
      top: -cardHeight * 10,
      behavior: 'smooth',
    });
  }
  if (screenSize >= 1280) {
    window.scrollBy({
      top: -cardHeight * 7,
      behavior: 'smooth',
    });
  }
}

// Заборона перезавантаження сторінки по кліку на посилання
export function preventDefaultForLinks() {
  document
    .querySelectorAll('.pagination__link')
    .forEach(link => link.addEventListener('click', e => e.preventDefault()));
}

//Видалення активних посилань (кнопок)
export function deleteActiveLinks() {
  const activeLinks = document.querySelectorAll('.pagination__link-active');
  if (activeLinks) {
    activeLinks.forEach(link =>
      link.classList.remove('pagination__link-active')
    );
  }
}

//Додати активне посилання (кнопку)
function addActiveLinkToWideScreen() {
  document
    .querySelector(`.pagination__item[data-page="${apiServise.pages}"]`)
    .querySelector('.pagination__link')
    .classList.add('pagination__link-active');
}

function addActiveLinkToNarrowScreen() {
  document
    .querySelector(`.pagination__item[data-mobpage="${apiServise.pages}"]`)
    .querySelector('.pagination__link')
    .classList.add('pagination__link-active');
}

//Стеження за зміною ширини в'юпорта
window.addEventListener('resize', function () {
  //   if (window.matchMedia('(min-width: 768px)').matches) {
  //     return;
  //   } else if (window.matchMedia('(max-width: 300px)').matches) {
  //     return;
  //   } else {
  //   this.location.reload();
  //   }
  this.location.reload();
});
