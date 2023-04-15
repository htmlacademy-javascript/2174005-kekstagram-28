import {onModalClose, onDocumentKeydown} from './form.js';

const ALERT_SHOW_TIME = 5000;

const bodyElement = document.body;
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const newSuccessMessageElement = successMessageTemplateElement.cloneNode(true);
const successButtonElement = newSuccessMessageElement.querySelector('.success__button');

const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const newErrorMessageElement = errorMessageTemplateElement.cloneNode(true);
const errorButtonElement = newErrorMessageElement.querySelector('.error__button');

const onSuccessButtonClose = () => {
  newSuccessMessageElement.classList.add('hidden');
  onModalClose();
};

const showSuccessMessage = () => {
  bodyElement.append(newSuccessMessageElement);

  newSuccessMessageElement.classList.remove('hidden');
  successButtonElement.addEventListener('click', onSuccessButtonClose);
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
  newErrorMessageElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentErrorKeydown);
  document.removeEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

const showErrorMessage = () => {
  bodyElement.append(newErrorMessageElement); // если вынести в глобальную область видимости, то плашка с сообщением об ошибке появляется в центре

  newErrorMessageElement.classList.remove('hidden');
  errorButtonElement.addEventListener('click', onErrorButtonClose);
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
