import { generatePreviewCard } from './card.js';

export function clearMainContent() {
  const main = document.querySelector('main');
  main.innerHTML = '';
}

export function printPictures(data) {
  setDisplayMode();

  const cardTemplate = document.getElementById('card-template').content;
  const gallery = document.getElementById('gallery');
  const fragment = document.createDocumentFragment();

  data.forEach(picture => {
    const card = generatePreviewCard(cardTemplate, picture);
    fragment.appendChild(card);
  });
  gallery.appendChild(fragment);
}

export function printPicture(picture) {
  setDisplayMode(true);

  const cardTemplate = document.getElementById('card-template').content;
  const main = document.querySelector('main');

  const card = generatePreviewCard(cardTemplate, picture, true);
  main.appendChild(card);
}

function setDisplayMode(singleImage = false) {
  clearMainContent();

  if (!singleImage) {
    const main = document.querySelector('main');
    createGallery(main);
  }
}

function createGallery(parent) {
  const gallery = document.createElement('div');
  gallery.classList.add('grid');
  gallery.setAttribute('id', 'gallery');

  parent.appendChild(gallery);
}