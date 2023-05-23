// Add imports above this line
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';
// Change code below this line
// console.log(SimpleLightbox);
// console.log(galleryItems);

const galleryUl = document.querySelector('.gallery');

const arrayImg = [];

const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item"><a href="${original}" class="gallery__link"><img class="gallery__image" src="${preview}" alt="${description}"></a></li>`
  )
  .join('');

arrayImg.push(markup);

console.log(markup);

galleryUl.insertAdjacentHTML('beforeend', arrayImg);

const lightbox = new SimpleLightbox('.gallery__link', {
  captionsData: 'alt',
  captionDelay: 250,
});
