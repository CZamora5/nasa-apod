import { getPictureByDate, getPicturesByMonth, getRandomPictures } from './api.js';
import { printPicture, printPictures } from './display.js';
import { hideSpinner, showSpinner } from './spinner.js';
import { hidePagination, setPage } from './pagination.js';
import { getSearchParams, validateSearchParams } from './header.js';

(async function run() {
  const defaultParams = {
    filterBy: 'any', searchBy: 'month', month: new Date().getUTCMonth() + 1, year: new Date().getUTCFullYear()
  };

  let paramsDetails = validateSearchParams(defaultParams);
  if (paramsDetails.validParams) {
    if (defaultParams.searchBy === 'month') {
      searchImages(paramsDetails.query, defaultParams);
    } else {
      searchImage(params.date, defaultParams);
    }
  }
})();

document.addEventListener('click', evt => {
  const elem = evt.target;
  const params = getSearchParams();

  if (elem.matches('.card__btn')) {
    searchImage(elem.dataset['date'], params);
  } else if (elem.matches('#search-btn')) {
    let paramsDetails = validateSearchParams(params);
    if (paramsDetails.validParams) {
      if (params.searchBy === 'month') {
        searchImages(paramsDetails.query, params);
      } else {
        searchImage(params.date, params);
      }
    }
  } else if (elem.matches('#search-btn-random')) {
    searchImage(null, params, true);
  }
});

export async function searchImage(date, params, random = false) {
  hidePagination();
  showSpinner();

  let picture;
  if (random) {
    [picture] = await getRandomPictures();
  } else {
    picture = await getPictureByDate(date);
  }
  hideSpinner();

  if (params.filterBy !== 'any' && picture['media_type'] !== params.filterBy) {
    showNotResults();
  } else {
    printPicture(picture);
    if (!random) {
      setPage(date, params, '.pagination__previous', '.pagination__next');
    }
  }
}

export async function searchImages(month, params) {
  hidePagination();
  showSpinner();

  let pictures = await getPicturesByMonth(month);
  hideSpinner();
  if (params.filterBy !== 'any') {
    pictures = pictures.filter(pic => pic['media_type'] === params.filterBy);
  }

  if (pictures.length === 0) {
    showNotResults();
  } else {
    printPictures(pictures);
    setPage(month, params, '.pagination__previous', '.pagination__next');
  }
}

function showNotResults() {
  document.write('not results');
}