import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, closeButtonSelector, fullPopUpImageSelector, fullPopUpTitleSelector) {
        super(popupSelector, closeButtonSelector);
        this._image = this._popup.querySelector(fullPopUpImageSelector);
        this._title = this._popup.querySelector(fullPopUpTitleSelector);
    }

    open(name, link) {
        this._image.alt = name;
        this._title.textContent = name;
        this._image.src = link;
        super.open();
    }
}
