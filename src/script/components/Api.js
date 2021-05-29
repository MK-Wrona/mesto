export default class Api {
    constructor({ adress, headers }) {
            this._adress = adress;
            this._headers = headers;
        }
        // возьми сет карточек сервака
    getInitialCards() {
        return fetch(`${this._adress}/cards`, { headers: this._headers })
            .then(response => this._checkRequestResult(response))
            .catch(error => this._errorHandler(error));
    }
    _errorHandler(error) {
        console.log(error);
    }
    _checkRequestResult(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Упс, возникла ошибка: ${response.status}`);
    }

}
