import { renderBigPicture } from './full-size-picture.js';
import { getData } from './api.js';

getData()
  .then((data) => {
    renderBigPicture(data);
  });
