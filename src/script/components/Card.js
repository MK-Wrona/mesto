export default class Card {
    constructor({ name, link }, gridTemplate, handleCardClick) {
        this._text = name;
        this._link = link;
        this._gridTemplate = gridTemplate;
        this._handleCardClick = handleCardClick;

    }
    _handlePreviewPicture() {
        fullPopUpImage.src = this.src;
        fullPopUpImage.alt = this.alt;
        fullPopUpImageTitle.textContent = this.alt;
    }

    _handleLikeIcon() {
        this.classList.toggle('grid__like-button_is-liked');
    }





    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLikeIcon);
        this._deleteIcon.addEventListener('click', this._handleDeleteCard);
        this._image.addEventListener('click', () => this._handleCardClick(this._text, this._link));
    }

    _getTemplate() {
        this._template = document.querySelector(".grid-template").content.querySelector('.grid__wrap').cloneNode(true);
        //this._template = document.querySelector(this._cardTemplateSelector).content.cloneNode(true);
        console.log(this._template); //-  не возвращает темплейт
        return this._template;
    }

    getCard() {
        this._sight = this._getTemplate();
        this._likeButton = this._sight.querySelector('.grid__like-button');
        this._image = this._sight.querySelector('.grid__pic');
        this._deleteIcon = this._sight.querySelector('.grid__delete');
        this._image.src = this._link;
        this._image.alt = this._text;
        this._sight.querySelector('.grid__description').textContent = this._text;
        this._setEventListeners();
        //console.log(this._sight); - возвращает темплейт
        return this._sight;


    }
    _handleDeleteCard = () => {
        this._sight.remove() //- undefined
    }


}
