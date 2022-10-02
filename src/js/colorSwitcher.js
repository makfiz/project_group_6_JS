import { refs } from './refs';
import { load, save, remove } from './localStorage';
refs.switchColorCheckbox.addEventListener('change', onColorSwitcherEl);

function onColorSwitcherEl(e) {
  e.preventDefault();

  if (refs.switchColorCheckbox.checked) {
    refs.switchColorCheckbox.ariaChecked = 'true';
    save('dark', 'on');
  } else {
    refs.switchColorCheckbox.ariaChecked = 'false';
    remove('dark');
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
    if (!el.firstElementChild.classList.contains('dark')) {
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
    if (!el.classList.contains('dark')) {
      return el.classList.toggle('dark');
    }
  });
}

export function switchColorGalleryTitle(refs) {
  const galleryTitle = document.querySelectorAll('.gallery-card__title');
  const paginationEl = document.querySelector('.pagination');
  if (refs.switchColorCheckbox.checked) {
    galleryTitle.forEach(el => {
      if (!el.classList.contains('dark')) {
        return el.classList.toggle('dark');
      }
    });
    for (const el of paginationEl.children) {
      if (!el.firstElementChild.classList.contains('dark')) {
        el.firstElementChild.classList.toggle('dark');
      }
    }
  }
}
// export function switchColorPagination(refs) {}
function onStartCheckDarkModeStatus() {
  if (load('dark') === 'on') {
    refs.switchColorCheckbox.checked = true;
    refs.switchColorCheckbox.ariaChecked = 'true';
    const switchRefs = getRefs();
    switchColorMaker(switchRefs);
  }
}

onStartCheckDarkModeStatus();
