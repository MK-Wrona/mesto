export default class UserInfo {
    constructor({ profNameSelector, profProfSelector, avatarSelector }) {
        this._userName = document.querySelector(profNameSelector);
        this._userProfession = document.querySelector(profProfSelector);
        this._userAvatar = document.querySelector(avatarSelector)
    }

    getUserInfo() {
        const userSet = {
            name: this._userName.textContent,
            profession: this._userProfession.textContent,
            avatar: this._userAvatar.src
        }

        return userSet;
    }

    setUserInfo({ name, profession }) {
        if (name) {
            this._userName.textContent = name;
        }
        if (profession) {
            this._userProfession.textContent = profession;
        } else {
            //  останется старый вариант
        }
    }
    setUserAvatar({ avatar }) {
        if (avatar) {
            this._userAvatar.src = avatar;
        } else {

        }
    }
}
