import { getPicturesByMonth } from './api.js';
import { cropText } from './util.js';

function setMediaElement(card, picture) {
  
  if (picture['media_type'] == 'image') {
    const img = card.querySelector('img');
    img.alt = `Nasa picture of the day ${picture.date}`;
    img.src = picture.url;

    const iframe = card.querySelector('iframe');
    iframe.classList.add('none');
  } else {
    const iframe = card.querySelector('iframe');
    iframe.src = picture.url;

    const img = card.querySelector('img');
    img.classList.add('none');
  }
}

function printPictures(data) {
  const cardTemplate = document.getElementById('card-template').content;
  const gallery = document.getElementById('gallery');
  const fragment = document.createDocumentFragment();

  data.forEach(picture => {
    const card = document.importNode(cardTemplate, true);

    setMediaElement(card, picture);

    const cardTitle = card.querySelector('.card__title');
    cardTitle.textContent = picture.title;
    
    const cardDate = card.querySelector('.card__date');
    cardDate.textContent = picture.date;
    cardDate.setAttribute('datetime', picture.date);
    
    const cardDesc = card.querySelector('.card__desc');
    cardDesc.textContent = cropText(picture.explanation, 50);

    fragment.appendChild(card);
  });
  gallery.appendChild(fragment);
}

async function test() {
  const data = await getPicturesByMonth('2022-07');
  printPictures(data);
}

test();

const hamburgerMenu = document.querySelector('.navbar__menu');

hamburgerMenu.addEventListener('click', evt => {
  evt.currentTarget.classList.toggle('active');
});