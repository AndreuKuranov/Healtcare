import Swiper from "swiper/bundle";

import { isWebp } from "./modules/isWebp.js";
import { checkClass } from "./modules/functions.js";
import { btnGetStarted } from "./modules/btnGetStarted.js";
import { menu } from "./modules/menu.js";
import { modal } from "./modules/modal.js";

isWebp();
btnGetStarted();
menu();

const sliderSwiper = document.querySelector('.services__swiper');
const reviewsSwiper = document.querySelector('.reviews__swiper');

if (sliderSwiper) {
  const swiper = new Swiper('.services__swiper', {

    breakpoints: {
      993: { 
        spaceBetween: 65,
        slidesPerView: 3,
      },
      769: { 
        spaceBetween: 30,
        slidesPerView: 2.6,
      },
      577: {
        spaceBetween: 20,
        slidesPerView: 2.2,
      },
      481: { 
        spaceBetween: 20,
        slidesPerView: 1.8,
      },
      320: { 
        spaceBetween: 20,
        slidesPerView: 1.2,
      },
    },

    speed: 400,
    centeredSlides: true,
    grabCursor: true,

    initialSlide: 1,
    // loop: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

if (reviewsSwiper) {
  const swiper = new Swiper('.reviews__swiper', {

    breakpoints: {
      993: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      769: {
        slidesPerView: 2.2,
        spaceBetween: 30,
      },
      577: {
        slidesPerView: 1.8,
        spaceBetween: 30,
      },
      481: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      320: { 
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },

    speed: 400,
    centeredSlides: true,
    grabCursor: true,

    initialSlide: 1,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// я не разобралася можно ли у слайдера swiper переназначить кнопки навигации и сделал имитацию клика по ним. 
// Почему так поступил, по тому что, от стилизовать кнопки можно, а вот вытащить их за пределы слайдера нельзя, 
// переписывание внутренних классов ломало верстку. Не думаю, что так можно использовать new Event, но вроде работает)
const swiperBtn = () => {
  const reviews = document.querySelector('.reviews');

  const reviewsBtnPrev = reviews.querySelector('.reviews__btn--prev');
  const reviewsBtnNext = reviews.querySelector('.reviews__btn--next');
  
  const btnPrev = reviews.querySelector('.reviews__swiper-button-prev');
  const btnNext = reviews.querySelector('.reviews__swiper-button-next');

  const checkPrev = () => {
    btnPrev.ariaDisabled === 'true' ? reviewsBtnPrev.disabled = true : reviewsBtnPrev.disabled = false
  };
  const checkNext = () => {
    btnNext.ariaDisabled === 'true' ? reviewsBtnNext.disabled = true : reviewsBtnNext.disabled = false
  };

  let event = new Event("click");

  reviewsBtnPrev.addEventListener('click', e => {
    btnPrev.dispatchEvent(event);

    checkPrev();
    checkNext();
  });

  reviewsBtnNext.addEventListener('click', e => {
    btnNext.dispatchEvent(event);

    checkPrev();
    checkNext();
  });
}

swiperBtn();

const callingModal = () => {
  const searchModal = document.querySelectorAll('.search__modal');
  const reviewsSwiperWrapper = document.querySelector('.reviews__swiper-wrapper');

  for (let i = 0; i < searchModal.length; i++) {
    searchModal[i].addEventListener('click', e => {
      const elementId = document.getElementById(searchModal[i].dataset.name);
      let clon;

      if (elementId) {
        clon = elementId.cloneNode(true);
        clon.removeAttribute('id');
      }

      modal(e.pointerType, clon);
    });
  }

  reviewsSwiperWrapper.addEventListener('click', e => {
    for (let item of e.path) {
      if (checkClass(item, 'reviews__column')) {
        const clon = item.cloneNode(true);
        const reviewsCommit = clon.querySelector('.reviews__commit');
        reviewsCommit.classList.remove('reviews__commit--overflow');

        modal(e.pointerType, clon);
      }

      if (checkClass(item, 'reviews__swiper-wrapper')) {
        break
      }
    }
  });
}

callingModal();
