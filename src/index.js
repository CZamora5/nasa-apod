import { getPictureByDate, getPicturesByMonth } from './api.js';
import { printPicture, printPictures } from './display.js';
import { hideSpinner, showSpinner } from './spinner.js';
import { getFilterByOption } from './header.js';



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
    const filterBy = getFilterByOption('#filter-by');
    searchImage(elem.dataset['date'], filterBy);
  }
});

async function searchImage(date, filterBy) {
  showSpinner();
  const picture = await getPictureByDate(date);
  hideSpinner();
  if (filterBy !== 'any' && picture['media_type'] !== filterBy) {
    showNotResults();
  } else {
    printPicture(picture);
  }
}

async function searchImages(month, filterBy) {
  showSpinner();
  const pictures = await getPicturesByMonth(month);
  hideSpinner();
  if (filterBy !== 'any') {
    pictures = pictures.filter(pic => pic['media_type'] === filterBy);

    if (pictures.length === 0) {
      showNotResults();
    }
  }
  printPictures(pictures);
}

function showNotResults() {
  console.log('not results');
}