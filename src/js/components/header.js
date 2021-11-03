const header = document.querySelector('.header');
const hero = document.querySelector('.hero');

window.onscroll = function (e) {
  if (window.scrollY >= hero.clientHeight) {
    header.classList.add('header--active');
  } else {
    header.classList.remove('header--active');
  }
};
