import { validityConfigSet } from "../utiles/validityConfigSet.js"
export default class FormValidator {
    constructor(validityConfigSet, form) {
        this._settings = validityConfigSet;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    }

    _showInputError = (inputElement, errorMessage, validityConfigSet) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement, validityConfigSet) {
        const isInputNotValid = !inputElement.validity.valid;
        if (isInputNotValid) {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(inputElement, errorMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputSelector) => {
            return !inputSelector.validity.valid;
        });
    }
    deactivateButton = (inactiveButtonClass) => {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._settings.inactiveButtonClass);

    };

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this.deactivateButton(this._settings.inactiveButtonClass)
        } else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
        }

    }

    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        this._toggleButtonState(inputList, this._buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, this._buttonElement);
            });
        });
        this._form.addEventListener('reset', () => {
            this.deactivateButton(this._buttonElement);
            inputList.forEach((inputElement) => {
                this._hideInputError(inputElement);
            })
        });
    };

    enableValidation(validityConfigSet) {
        this._setEventListeners();
    };

};
