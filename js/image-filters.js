import { showPhotos } from './full-size-picture.js';
import { debounce, shuffleArray } from './util.js';

const RANDOM_IMAGE_COUNT = 10;
const TIMEOUT_DELAY = 500;

const imageFiltersForm = document.querySelector('.img-filters__form');
const imageFilterDefault = imageFiltersForm.querySelector('#filter-default');
const imageFilterRandom = imageFiltersForm.querySelector('#filter-random');
const imageFilterDiscussed = imageFiltersForm.querySelector('#filter-discussed');

const compareComments = (a, b) => b.comments.length - a.comments.length;

let currentFilter = imageFilterDefault;

const getFilteredImages = (photos) => {
  switch (currentFilter) {
    case imageFilterDefault:
      return photos;
    case imageFilterRandom:
      return shuffleArray(photos.slice()).slice(0, RANDOM_IMAGE_COUNT);
    case imageFilterDiscussed:
      return photos.slice().sort(compareComments);

    default: return photos;
  }
};

const onFilterButtonClick = (evt, photos) => {
  const images = document.querySelectorAll('.picture');
  currentFilter.classList.remove('img-filters__button--active');
  currentFilter = evt.target;
  currentFilter.classList.add('img-filters__button--active');
  images.forEach((image) => {
    image.remove();
  });
  showPhotos(getFilteredImages(photos));
};

const changeFilter = (photos) => {
  imageFiltersForm.addEventListener('click', debounce((evt) => {
    onFilterButtonClick(evt, photos);
  }, TIMEOUT_DELAY));
};

export {changeFilter};
