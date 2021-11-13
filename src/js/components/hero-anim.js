window.onload = function () {
  document.querySelector('.preloader').style.display = 'none';
  setTimeout(
    () =>
      document
        .querySelector('.hero__title')
        .classList.remove('hero__title--disable'),
    1200
  );
  setTimeout(
    () => document.querySelector('.nav').classList.remove('nav--disable'),
    2000
  );
  setTimeout(
    () =>
      document
        .querySelector('.hero__btn')
        .classList.remove('hero__btn--disable'),
    1500
  );
  setTimeout(() => {
    document.querySelector('.hero').classList.remove('hero--disable');
  }, 2000);
};
