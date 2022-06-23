// можно и без скрипта обойтись, а сделать с помощи css, но надо текст внутри кнопки поместить в отдельный блок, но тогда ругается проверка html
// хотя, наверное можно с хлопнуть текст до нуля и он будет занимать несколько пикселей, после вычесть из отступа, но уже написал скрипт оставлю его 
export const btnGetStarted = () => {
  const btnGet = document.querySelector('.btn--get');

  let btnGetIcon = document.createElement('img');
  btnGetIcon.classList.add('btn__icon');
  btnGetIcon.src = 'img/icons/sprite-multi.svg#getStarted';

  let textBtn = btnGet.textContent;

  const checkBtn = () => {
    let icon = btnGet.querySelector('.btn__icon');

    if (window.innerWidth <= 768 && !icon) {
      btnGet.textContent = '';
      btnGet.append(btnGetIcon);
    } else if (window.innerWidth > 768 && icon) {
      btnGet.textContent = textBtn;
    }
  }

  checkBtn();

  window.addEventListener('resize', () => {
    checkBtn();
  });
}