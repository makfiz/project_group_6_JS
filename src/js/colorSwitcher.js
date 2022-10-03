import { refs } from './refs';
import { load, save, remove } from './localStorage';
refs.switchColorCheckbox.addEventListener('change', onColorSwitcherEl);

function onColorSwitcherEl(e) {
  e.preventDefault();

  refs.switchColorCheckbox.checked ? save('dark', 'on') : remove('dark');

  switchThemeMaker(refs);
}

function getDynamicRefs() {
  return {
    galleryTitle: document.querySelectorAll('.gallery-card__title'),
    paginationEl: document.querySelector('.pagination'),
  };
}

function switchThemeMaker(refs) {
  refs.gallery.classList.toggle('dark');
  refs.btnToTop.classList.toggle('dark');
  refs.footerContainer.classList.toggle('dark');
  refs.footerContainer.firstElementChild.classList.toggle('dark');
  refs.footerBtn.classList.toggle('dark');

  const dynamicRefs = getDynamicRefs();
  dynamicRefs.paginationEl.classList.toggle('dark');

  for (const el of dynamicRefs.paginationEl.children) {
    el.firstElementChild.classList.toggle('dark');

    if (el.dataset.page === 'next') {
      el.classList.toggle('dark');
    }
    if (el.dataset.page === 'previous') {
      el.classList.toggle('dark');
    }
  }
  dynamicRefs.galleryTitle.forEach(el => {
    return el.classList.toggle('dark');
  });
}

function switchThemeRenderMaker(refs) {
  refs.gallery.classList.toggle('dark');
  refs.btnToTop.classList.toggle('dark');
  refs.footerContainer.classList.toggle('dark');
  refs.footerContainer.firstElementChild.classList.toggle('dark');
  refs.footerBtn.classList.toggle('dark');

  const dynamicRefs = getDynamicRefs();
  dynamicRefs.paginationEl.classList.toggle('dark');

  for (const el of dynamicRefs.paginationEl.children) {
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
  dynamicRefs.galleryTitle.forEach(el => {
    if (!el.classList.contains('dark')) {
      return el.classList.toggle('dark');
    }
  });
}

function onStartCheckDarkThemeStatus() {
  if (load('dark') === 'on') {
    refs.switchColorCheckbox.checked = true;
    switchThemeRenderMaker(refs);
  }
}

export function switchColorGalleryTitle(refs) {
  const dynamicRefs = getDynamicRefs();

  if (refs.switchColorCheckbox.checked) {
    dynamicRefs.galleryTitle.forEach(el => {
      if (!el.classList.contains('dark')) {
        return el.classList.toggle('dark');
      }
    });
    for (const el of dynamicRefs.paginationEl.children) {
      if (!el.firstElementChild.classList.contains('dark')) {
        el.firstElementChild.classList.toggle('dark');
      }
    }
  }
}

export function switchGalleryTitleLibraryDarkTheme(refs) {
  const galleryTitle = document.querySelectorAll('.gallery-card__title');
  if (refs.switchColorCheckbox.checked) {
    galleryTitle.forEach(el => {
      if (!el.classList.contains('dark')) {
        return el.classList.toggle('dark');
      }
    });
  }
}

onStartCheckDarkThemeStatus();
