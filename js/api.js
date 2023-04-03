const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const DATA_URL = '/data';
const ERROR_TEXT = 'Не удалось загрузить данные. Попробуйте обновить страницу';

const getData = () =>
  fetch(`${BASE_URL}${DATA_URL}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(ERROR_TEXT);
    });

const sendData = (onSuccess, onFail, body) => {
  fetch(`${BASE_URL}`, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if(!response.ok){
        throw new Error();
      }
      onSuccess();
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
