import { resetZoom } from './scale.js';
import { resetFilters } from './filters.js';
import { sendData } from './api.js';
import { showSuccessMessage } from './messages.js';

const MAX_TAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_TAGS_MESSAGE = 'Неправильно введены хештеги';

const body = document.body;
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadControlElement = uploadFormElement.querySelector('#upload-file');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = uploadOverlayElement.querySelector('.img-upload__cancel');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const sendFormButtonElement = document.querySelector('.img-upload__submit');
const SendFormButtonTextElement = {
  STAND_BY: 'Опубликовать',
  SENDING: 'Сохраняю'
};

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagFieldElement ||
  document.activeElement === commentFieldElement;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    onModalClose();
  }
};

const checkSendButtonDisable = (disabled = false) => {
  sendFormButtonElement.disabled = disabled;
  sendFormButtonElement.textContent = disabled ? SendFormButtonTextElement.SENDING : SendFormButtonTextElement.STAND_BY;
};

const openModal = () => {
  uploadOverlayElement.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancelButtonElement.addEventListener('click', onModalClose);
};

function onModalClose () {
  uploadOverlayElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFormElement.reset();
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
  hashtagFieldElement,
  validateTags,
  ERROR_TAGS_MESSAGE
);


uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    checkSendButtonDisable(true);
    sendData(new FormData(evt.target))
      .then(() => {
        showSuccessMessage();
      })
      .finally(checkSendButtonDisable);
  }
});

uploadControlElement.addEventListener('change', () =>
  openModal()
);

export {onDocumentKeydown, onModalClose};
