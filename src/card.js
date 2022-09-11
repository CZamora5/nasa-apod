import { cropText, cleanText } from './util.js';

export function generatePreviewCard(cardTemplate, picture, verbose = false) {
  const card = document.importNode(cardTemplate, true);

  setMediaElement(card, picture);

  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = picture.title;

  const cardDate = card.querySelector('.card__date');
  cardDate.textContent = picture.date;
  cardDate.setAttribute('datetime', picture.date);

  const cardDesc = card.querySelector('.card__desc');
  const text = verbose ? picture.explanation : cropText(picture.explanation, 50);
  if (text!== cleanText(text, 'digg_url')) console.log(picture.explanation);
  cardDesc.textContent =  cleanText(text, 'digg_url');

  if (verbose) {
    card.querySelector('.card').classList.add('verbose');
    setCopyright(card, picture);
  } else {
    const cardBtn = card.querySelector('.card__btn');
    cardBtn.setAttribute('data-date', picture.date);
  }

  return card;
}

function setMediaElement(card, picture) {
  const cardElement = card.querySelector('.card');
  const img = card.querySelector('img');

  if (picture['media_type'] === 'image') {
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