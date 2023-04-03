const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const DATA_URL = '/data';
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(route, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(`${BASE_URL}${DATA_URL}`, ErrorText.GET_DATA);

const sendData = (body) => load(BASE_URL, ErrorText.SEND_DATA, Method.POST, body);

export {getData, sendData};
