import {getRandomArrayElement, createIdGenerator, shuffleArray, createRandomId} from './util.js';

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
const LikesCount = {
  MIN: 15,
  MAX: 200,
};
const AvatarCount = {
  MIN: 1,
  MAX: 6,
};

const likeValues = shuffleArray(Array.from({length: LikesCount.MAX - LikesCount.MIN + 1}, (_, index) => index + LikesCount.MIN));
const avatarValues = shuffleArray(Array.from({length: AvatarCount.MAX - AvatarCount.MIN + 1}, (_, index) => index + AvatarCount.MIN));

const generateCommentId = createIdGenerator();
const generatePhotoId = createIdGenerator();
const generateImageId = createIdGenerator();
const generateLikeValue = createRandomId(likeValues);
const generateAvatarValue = createRandomId(avatarValues);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${generateAvatarValue()}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateImageId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: generateLikeValue(),
  comments: Array.from({ length: SIMILAR_COMMENT_COUNT }, createComment),
});

const createPhotos = () => Array.from({ length: SIMILAR_PHOTO_COUNT }, createPhoto);
const thumbnailsList = createPhotos();

export {thumbnailsList};
