import { resetZoom } from './scale.js';
import { resetFilters } from './filters.js';
import { showAlert } from './util.js';

const MAX_TAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_TAGS_MESSAGE = 'Неправильно введены хештеги';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadControl = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadOverlay.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const sendFormButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
};

const disableSendButton = () => pristine.validate()
  ? sendFormButton.removeAttribute('disabled')
  : sendFormButton.setAttribute('disabled', true);

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancelButton.addEventListener('click', closeModal);
  hashtagField.addEventListener('input', disableSendButton);
};

function closeModal () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancelButton.removeEventListener('click', closeModal);
  hashtagField.removeEventListener('input', disableSendButton);
  uploadForm.reset();
  pristine.reset();
  resetZoom();
  resetFilters();
}

const isValidTagsCount = (tags) => tags.length <= MAX_TAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(tags).size;
};

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const validateTags = (value) => {
  const newTags = value
    .replace(/ +/g, ' ').trim()
    .split(' ');
  return isValidTagsCount(newTags) && hasUniqueTags(newTags) && newTags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  ERROR_TAGS_MESSAGE
);

const setFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch((err) => {
          showAlert(err.message);
      });
    }
  });
};

uploadControl.addEventListener('change', () =>
  openModal()
);

export {setFormSubmit, closeModal};
