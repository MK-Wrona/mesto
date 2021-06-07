import FormValidator from "./script/components/FormValidator.js";
import { validityConfigSet } from "./script/utiles/validityConfigSet.js";
import Card from './script/components/Card.js';
import Popup from "./script/components/Popup.js"
import PopupWithImage from "./script/components/PopupWithImage.js"
import PopupWithForm from "./script/components/PopupWithForm.js"
import Section from "./script/components/Section.js"
import UserInfo from "./script/components/UserInfo.js"
import PopupWithConfirm from "./script/components/PopupWithConfirm.js"
import Api from "./script/components/Api.js"
import {
    popUpOpenButton,
    profilePopUpForm,
    popUpUserName,
    popUpUserProf,
    fullPopUpSelector,
    popUpAddBtn,
    list,
    formAdd,
    profileSelectors,
    fullPopUpImageSelector,
    fullPopUpTitleSelector,
    popUpClsBtnSelector,
    profPopUpSelector,
    popUpAddSelector,
    avatarIcon,
    avatarButton,
    avatarEditPopup,
    avatarPopupForm,
    gridCardTemplateId,
    popupConfirm
} from "./script/utiles/constants.js"

import './pages/index.css';

const api = new Api({
    adress: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
        authorization: 'bc8d3de0-e753-4646-a5ba-26caab7d3e1d',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(values => {
        const [userData, cardsData] = values;
        userId = userData._id;
        userInfo.setUserInfo({
            name: userData.name,
            profession: userData.about,
            avatar: userData.src
        });
        avatarIcon.src = userData.avatar;
        generateInitialCards(cardsData)
    })
    .catch(error => api._errorHandler(error));


const userInfo = new UserInfo(profileSelectors);
popUpOpenButton.addEventListener('click', function() {
    popupEditProfile.open();
    const newInfo = userInfo.getUserInfo();
    popUpUserName.value = newInfo.name;
    popUpUserProf.value = newInfo.profession;


});
const submitProfileForm = (data) => {
    popupEditProfile.waitSubmitButton('Сохранение...');
    api.editUserInfo(data.name, data.prof)
        .then(() => {
            userInfo.setUserInfo({
                name: data.name,
                profession: data.prof
            });
            popupEditProfile.close();
        })
        .catch(error => api._errorHandler(error))
        .finally(() => {
            popupEditProfile.resetWaitSubmitButton();

        })
}

let userId;
let cardsList;

function createCard(item) {
    const card = new Card(item, userId, gridCardTemplateId, {
        handleCardClick: (name, link) => {
            popupWithImage.open(name, link);
        },
        likeCardHandler: () => {
            const likedCard = card.likedCard();
            const resultApi = likedCard ? api.unlikeCard(card.getIdCard()) : api.likeCard(card.getIdCard());

            resultApi.then(data => {
                    card.setLikes(data.likes)
                    card.renderLikes();
                })
                .catch(error => api._errorHandler(error))
        },
        deleteCardHandler: () => {
            popupSubmitDel.open(card);
        }
    }, item._id);
    return card.generateCard();
}
//генерация начального сета карточек
const generateInitialCards = (cards) => {
        cardsList = new Section({
            items: cards,
            renderer: (item) => {
                const card = createCard(item);
                cardsList.appendItem(card);
            }
        }, list);
        cardsList.renderItems();
    }
    // добавление карточек
const formSubmitAddHandler = (data) => { //в добавлении слушателей в классе формы вызывается getInputValues для всех форм, оттуда берем
    popupAddCard.waitSubmitButton('Сохранение...');
    const titleCard = data.title; //чтение
    const linkCard = data.link;
    api.plusCard(titleCard, linkCard)
        .then(dataCard => {
            const card = createCard(dataCard);
            cardsList.addItem(card);
            card;
            popupAddCard.close();
        })
        .catch(error => api._errorHandler(error))
        .finally(() => {
            formAdd.reset();

        })

}

const popupWithImage = new PopupWithImage(fullPopUpSelector, popUpClsBtnSelector, fullPopUpImageSelector, fullPopUpTitleSelector);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.open(name, link);

}

const popupEditProfile = new PopupWithForm(profPopUpSelector, popUpClsBtnSelector, submitProfileForm)
popupEditProfile.setEventListeners();

popUpOpenButton.addEventListener("click", function() {
    popupEditProfile.open();

});

const popupAddCard = new PopupWithForm(popUpAddSelector, popUpClsBtnSelector, formSubmitAddHandler)
popupAddCard.setEventListeners();

popUpAddBtn.addEventListener("click", function() {
    popupAddCard.open();
    popupAddCard.resetWaitSubmitButton();

});

const editFormValidator = new FormValidator(validityConfigSet, profilePopUpForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validityConfigSet, formAdd);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validityConfigSet, avatarPopupForm);
avatarFormValidator.enableValidation();
//редактирование аватара

const formEditAvatarSubmitHandler = (data) => {

    popupEditAvatar.waitSubmitButton('Сохранение...');
    api.editUserAvatar(data.link)
        .then(() => {
            userInfo.setUserAvatar({
                avatar: data.link
            });
            popupEditAvatar.close();
        })
        .catch(error => api._errorHandler(error))
        .finally(() => {

            avatarPopupForm.reset();

        })
}

const popupEditAvatar = new PopupWithForm(avatarEditPopup, popUpClsBtnSelector,
    formEditAvatarSubmitHandler);
popupEditAvatar.setEventListeners();

avatarButton.addEventListener('click', function() {
    popupEditAvatar.open();
    popupEditAvatar.resetWaitSubmitButton();

});

const formDeleteSubmitHandler = (event, card) => {
    event.preventDefault();
    popupSubmitDel.waitSubmitButton('Удаление...');
    api.deleteCard(card.getIdCard())
        .then(() => {
            card.deleteCard();
            popupSubmitDel.close();
        })
        .catch(error => api._errorHandler(error))
        .finally(() => {
            popupSubmitDel.resetWaitSubmitButton();

        })
}

// модалка удаления
const popupSubmitDel = new PopupWithConfirm(popupConfirm, popUpClsBtnSelector,
    (evt, card) => {
        formDeleteSubmitHandler(evt, card)
    }
)
popupSubmitDel.setEventListeners();
