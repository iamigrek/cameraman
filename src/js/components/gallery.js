function randomId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

//Данные
let galleryDate = [
  {
    id: randomId(),
    imgUrl: './images/1.jpg',
    imgMinUrl: './images/min/1.jpg',
    class: 'reports',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/2.jpg',
    imgMinUrl: './images/min/2.jpg',
    class: 'portraits',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/3.jpg',
    imgMinUrl: './images/min/3.jpg',
    class: 'reports',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/4.jpg',
    imgMinUrl: './images/min/4.jpg',
    class: 'portraits',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/5.jpg',
    imgMinUrl: './images/min/5.jpg',
    class: 'portraits',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/videos/1.mp4',
    imgMinUrl: './images/min/3.jpg',
    desc: 'реклама моршинской',
    class: 'реклама',
    type: 'video',
    viewing: 'video',
  },
  {
    id: randomId(),
    imgUrl: './images/6.jpg',
    imgMinUrl: './images/min/6.jpg',
    class: 'reports',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/7.jpg',
    imgMinUrl: './images/min/7.jpg',
    class: 'weddings',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/8.jpg',
    imgMinUrl: './images/min/8.jpg',
    class: 'weddings',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/videos/1.mp4',
    imgMinUrl: './images/min/1.jpg',
    desc: 'реклама нижнего белья',
    class: 'reports',
    type: 'video',
    viewing: 'video',
  },
];

//types
typeBtnsDisplay();
function typeBtnsDisplay() {
  const typeBtnWrapepr = document.querySelector('.portfolio-main');
  const typesData = [];

  galleryDate.forEach(item => {
    const typeTemplate = {
      id: Math.random(),
      type: item.type,
    };
    typesData.push(typeTemplate);
  });

  const typesDataSort = typesData.reduce((unique, o) => {
    if (!unique.some(obj => obj.type === o.type)) {
      unique.push(o);
    }
    return unique;
  }, []);

  typeBtnWrapepr.innerHTML = '';
  classBtnsDisplay(typesDataSort[0].type);
  // classfilter(typesDataSort[0].type);
  typesDataSort.forEach(item => {
    let typesTemplate = `
    <li class="portfolio-main__item">
      <button class="portfolio-main__btn btn btn--portfolio" data-type="${item.type}">${item.type}</button>
    </li>

  `;

    typeBtnWrapepr.innerHTML += typesTemplate;
  });
  typeBtnWrapepr.children[0].children
    .item(0)
    .classList.add('btn--portfolio-active');
}

//class

function classBtnsDisplay(type) {
  const classBtnWrapepr = document.querySelector('.portfolio-category');
  const classData = [
    {
      id: 123456789,
      class: 'all',
    },
  ];

  galleryDate.forEach(item => {
    if (item.type == type) {
      const classTemplate = {
        id: Math.random(),
        class: item.class,
      };
      classData.push(classTemplate);
    }
  });

  const classDataSort = classData.reduce((unique, o) => {
    if (!unique.some(obj => obj.class === o.class)) {
      unique.push(o);
    }
    return unique;
  }, []);
  classBtnWrapepr.innerHTML = '';
  classDataSort.forEach(item => {
    let classTemplate = `
    <li class="portfolio-category__item">
      <button class="portfolio-category__btn btn btn--category portfolio-category__btn--portraits" data-class="${item.class}">${item.class}</button>
    </li>
  `;
    classBtnWrapepr.innerHTML += classTemplate;
    classfilter(type, classDataSort[0].class);
  });
  classBtnWrapepr.children[0].children
    .item(0)
    .classList.add('btn--category-active');
}

const typeBtn = document.querySelectorAll('[data-type]');

typeBtn.forEach(item => {
  item.addEventListener('click', () => {
    typeBtn.forEach(el => {
      el.classList.remove('btn--portfolio-active');
    });
    item.classList.add('btn--portfolio-active');
    classBtnsDisplay(item.dataset.type);
  });
});

function classfilter(itemsType, itemClass) {
  const classBtna = document.querySelectorAll('[data-class]');

  classBtna.forEach(item => {
    galleryDisplay(itemsType, itemClass);

    item.addEventListener('click', () => {
      classBtna.forEach(el => {
        el.classList.remove('btn--category-active');
      });
      item.classList.add('btn--category-active');
      galleryDisplay(itemsType, item.dataset.class);
    });
  });
}

