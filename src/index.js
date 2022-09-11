import { getPictureByDate, getPicturesByMonth } from './api.js';
import { printPicture, printPictures } from './display.js';
import { hideSpinner, showSpinner } from './spinner.js';
import {} from './header.js';



async function test() {
  const data = await getPicturesByMonth('2022-07');
  printPictures(data);

  // const picture = await getPictureByDate('2022-02-09');
  // printPicture(picture);
}

test();


document.addEventListener('click', evt => {
  const elem = evt.target;

  if (elem.matches('.card__btn')) {
    searchImage(elem.dataset['date']);
  }
});

async function searchImage(date) {
  showSpinner();
  const picture = await getPictureByDate(date);
  hideSpinner();
  printPicture(picture);
}

async function searchImages(month) {
  showSpinner();
  const pictures = await getPicturesByMonth(month);
  hideSpinner();
  printPictures(pictures);
}