const burgerBtn = document.querySelector('.btn--burger');
const burgerLink = document.querySelectorAll('.nav__link');

burgerBtn.addEventListener('click', burgerMenuShow);
burgerLink.forEach(el => {
  el.addEventListener('click', burgerMenuShow);
});

function burgerMenuShow() {
  burgerBtn.classList.toggle('btn--burger-active');
  document
    .querySelector('.header__inner')
    .classList.toggle('header__inner--active');
  document.body.classList.toggle('dis-scroll');
}
