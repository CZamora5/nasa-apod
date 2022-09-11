import { getPictureByDate, getPicturesByMonth } from './api.js';
import { cropText } from './util.js';

function clearMainContent() {
  const main = document.querySelector('main');
  main.innerHTML = '';
}

function setDisplayMode(singleImage = false) {
  clearMainContent();

  if (!singleImage) {
    const main = document.querySelector('main');

    const gallery = document.createElement('div');
    gallery.classList.add('grid');
    gallery.setAttribute('id', 'gallery');

    main.appendChild(gallery);
  }
}

function setMediaElement(card, picture) {
  const cardElement = card.querySelector('.card');
  const img = card.querySelector('img');

  if (picture['media_type'] == 'image') {
    img.alt = `Nasa picture of the day ${picture.date}`;
    img.src = picture.url;
  } else {
    const iframe = document.createElement('iframe');
    iframe.classList.add('card__img');
    iframe.src = picture.url;
    cardElement.replaceChild(iframe, img);
  }
}

function setCopyright(card, picture) {
  const cardContent = card.querySelector('.card__content');
  const cardBtn = cardContent.querySelector('.card__btn');
  cardContent.removeChild(cardBtn);

  if (picture.copyright) {
    const span = document.createElement('span');
    span.textContent = `Copyright: ${picture.copyright}`;
    span.classList.add('card__copyright');

    cardContent.appendChild(span);
  }
}

function generatePreviewCard(cardTemplate, picture, verbose = false) {
  const card = document.importNode(cardTemplate, true);

  setMediaElement(card, picture);

  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = picture.title;

  const cardDate = card.querySelector('.card__date');
  cardDate.textContent = picture.date;
  cardDate.setAttribute('datetime', picture.date);

  const cardDesc = card.querySelector('.card__desc');
  cardDesc.textContent = verbose ? picture.explanation : cropText(picture.explanation, 50);

  if (verbose) {
    card.querySelector('.card').classList.add('verbose');
    setCopyright(card, picture);
  } else {
    const cardBtn = card.querySelector('.card__btn');
    cardBtn.setAttribute('data-date', picture.date);
  }

  return card;
}

function printPictures(data) {
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

function printPicture(picture) {
  setDisplayMode(true);
  const cardTemplate = document.getElementById('card-template').content;
  const main = document.querySelector('main');

  const card = generatePreviewCard(cardTemplate, picture, true);
  main.appendChild(card);
}

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