//photos
function galleryDisplay(itemType, itemClass) {
  const itemsWrapper = document.querySelector('.gallery');

  itemsWrapper.innerHTML = '';

  galleryDate.forEach(item => {
    console.log(itemType, itemClass);

    if (item.viewing == 'video') {
      if (itemClass == 'all' && item.type == itemType) {
        itemsWrapper.classList.add('gallery--video');
        let galleryItem = `
      <li id="${item.id}" class="gallery__item gallery__item-video">
        <div class="gallery__item-video-title-wrapper">
        <h4 class="gallery__item-video-title title title--contacts">
          ${item.desc}
        </h4>
        </div>
        <img alt="gallery__img" class="gallery__video-poster" src='${item.imgMinUrl}'>
      </li>
      `;

        itemsWrapper.innerHTML += galleryItem;
      } else if (
        (item.type == itemType && item.class == itemClass) ||
        itemType == '' ||
        itemClass == ''
      ) {
        itemsWrapper.classList.add('gallery--video');
        let galleryItem = `
      <li id="${item.id}" class="gallery__item gallery__item-video">
      <div class="gallery__item-video-title-wrapper">
        <h4 class="gallery__item-video-title title title--contacts">
          ${item.desc}
        </h4>
        </div>
        <img alt="gallery__img" class="gallery__video-poster" src='${item.imgMinUrl}'>
      </li>
      `;

        itemsWrapper.innerHTML += galleryItem;
      }
    } else {
      if (itemClass == 'all' && item.type == itemType) {
        itemsWrapper.classList.remove('gallery--video');

        let galleryItem = `
      <li id="${item.id}" class="gallery__item">
        <img alt="gallery__img" class="gallery__img" src='${item.imgMinUrl}'>
      </li>
      `;

        itemsWrapper.innerHTML += galleryItem;
      } else if (
        (item.type == itemType && item.class == itemClass) ||
        itemType == '' ||
        itemClass == ''
      ) {
        itemsWrapper.classList.remove('gallery--video');

        let galleryItem = `
      <li id="${item.id}" class="gallery__item">
        <img alt="gallery__img" class="gallery__img" src='${item.imgMinUrl}'>
      </li>
      `;

        itemsWrapper.innerHTML += galleryItem;
      }
    }
    modalView();
  });
}

//modal photo viewing

function modalView() {
  const galleryModalBtn = document.querySelectorAll('.gallery__item');
  const galleryModal = document.querySelector('.portfolio__modal');

  galleryModalBtn.forEach(item => {
    item.addEventListener('click', () => {
      galleryModal.classList.add('portfolio__modal-bg');
      document.querySelector('body').classList.add('dis-scroll');

      const galleryModalBtnId = item.getAttribute('id');

      galleryModal.innerHTML = '';
      galleryDate.forEach(el => {
        if (el.id == galleryModalBtnId) {
          if (el.viewing == 'video') {
            let modalTemplate = `

		  	<button class="portfolio__modal-btn btn btn--close"></button>
        <div class="portfolio__modal-preloader image-preloader ">
          <ul class="image-preloader-inner list-reset">

        <li class="image-preloader__item">
          <span class="image-preloader__el"></span>
        </li>
        <li class="image-preloader__item">
          <span class="image-preloader__el"></span>
        </li>
        <li class="image-preloader__item">
          <span class="image-preloader__el"></span>
        </li>
		  </ul>
      </div>
        <div class="portfolio__modal-player player">
			<video class="player__video">
				<source class="player__video-source" src="${el.imgUrl}" type="video/mp4">
			</video>
			<div class="player__controls">
				<input class="player__time-progress-range" type="range" value=0>

				<div class="player__bottom">
					<ul class="player__controls-left list-reset">
            <li class="player__controls-left-item">
              <button class="player__play btn btn--play"></button>
            </li>	
            <li class="player__controls-left-item">
              <button class="player__volume btn btn--volume"></button>
              <input type="range" class="player__volume-range">
            </li>
            <li class="player__controls-left-item player__time">
              <span class="player__time-passed player__time-el">0:00:00</span>
              <span class="player__time-left player__time-el">0:00:00</span>
            </li>
					</ul>
					<div class="player__controls-right">
						<button class="player__full btn btn--full"></button>
					</div>
				</div>
			</div>
		</div>
        `;
            galleryModal.innerHTML = modalTemplate;
            document
              .querySelector('.player__video')
              .addEventListener('canplay', () => {
                document.querySelector('.image-preloader').style.display =
                  'none';
              });
            videoPlayer();
          } else {
            let modalTemplate = `
          <div class="portfolio__modal-preloader image-preloader ">
          <ul class="image-preloader-inner list-reset">

        <li class="image-preloader__item">
          <span class="image-preloader__el"></span>
        </li>
        <li class="image-preloader__item">
          <span class="image-preloader__el"></span>
        </li>
        <li class="image-preloader__item">
          <span class="image-preloader__el"></span>
        </li>
		  </ul>
      </div>
		  	<button class="portfolio__modal-btn btn btn--close"></button>
        
        <img alt="portfolio__modal-img" class="portfolio__modal-img" src='${el.imgUrl}'>
        `;
            galleryModal.innerHTML += modalTemplate;
            document.querySelector('.portfolio__modal-img').onload =
              function () {
                document.querySelector(
                  '.portfolio__modal-img'
                ).style.opacity = 1;
                document.querySelector('.image-preloader').style.visibility =
                  'hidden';
              };
            document
              .querySelector('.image-preloader')
              .addEventListener('click', galleryModalClose);
          }
          const galleryModalCloseBtn = document.querySelector(
            '.portfolio__modal-btn'
          );

          galleryModalCloseBtn.addEventListener('click', () => {
            galleryModalClose();
          });
          galleryModal.addEventListener('click', e => {
            if (e.target == galleryModal) {
              galleryModalClose();
            }
          });
        }
      });
    });
  });

  function galleryModalClose() {
    galleryModal.classList.remove('portfolio__modal-bg');
    galleryModal.innerHTML = '';
    document.querySelector('body').classList.remove('dis-scroll');
  }
}
