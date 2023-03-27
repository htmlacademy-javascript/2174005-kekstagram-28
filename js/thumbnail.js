import {thumbnailsList} from './data.js';

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const similarThumbnails = document.createDocumentFragment();

thumbnailsList.forEach(({url, comments, likes, description, id}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__img').alt = description;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.dataset.thumbnailId = id;

  similarThumbnails.append(thumbnailElement);
});

thumbnailsContainer.append(similarThumbnails);
