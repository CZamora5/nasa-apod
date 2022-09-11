import { getPictureByDate, getPicturesByMonth, getRandomPictures } from './api.js';
import { printPicture, printPictures } from './display.js';
import { hideSpinner, showSpinner } from './spinner.js';
import { hidePagination, showPagination } from './pagination.js';
import { getSearchParams, validateSearchParams } from './header.js';

async function test() {
  const data = await getPicturesByMonth('2022-07');
  printPictures(data);

  // const picture = await getPictureByDate('2015-07-07');
  // console.log(picture.explanation)
  // printPicture(picture);
}

test();


document.addEventListener('click', evt => {
  const elem = evt.target;
  const params = getSearchParams();

  if (elem.matches('.card__btn')) {
    searchImage(elem.dataset['date'], params.filterBy);
  } else if (elem.matches('#search-btn')) {
    let paramsDetails = validateSearchParams(params);
    console.log(paramsDetails)
    if (paramsDetails.validParams) {
      if (params.searchBy === 'month') {
        searchImages(paramsDetails.query, params.filterBy);
      } else {
        searchImage(params.date, params.filterBy);
      }
    }
  } else if (elem.matches('#search-btn-random')) {
    searchImage(null, params.filterBy, true);
  }
});

async function searchImage(date, filterBy, random = false) {
  hidePagination();
  showSpinner();

  let picture;
  if (random) {
    [picture] = await getRandomPictures();
  } else {
    picture = await getPictureByDate(date);
  }
  console.log(picture);
  hideSpinner();

  if (filterBy !== 'any' && picture['media_type'] !== filterBy) {
    showNotResults();
  } else {
    printPicture(picture);
    showPagination();
  }
}

async function searchImages(month, filterBy) {
  hidePagination();
  showSpinner();

  let pictures = await getPicturesByMonth(month);
  hideSpinner();
  if (filterBy !== 'any') {
    pictures = pictures.filter(pic => pic['media_type'] === filterBy);
  }

  if (pictures.length === 0) {
    showNotResults();
  } else {
    printPictures(pictures);
    showPagination();
  }
}

function showNotResults() {
  document.write('not results');
}