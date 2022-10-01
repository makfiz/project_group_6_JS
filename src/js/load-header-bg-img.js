const header = document.querySelector('.header');

export function changeHeaderBg(oldClass, newClass) {
  header.classList.remove(`${oldClass}`);
  header.classList.add(`${newClass}`);
}
