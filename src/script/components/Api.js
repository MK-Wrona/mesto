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
        // если что-то не так (все)
    _errorHandler(error) {
        console.log(error);
    }
    _checkRequestResult(response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Упс, возникла ошибка: ${response.status}`);
        }
        //получи данные пользователя с сервера
    getUserInfo() {
        return fetch(`${this._adress}/users/me`, { headers: this._headers })
            .then(response => this._checkRequestResult(response))
            .catch(error => this._errorHandler(error));
    }

    // Отредактировать данные пользователя
    editUserInfo(name, profession) {
        return fetch(`${this._adress}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: profession
                })
            })
            .then(response => this._checkRequestResult(response))
            .catch(error => this._errorHandler(error));
    }

    // добавь карточку на сервак
    plusCard(name, link) {
        return fetch(`${this._adress}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(response => this._checkRequestResult(response))
            .catch(error => this._errorHandler(error));
    }

}
