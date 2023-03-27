import {renderThumbnails} from './data.js';
import {showBigPicture} from './full-size-picture.js';

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const similarThumbnails = document.createDocumentFragment();

renderThumbnails.forEach(({url, comments, likes, description}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__img').alt = description;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(url, likes, comments, description);
  });
  similarThumbnails.append(thumbnailElement);
});

thumbnailsContainer.append(similarThumbnails);
