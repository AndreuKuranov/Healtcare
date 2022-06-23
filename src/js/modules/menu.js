import { checkClass } from "./functions.js";

export const menu = () => {
  let btn = document.querySelector('.btn--menu');
  let list = document.querySelector('.navbar__list');

  btn.addEventListener('click', e => {
    list.classList.toggle('navbar__list--open');
    btn.disabled = true;

    list.classList.add('navbar__list--on-animation');

    const closeEvent = (animation) => {
      list.classList.remove('navbar__list--on-animation');
      list.classList.add('navbar__list--off-animation');

      if (animation) {
        list.classList.remove('navbar__list--off-animation');
      }

      document.body.removeEventListener('click', closeList);
      window.removeEventListener('resize', closesAccordingToWidth);
      list.removeEventListener('click', closesOnLinkClick);

      setTimeout(() => {
        btn.disabled = false;
        list.classList.remove('navbar__list--open', 'navbar__list--off-animation');
      }, 1000);
    }

    const closeList = (e) => {
      let x = [];

      for (let item of e.path) {
        for (let i of item.classList) {
          x.push(i);
        }

        if (checkClass(item, 'body')) {
          break
        }
      }

      if (!x.some(item => item === 'navbar__list')) {
        closeEvent(false);
      }
    }

    const closesAccordingToWidth = () => {
      if (window.innerWidth > 768) {
        closeEvent(true);
      }
    }

    const closesOnLinkClick = (e) => {
      if (checkClass(e.target, 'navbar__link')) {
        closeEvent(false);
      }
    }

    list.addEventListener('click', closesOnLinkClick);
    window.addEventListener('resize', closesAccordingToWidth);

    if (checkClass(list, 'navbar__list--open')) {
      setTimeout(() => {
        document.body.addEventListener('click', closeList);
      }, 0);
    } else {
      closeEvent(false);
    }
  });
}
