import {createPhotos} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const thumbnails = createPhotos();

const similarThumbnail = document.createDocumentFragment();

thumbnails.forEach(({url, comments, likes}) => {
  const thumbnailElement = pictureTemplate.cloneNode(true);
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__comments').textContent = comments;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  similarThumbnail.appendChild(thumbnailElement);
});

picturesContainer.appendChild(similarThumbnail);
