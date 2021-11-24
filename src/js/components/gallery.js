function randomId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function selectType(item) {
  const lang = document.getElementsByTagName('html')[0].getAttribute('lang');

  if (lang == 'en') {
    itemType = item.en.type;
  } else if (lang == 'uk') {
    itemType = item.uk.type;
  } else {
    itemType = item.ru.type;
  }
  return itemType;
}

function selectClass(item) {
  const lang = document.getElementsByTagName('html')[0].getAttribute('lang');

  if (lang == 'en') {
    itemClass = item.en.class;
  } else if (lang == 'uk') {
    itemClass = item.uk.class;
  } else {
    itemClass = item.ru.class;
  }
  return itemClass;
}

function selectDesc(item) {
  const lang = document.getElementsByTagName('html')[0].getAttribute('lang');

  if (lang == 'en') {
    itemDesc = item.en.desc;
  } else if (lang == 'uk') {
    itemDesc = item.uk.desc;
  } else {
    itemDesc = item.ru.desc;
  }
  return itemDesc;
}

fetch('../data.json')
  .then(data => {
    return data.text();
  })
  .then(data => {
    const galleryDate = JSON.parse(data);

    //types
    typeBtnsDisplay();
    function typeBtnsDisplay() {
      const typeBtnWrapepr = document.querySelector('.portfolio-main');
      const typesData = [];

      galleryDate.forEach(item => {
        const typeTemplate = {
          id: Math.random(),
          type: selectType(item),
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
        if (selectType(item) == type) {
          const classTemplate = {
            id: Math.random(),
            class: selectClass(item),
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
        if (item.viewing == 'video') {
          if (itemClass == 'all' && selectType(item) == itemType) {
            itemsWrapper.classList.add('gallery--video');
            let galleryItem = `
      <li id="${item.id}" class="gallery__item gallery__item-video">
        <div class="gallery__item-video-title-wrapper">
        <h4 class="gallery__item-video-title title title--contacts">
          ${selectDesc(item)}
        </h4>
        </div>
        <img alt="${selectDesc(item)}" class="gallery__video-poster" src='${
              item.imgMinUrl
            }'>
      </li>
      `;

            itemsWrapper.innerHTML += galleryItem;
          } else if (
            (selectType(item) == itemType && selectClass(item) == itemClass) ||
            itemType == '' ||
            itemClass == ''
          ) {
            itemsWrapper.classList.add('gallery--video');
            let galleryItem = `
      <li id="${item.id}" class="gallery__item gallery__item-video">
      <div class="gallery__item-video-title-wrapper">
        <h4 class="gallery__item-video-title title title--contacts">
          ${selectDesc(item)}
        </h4>
        </div>
        <img alt="${selectDesc(item)}" class="gallery__video-poster" src='${
              item.imgMinUrl
            }'>
      </li>
      `;

            itemsWrapper.innerHTML += galleryItem;
          }
        } else {
          if (itemClass == 'all' && selectType(item) == itemType) {
            itemsWrapper.classList.remove('gallery--video');

            let galleryItem = `
      <li id="${item.id}" class="gallery__item">
        <img alt="${selectDesc(item)}" class="gallery__img" src='${
              item.imgMinUrl
            }'>
      </li>
      `;

            itemsWrapper.innerHTML += galleryItem;
          } else if (
            (selectType(item) == itemType && selectClass(item) == itemClass) ||
            itemType == '' ||
            itemClass == ''
          ) {
            itemsWrapper.classList.remove('gallery--video');

            let galleryItem = `
      <li id="${item.id}" class="gallery__item">
        <img alt="${selectDesc(item)}" class="gallery__img" src='${
              item.imgMinUrl
            }'>
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
          galleryDate.forEach(item => {
            if (item.id == galleryModalBtnId) {
              if (item.viewing == 'video') {
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
				<source class="player__video-source" src="${item.imgUrl}" type="${item.videoType}">
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
        
        <img alt="${selectDesc(item)}" class="portfolio__modal-img" src='${
                  item.imgUrl
                }'>
        `;
                galleryModal.innerHTML += modalTemplate;
                document.querySelector('.portfolio__modal-img').onload =
                  function () {
                    document.querySelector(
                      '.portfolio__modal-img'
                    ).style.opacity = 1;
                    document.querySelector(
                      '.image-preloader'
                    ).style.visibility = 'hidden';
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
  });
