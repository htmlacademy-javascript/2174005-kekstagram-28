import {onModalClose, onDocumentKeydown} from './form.js';

const ALERT_SHOW_TIME = 5000;

const bodyElement = document.body;
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const newSuccessMessage = successMessageTemplate.cloneNode(true);
const successButton = newSuccessMessage.querySelector('.success__button');

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const newErrorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = newErrorMessage.querySelector('.error__button');

const onSuccessButtonClose = () => {
  document.querySelector('.success').classList.add('hidden');
  onModalClose();
};

const showSuccessMessage = () => {
  bodyElement.append(newSuccessMessage);

  document.querySelector('.success').classList.remove('hidden');
  successButton.addEventListener('click', onSuccessButtonClose);
};

const onDocumentErrorKeydown = (evt) => {
  if(evt.key === 'Escape'){
    onErrorButtonClose();
  }
};

const onDocumentClick = (evt) => {
  if(evt.target.classList.contains('error')){
    onErrorButtonClose();
  }
};

function onErrorButtonClose () {
  document.querySelector('.error').classList.add('hidden');
  errorButton.removeEventListener('click', onErrorButtonClose);
  document.removeEventListener('keydown', onDocumentErrorKeydown);
  document.removeEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

const showErrorMessage = () => {
  bodyElement.append(newErrorMessage);

  document.querySelector('.error').classList.remove('hidden');
  errorButton.addEventListener('click', onErrorButtonClose);
  document.addEventListener('keydown', onDocumentErrorKeydown);
  document.addEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.Element.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showSuccessMessage, showErrorMessage, showAlert};
