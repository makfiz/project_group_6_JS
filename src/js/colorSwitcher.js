import { refs } from './refs';
refs.switchColorCheckbox.addEventListener('change', onColorSwitcherEl);

function onColorSwitcherEl(e) {
  e.preventDefault();
  if (e.target.checked) {
    refs.switchColorCheckbox.ariaChecked = 'true';
  } else {
    refs.switchColorCheckbox.ariaChecked = 'false';
  }

  const switchRefs = getRefs();
  switchColorMaker(switchRefs);
}

function getRefs() {
  return {
    galleryContainer: document.querySelector('.gallery-section'),
    galleryTitle: document.querySelectorAll('.gallery-card__title'),
    btnToTop: document.querySelector('.btn-to-top__link'),
    footerContainer: document.querySelector('.footer'),
    footerBtn: document.querySelector('.footer__button'),
    paginationEl: document.querySelector('.pagination'),
  };
}

function switchColorMaker(switchRefs) {
  switchRefs.galleryContainer.classList.toggle('dark');
  switchRefs.btnToTop.classList.toggle('dark');
  switchRefs.footerContainer.classList.toggle('dark');
  switchRefs.footerContainer.firstElementChild.classList.toggle('dark');
  switchRefs.footerBtn.classList.toggle('dark');
  switchRefs.paginationEl.classList.toggle('dark');
  for (const el of switchRefs.paginationEl.children) {
    if (!el.firstElementChild.classList.contains('pagination__link-active')) {
      el.firstElementChild.classList.toggle('dark');
    }
    if (el.dataset.page === 'next') {
      el.classList.toggle('dark');
    }
    if (el.dataset.page === 'previous') {
      el.classList.toggle('dark');
    }
  }
  switchRefs.galleryTitle.forEach(el => {
    return el.classList.toggle('dark');
  });
}

export function switchColorGalleryTitle(refs) {
  const galleryTitle = document.querySelectorAll('.gallery-card__title');
  if (refs.switchColorCheckbox.ariaChecked === 'true') {
    galleryTitle.forEach(el => {
      return el.classList.toggle('dark');
    });
  }
}
