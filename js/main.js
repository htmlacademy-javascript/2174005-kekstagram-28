import './data.js';
import './form.js';
import './full-size-picture.js';
import { closeModal, setFormSubmit } from './form.js';
import { renderPhotos } from './thumbnail.js';
import { showAlert } from './util.js';

getData()
.then((data) => {
  renderPhotos(data);
})
.catch(
  (err) => {
    showAlert(err.message);
  }
);

setFormSubmit(closeModal);
