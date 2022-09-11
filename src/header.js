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

export function getFilterByOption(selector) {
  const select = document.querySelector(selector);
  return select.value;
}


