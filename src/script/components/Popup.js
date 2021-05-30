import { escKeyCode } from "../utiles/constants.js"
export default class Popup {
    constructor(popupSelector, closeButtonSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector(closeButtonSelector);
        //this._popupForm = this._popup.querySelector('.pop-up__form');
        //this._popupSubmitButton = this._popupForm.querySelector('.pop-up__submit-button');

        this._handlerEscClose = this._handlerEscClose.bind(this);
        this._handlerClickOverlay = this._handlerClickOverlay.bind(this); // можно через стрелочную
    }

    _handlerEscClose(event) {
        if (event.keyCode === escKeyCode) {
            this.close();
        }
    }

    _handlerClickOverlay(event) {
        if (event.target !== this._popup) return;
        this.close();
    }

    open() {
        this._popup.classList.add('pop-up_opened');
        document.addEventListener('keydown', this._handlerEscClose);
        document.addEventListener('mousedown', this._handlerClickOverlay); //навешиваем и убираем для закрытия - открытия оверлей и еск
    }

    close = () => {
        this._popup.classList.remove('pop-up_opened');
        document.removeEventListener('keydown', this._handlerEscClose);
        document.removeEventListener('mousedown', this._handlerClickOverlay);
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        })

    }
}
