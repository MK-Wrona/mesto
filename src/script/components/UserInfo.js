export default class UserInfo {
    constructor({ profNameSelector, profProfSelector }) {
        this._userName = document.querySelector(profNameSelector);
        this._userProfession = document.querySelector(profProfSelector);
    }

    getUserInfo() {
        const userSet = {
            name: this._userName.textContent,
            profession: this._userProfession.textContent
        }

        return userSet;
    }

    setUserInfo({ name, profession }) {
        this._userName.textContent = name;
        this._userProfession.textContent = profession;
    }
}
