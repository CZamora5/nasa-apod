import { getPictureByDate, getPicturesByMonth } from './api.js';
import { printPicture, printPictures } from './display.js';

async function test() {
  const data = await getPicturesByMonth('2022-07');
  printPictures(data);

  // const picture = await getPictureByDate('2022-02-09');
  // printPicture(picture);
}

test();

const hamburgerMenu = document.querySelector('.navbar__menu');

hamburgerMenu.addEventListener('click', evt => {
  evt.currentTarget.classList.toggle('active');
});

document.addEventListener('click', async evt => {
  const elem = evt.target;

  if (elem.matches('.card__btn')) {
    const picture = await getPictureByDate(elem.dataset['date']);
    printPicture(picture);
  }
});