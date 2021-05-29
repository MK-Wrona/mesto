import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, closeButtonSelector, submitHandler) {
        super(popupSelector, closeButtonSelector)
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.pop-up__form');
    }

    _getInputValues() {
        this._values = {};
        this._form.querySelectorAll('.pop-up__input').forEach(item => {
            this._values[item.name] = item.value;
        });
        return this._values;
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (event) => {
            this._submitHandler(this._getInputValues());
        });
    }

    close() {
        this._form.reset() // очищение поля формы для след. добавления
        super.close()
    }

}
