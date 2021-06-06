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
    profilePopUp,
    popUpOpenButton,
    profilePopUpCloseButton,
    popUpDefaultName,
    popUpDefaultProf,
    profilePopUpForm,
    popUpUserName,
    popUpUserProf,
    fullPopUpSelector,
    popUpAdd,
    popUpAddBtn,
    popUpAddClsBtn,
    commonPopUp,
    list,
    formAdd,
    popUpImageTitleInput,
    popUpImageLinkInput,
    gridTemplate,
    fullPopUp,
    fullPopUpImage,
    fullPopUpImageTitle,
    fullPopUpClose,
    submitButtonAddPopUp,
    profileSelectors,
    fullPopUpImageSelector,
    fullPopUpTitleSelector,
    popUpClsBtnSelector,
    profPopUpSelector,
    popUpAddSelector,
    popUpOpenButtonSelector,
    popUpAddBtnSelector,
    gridTemplateSelector,
    avatarIcon,
    avatarButton,
    avatarEditPopup,
    avatarPopupForm,
    avatarPopupCloseBtn,
    avatarSubmitButton,
    avatarInput,
    cardTemplateSelector,
    cardSelector,
    profName,
    profProf,
    profAvatar,
    gridCardTemplateId,
    popupConfirm,
    popupAddCloseButtonSelector,

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
            profession: userData.about
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

let info;
const submitProfileForm = (data) => {
    info = popupEditProfile.getInputValues();
    popupEditProfile.waitSubmitButton('Сохранение...');
    api.editUserInfo(info.name, info.prof)
        .then(() => {
            userInfo.setUserInfo({
                name: info.name,
                profession: info.prof
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
            });
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
        })
        .catch(error => api._errorHandler(error))
        .finally(() => {
            popupAddCard.close();

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
    const avatarLink = popupEditAvatar.getInputValues().link;
    avatarIcon.src = avatarLink;
    popupEditAvatar.waitSubmitButton('Сохранение...');
    api.editUserAvatar(avatarLink)
        .then(() => {
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
        })
        .catch(error => api._errorHandler(error))
        .finally(() => {
            popupSubmitDel.close();
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
