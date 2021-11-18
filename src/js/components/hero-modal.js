const heroModalBtn = document.querySelector('.hero__btn');
const heroModalWrapper = document.querySelector('.hero-modal');
const heroModalClose = document.querySelector('.hero-modal__close');
const heroModal = document.querySelector('.hero-modal__inner');
const sendingErrorModal = document.querySelector('.hero-modal__not-send');
const sendingСompletedModal = document.querySelector('.hero-modal__send');
const sendingModal = document.querySelector('.hero-modal__sending');

heroModalBtn.addEventListener('click', heroModalOpen);
heroModalClose.addEventListener('click', heroModalOpen);
heroModalWrapper.addEventListener('click', e => {
  e.target == heroModalWrapper && heroModalOpen();
});

function heroModalOpen() {
  sendingErrorModal.classList.add('is-hidden');
  sendingСompletedModal.classList.add('is-hidden');
  sendingModal.classList.remove('is-hidden');
  heroModalWrapper.classList.toggle('hero-modal--open');
  heroModal.classList.toggle('hero-modal__inner--open');
  document.querySelector('body').classList.toggle('dis-scroll');
}
