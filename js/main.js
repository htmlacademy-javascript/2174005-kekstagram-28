import './form.js';
import './image-preview.js';
import { showPhotos } from './full-size-picture.js';
import { getData } from './api.js';
import { changeFilter } from './image-filters.js';

getData()
  .then((data) => {
    showPhotos(data);
    changeFilter(data);
  });
