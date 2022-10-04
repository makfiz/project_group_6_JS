const onTopBtn = document.querySelector('.btn-to-top');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > document.documentElement.clientHeight / 2) {
    onTopBtn.classList.remove('visually-hidden');
  } else {
    onTopBtn.classList.add('visually-hidden');
  }
});
