import { renderBigPicture } from './full-size-picture.js';
import { getData } from './api.js';
import { changeFilter } from './image-filters.js';

getData()
  .then((data) => {
    renderBigPicture(data);
    changeFilter(data);
  });
