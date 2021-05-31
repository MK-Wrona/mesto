export default class Card {
    constructor({ name, link, likes, owner }, userId, gridTemplate, { handleCardClick, likeCardHandler, deleteCardHandler }, cardId) {
        this._titleCard = name;
        this._linkCard = link;
        this._gridTemplate = gridTemplate;
        this._cardId = cardId;
        this._countLikes = likes;
        this._userId = userId;
        this._ownerId = owner._id;

        // declare handlers
        this._handleCardClick = handleCardClick;
        this._likeCardHandler = likeCardHandler;
        this._deleteCardHandler = deleteCardHandler;

    }


    _setEventListeners() {
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._titleCard, this._linkCard);
        })
        this._deleteIcon.addEventListener('click', () => {
            this._deleteCardHandler();
        })
        this._likeButton.addEventListener('click', () => {
            this._likeCardHandler();
        })
    }

    //!//

    generateCard() {
        this._template = document.querySelector(".grid-template").content.querySelector('.grid__wrap').cloneNode(true);
        //this._template = document.querySelector(this._cardTemplateSelector).content.cloneNode(true);
        this._sight = this._template.cloneNode(true);
        this._likeButton = this._sight.querySelector('.grid__like-button');
        this._image = this._sight.querySelector('.grid__pic');
        this._deleteIcon = this._sight.querySelector('.grid__delete');
        if (this._ownerId !== this._userId) {
            this._deleteIcon.remove();
        }
        this._likes = this._sight.querySelector('.grid__like-counter');
        // содержимое
        this._image.src = this._linkCard;
        this._image.alt = this._titleCard;
        this._sight.querySelector('.grid__description').textContent = this._titleCard;
        this.renderLikes();

        this._setEventListeners();

        return this._sight;
    }


    getIdCard() {
        return this._cardId;
    }

    // лайкнул ли юзер?
    likedCard() {
        return this._countLikes.some(like => {
            return like._id === this._userId;
        });
    }

    // отрисовка
    renderLikes() {
        this._likes.textContent = this._countLikes.length;
        this.showLikes(this._userId)
    }

    // тоггл лайк
    showLikes() {
        if (this.likedCard(this._userId)) {
            this._likeButton.classList.add('grid__like-button_is-liked');
        } else {
            this._likeButton.classList.remove('grid__like-button_is-liked');
        }
    }


    setLikes(listLikes) {
        this._countLikes = listLikes;
    }

    // Удалить
    deleteCard() {
        this._deleteIcon.closest('.grid__wrap').remove();
    }



}
