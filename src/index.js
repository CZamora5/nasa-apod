import { getPicturesByMonth } from './api.js';
import { cropText } from './util.js';

function printPictures(data) {
  const cardTemplate = document.getElementById('card-template').content;
  const gallery = document.getElementById('gallery');
  const fragment = document.createDocumentFragment();

  data.forEach(picture => {
    const card = document.importNode(cardTemplate, true);

    // const cardImg = card.querySelector('.card__img');
    // cardImg.style.backgroundImage = `url(${picture.url})`;
    const cardImg = card.querySelector('.card__img');
    cardImg.src = picture.url;
    cardImg.alt = `Nasa picture of the day ${picture.date}`;

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