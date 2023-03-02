const DESCRIPTIONS = [
  'Лучшее фото в моей жизни!',
  'Это прекрасно!',
  'Лепота-то какая!',
  'Мне нравится',
  'Думаю, красиво',
  'Очень хорошо сегодня',
  'Чудесный был день!',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Игорь',
  'Ян',
  'Роберт',
  'Юрий',
  'Аркадий',
  'Лена',
  'Татьяна',
  'Илья',
  'Фёдор',
];

const SIMILAR_PHOTO_COUNT = 25;
const SIMILAR_COMMENT_COUNT = 3;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generateCommentId = createRandomId(1, 1000);
const generatePhotoId = createRandomId(1, 25);
const generateImageId = createRandomId(1, 25);
const generateLikesQuantity = createRandomId(15, 200);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateImageId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: generateLikesQuantity(),
  comments: Array.from({ length: SIMILAR_COMMENT_COUNT }, createComment),
});

const similarPhotos = Array.from({ length: SIMILAR_PHOTO_COUNT }, createPhoto); /* eslint no-unused-vars: "off" */
