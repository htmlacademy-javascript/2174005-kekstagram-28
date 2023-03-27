const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let i = 0;

  return function () {
    i += 1;
    return i;
  };
};

const shuffleArray = (array) => {
  let j, temp;
  for (let i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

const createRandomId = (array) => {
  let i = 0;
  const arrayCount = array.length - 1;
  return function () {
    if (i === arrayCount) {
      i = 0;
    } else {
      i += 1;
    }
    return array[i];
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomArrayElement, createIdGenerator, shuffleArray, createRandomId, isEscapeKey};
