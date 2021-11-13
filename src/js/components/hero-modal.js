const heroModalBtn = document.querySelector('.hero__btn');
const heroModalWrapper = document.querySelector('.hero-modal');
const heroModalClose = document.querySelector('.hero-modal__close');
const heroModal = document.querySelector('.hero-modal__inner');

heroModalBtn.addEventListener('click', heroModalOpen);
heroModalClose.addEventListener('click', heroModalOpen);
heroModalWrapper.addEventListener('click', e => {
  e.target == heroModalWrapper && heroModalOpen();
});

function heroModalOpen() {
  heroModalWrapper.classList.toggle('hero-modal--open');
  document.querySelector('body').classList.toggle('dis-scroll');
}
