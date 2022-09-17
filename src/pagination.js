import { validateSearchParams } from './header.js';
import { getPreviousDay, getNextDay, formatDate, getNextMonth, getPreviousMonth, getDateInStringFormat } from './util.js';
import { searchImage, searchImages } from './index.js';

export function setPage(current, lastSearchParams, previousBtnSelector, nextBtnSelector) {
  console.log(current);
  hidePagination();
  showPagination()
  const previousBtn = document.querySelector(previousBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);

  if (lastSearchParams.searchBy === 'month') {
    const previousMonth = getPreviousMonth(current);
    const nextMonth = getNextMonth(current);
    previousBtn.querySelector('span').textContent = getDateInStringFormat(previousMonth);
    nextBtn.querySelector('span').textContent = getDateInStringFormat(nextMonth);

    previousBtn.addEventListener('click', () => {
      [lastSearchParams.year, lastSearchParams.month] = previousMonth.split('-');
      const paramsDetails = validateSearchParams(lastSearchParams);
      console.log(paramsDetails);
      if (paramsDetails.validParams) {
        searchImages(paramsDetails.query, lastSearchParams);
      }
    });

    nextBtn.addEventListener('click', () => {
      [lastSearchParams.year, lastSearchParams.month] = nextMonth.split('-');
      const paramsDetails = validateSearchParams(lastSearchParams);
      console.log(paramsDetails);
      if (paramsDetails.validParams) {
        searchImages(paramsDetails.query, lastSearchParams);
      }
    });
  } else {
    const previousDay = formatDate(getPreviousDay(current));
    const nextDay = formatDate(getNextDay(current));
    previousBtn.querySelector('span').textContent = getDateInStringFormat(previousDay);
    nextBtn.querySelector('span').textContent = getDateInStringFormat(nextDay);

    previousBtn.addEventListener('click', () => {
      lastSearchParams.date = previousDay;
      const paramsDetails = validateSearchParams(lastSearchParams);
      console.log(paramsDetails);
      if (paramsDetails.validParams) {
        searchImage(lastSearchParams.date, lastSearchParams);
      }
    });

    nextBtn.addEventListener('click', () => {
      lastSearchParams.date = nextDay;
      const paramsDetails = validateSearchParams(lastSearchParams);
      console.log(paramsDetails);
      if (paramsDetails.validParams) {
        searchImage(lastSearchParams.date, lastSearchParams);
      }
    });
  }
}

export function showPagination() {
  const paginationTemplate = document.getElementById('pagination-template').content;
  const pagination = document.importNode(paginationTemplate, true);
  document.body.appendChild(pagination);
}

export function hidePagination() {
  const pagination = document.querySelector('.pagination-wrapper');
  if (pagination) pagination.remove();
}