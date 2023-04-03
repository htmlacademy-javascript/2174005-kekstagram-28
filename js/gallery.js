import { closeModal, setFormSubmit } from './form.js';
import { renderPhotos } from './thumbnail.js';
import { renderBigPicture } from './full-size-picture.js';
import { showAlert } from './util.js';
import { getData } from './api.js';

getData()
  .then((data) => {
    renderPhotos(data);
    renderBigPicture(data);
  })
  .catch((err) => {
    showAlert(err.message);
  });

setFormSubmit(closeModal);
