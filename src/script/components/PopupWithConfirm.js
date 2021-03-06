import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, closeButtonSelector, submitFormHandler) {
        super(popupSelector, closeButtonSelector);
        this._submitFormHandler = submitFormHandler;
        this.waitSubmitButton = this.waitSubmitButton.bind(this);
        this._popupForm = this._popup.querySelector('.pop-up__form');
        this._popupSubmitButton = this._popupForm.querySelector('.pop-up__submit-button');
        this._defaultSubmitButtonText = this._popupSubmitButton.textContent;
    }

    waitSubmitButton(waitingText) {
        this._popupSubmitButton.textContent = waitingText;
    }

    resetWaitSubmitButton() {
        this._popupSubmitButton.textContent = this._defaultSubmitButtonText;
    }

    setEventListeners() {
        super.setEventListeners()
        this._popupForm.addEventListener('submit', (event) => {
            this._submitFormHandler(event, this._parametr);

        });

    }

    open(parametr) {
        this._parametr = parametr;
        this._popupForm.reset();
        super.open();
    }
}
