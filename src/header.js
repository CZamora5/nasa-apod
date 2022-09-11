import { formatNumber } from './util.js';

export function getSearchParams() {
  const filterBy = getSelectedOption('#filter-by');
  const searchBy = getSelectedOption('#search-by');

  if (searchBy === 'month') {
    const month = getSelectedOption('#month');
    const year = getSelectedOption('#year');

    return { filterBy, searchBy, month, year };
  }

  const date = getSelectedOption('#date');
  return { filterBy, searchBy, date };
}

export function validateSearchParams(params) {
  const response = {
    validParams: true,
    errors: {}
  };
  let minDate;

  if (params.searchBy === 'month') {
    if (params.month === '') {
      response.errors.monthMissing = 'Please enter a month';
      response.validParams = false;
    }

    if (!params.year) {
      response.errors.yearMissing = 'Please enter a year';
      response.validParams = false;
    } else if (parseInt(params.year) !== Number(params.year)) {
      response.errors.invalidYear = 'Please enter a valid year';
      response.validParams = false;
    } else {
      minDate = new Date('1995-06');

      params.year = Number(params.year);
      const date = new Date(params.year, params.month - 1);
      response.query = `${formatNumber(params.year, 4)}-${formatNumber(params.month)}`;

      if (date < minDate) {
        response.errors.invalidYear = 'The month can not be before Jun 1995';
        response.validParams = false;
      }

      if (date > new Date()) {
        response.errors.invalidYear = 'The month can not be after the current month';
        response.validParams = false;
      }
    }
  } else {
    minDate = new Date('1995-06-16');
    const date = new Date(params.date);

    if (date < minDate) {
      response.errors.invalidDate = 'The date can not be before Jun 16, 1995';
      response.validParams = false;
    }

    if (date > new Date()) {
      response.errors.invalidDate = 'The date can not be after the current date';
      response.validParams = false;
    }
  }

  return response;
}

export function displayErrorMessages() {
  return;
}

(function deactivateHamburgerMenuWhenSearching(hamburger, selectors) {
  const hamburgerMenu = document.querySelector(hamburger);
  selectors.forEach(({selector, validate}) => {
    const element = document.querySelector(selector);

    element.addEventListener('click', () => {
      if (validate && !validateSearchParams(getSearchParams()).validParams) {
        return;
      }

      if (hamburgerMenu.classList.contains('active')) {
        hamburgerMenu.classList.remove('active');
      }
    });
  });
})('.navbar__menu', [{ selector: '#search-btn', validate: true }, { selector: '#search-btn-random', validate: false }]);

(function activateHamburgerMenu(selector) {
  const hamburgerMenu = document.querySelector(selector);

  hamburgerMenu.addEventListener('click', evt => {
    evt.currentTarget.classList.toggle('active');
  });
})('.navbar__menu');

(function activateSearchBySelect(selector, options) {
  const select = document.querySelector(selector);

  select.addEventListener('change', evt => {
    const value = evt.currentTarget.value;

    Object.entries(options).forEach(([key, elementSelector]) => {
      const element = document.querySelector(elementSelector);

      if (value === key) {
        element.classList.contains('none') && element.classList.remove('none');
      } else {
        !element.classList.contains('none') && element.classList.add('none');
      }
    });
  });
})('#search-by', { month: '.navbar__options__search-inputs-month', day: '.navbar__options__search-inputs-date' });

function getSelectedOption(selector) {
  const select = document.querySelector(selector);
  return select.value;
}