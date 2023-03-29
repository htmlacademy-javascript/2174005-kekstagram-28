import {isEscapeKey} from './util.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadControl = uploadForm.querySelector('#upload-file'); // контрол загрузки файла
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay'); // форма редактирования изображения
const uploadCancelButton = uploadOverlay.querySelector('.img-upload__cancel'); // кнопка закрытия формы редактирования
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
};

function openModal () {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeModal () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
  pristine.reset();
}

uploadControl.addEventListener('change', () =>
  openModal()
);

uploadCancelButton.addEventListener('click', () =>
  closeModal()
);
