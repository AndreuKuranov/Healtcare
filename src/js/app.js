import Swiper from "swiper/bundle";

import { isWebp } from "./modules/isWebp.js";
import { checkClass } from "./modules/functions.js";
import { btnGetStarted } from "./modules/btnGetStarted.js";
import { menu } from "./modules/menu.js";

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
        slidesPerView: 1.2,
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

const modal = () => {
  const modalBtn = document.querySelectorAll('.search__modal');

  const modalWin = (typeDevice) => {
    const body = document.body;
    const modalElement = document.querySelector('.modal');
    const modalBody = modalElement.querySelector('.modal__body');

    body.classList.add('body--scroll');
    if (typeDevice === 'mouse') {
      body.classList.add('body--padding');
    }

    modalElement.classList.add('modal--open', 'modal--on-animation');
    modalBody.classList.add('modal__body--on-animation');

    const f = (e) => {
      if (checkClass(e.target, 'modal') || checkClass(e.target, 'modal__btn')) {

        modalElement.classList.remove('modal--on-animation');
        modalBody.classList.remove('modal__body--on-animation');

        modalElement.classList.add('modal--off-animation');
        modalBody.classList.add('modal__body--off-animation');

        modalElement.removeEventListener('click', f);

        setTimeout(() => {
          body.classList.remove('body--scroll');
          if (typeDevice === 'mouse') {
            body.classList.remove('body--padding');
          }
          modalBody.classList.remove('modal__body--off-animation');
          modalElement.classList.remove('modal--open', 'modal--off-animation');
        }, 1000);
      }
    } 

    modalElement.addEventListener('click', f);
  }

  for (let i = 0; i < modalBtn.length; i++) {
    modalBtn[i].addEventListener('click', e => {
      // console.log(modalBtn[i].dataset.name);
      // console.log(e.pointerType);

      modalWin(e.pointerType);
    });
  }
}

modal();