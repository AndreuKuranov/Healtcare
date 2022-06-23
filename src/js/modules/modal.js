import { checkClass } from "./functions.js";

export const modal = (typeDevice, element) => {
  const body = document.body;
  const modalElement = document.querySelector('.modal');
  const modalBody = modalElement.querySelector('.modal__body');
  const modalContent = modalElement.querySelector('.modal__content');

  if (element) {
    modalContent.append(element);
  }

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

        if (element) {
          modalContent.removeChild(element);
        }
      }, 1000);
    }
  } 

  modalElement.addEventListener('click', f);
}
