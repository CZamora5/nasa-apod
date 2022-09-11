import { clearMainContent } from './display.js';

export function hideSpinner() {
  const spinner = document.querySelector('.spinner-wrapper');
  if (spinner) spinner.remove();
}

export function showSpinner() {
  clearMainContent();

  const main = document.querySelector('main');
  const spinnerTemplate = document.getElementById('spinner-template').content;
  const spinner = document.importNode(spinnerTemplate, true);
  main.appendChild(spinner);
}

