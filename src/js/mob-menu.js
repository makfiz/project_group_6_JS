const navList = document.querySelector('.nav-list');
const openMenuBtn = document.querySelector('[data-menu-open]');
function onResizeWindow() {
  if (document.documentElement.clientWidth < 768) {
    navList.classList.add('nav-list-mobile');
    openMenuBtn.classList.remove('visually-hidden');
  }
  if (document.documentElement.clientWidth >= 768) {
    navList.classList.remove('nav-list-mobile');
    openMenuBtn.classList.add('visually-hidden');
  }
}
onResizeWindow();

function toggleModal() {
  navList.classList.toggle('nav-list-mobile--open');
}
window.addEventListener('resize', onResizeWindow);

openMenuBtn.addEventListener('click', toggleModal);
openMenuBtn.addEventListener('blur', toggleModal);
