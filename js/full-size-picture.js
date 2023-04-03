import {isEscapeKey} from './util.js';

const COMMENTS_PER_PORTION = 5;

const body = document.querySelector('body');
const thumbnailsContainer = document.querySelector('.pictures');
const bigPictureContainer = document.querySelector('.big-picture');
const bigImage = bigPictureContainer.querySelector('.big-picture__img img');
const bigImageLikesCount = bigPictureContainer.querySelector('.likes-count');
const bigImageCaption = bigPictureContainer.querySelector('.social__caption');
const bigImageCancel = bigPictureContainer.querySelector('.big-picture__cancel');

const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const commentItem = commentsContainer.querySelector('.social__comment');
const commentsCount = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');

let commentsShown = 0;
let comments = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const openUserModal = () => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUserModal () {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsShown = 0;
  document.removeEventListener('keydown', onDocumentKeydown);
}

const showComment = ({ avatar, name, message }) => {
  const newComment = commentItem.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
};

const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = showComment(comments[i]);
    fragment.append(commentElement);
  }

  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
  commentsCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

function onCommentsLoaderClick () {
  renderComments();
}

const showBigPicture = ({url, likes, description}) => {
  openUserModal();
  bigImage.src = url;
  bigImageLikesCount.textContent = likes;
  bigImageCaption.textContent = description;
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

const renderBigPicture = (data) => {
  thumbnailsContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();

    const picture = data.find(
      (item) => item.id === +(thumbnail.dataset.thumbnailId)
    );

    comments = Array.from(picture.comments);
    renderComments(comments);
    showBigPicture(picture);
  });
};

bigImageCancel.addEventListener('click', () =>
  closeUserModal()
);

export {renderBigPicture};
