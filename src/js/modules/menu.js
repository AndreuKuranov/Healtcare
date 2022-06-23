import { checkClass } from "./functions.js";

export const menu = () => {
  let btn = document.querySelector('.btn--menu');

  const f = () => {
    btn.removeEventListener('click', f);

    let list = document.querySelector('.navbar__list');
    list.classList.add('navbar__list--open');
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

      btn.addEventListener('click', f);

      setTimeout(() => {
        btn.disabled = false;
        list.classList.remove('navbar__list--open', 'navbar__list--off-animation');
      }, 1000);
    }

    const closesOnLinkClick = (e) => {
      if (checkClass(e.target, 'navbar__link')) {
        closeEvent(false);
      }
    }

    const closeList = (e) => {
      let x = [];
      closesOnLinkClick(e);

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
    window.addEventListener('resize', closesAccordingToWidth);

    setTimeout(() => {
      document.body.addEventListener('click', closeList);
    }, 0);
  }

  btn.addEventListener('click', f);
}
