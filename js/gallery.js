import { renderBigPicture } from './full-size-picture.js';
import { showAlert } from './util.js';
import { getData } from './api.js';

getData()
  .then((data) => {
    renderBigPicture(data);
  })
  .catch((err) => {
    showAlert(err.message);
  });
