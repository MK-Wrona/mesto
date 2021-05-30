import FormValidator from "./script/components/FormValidator.js";
import { validityConfigSet } from "./script/utiles/validityConfigSet.js";
import { initialCards } from "./script/utiles/initialCards.js"
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
    avatarCloseBtn




} from "./script/utiles/constants.js"

import './pages/index.css';

const api = new Api({
    adress: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
        authorization: 'bc8d3de0-e753-4646-a5ba-26caab7d3e1d',
        'Content-Type': 'application/json'
    }
});



function addCard(card) {
    initialSection.addItem(card);

}
// взять данные пользователя с сервера
api.getUserInfo().then((data => {
    profName.textContent = data.name;
    profProf.textContent = data.about;
    profAvatar.src = data.avatar;
}));

//открыть модалку с данными юзера
const userInfo = new UserInfo(profileSelectors);
popUpOpenButton.addEventListener('click', function() {
    popupEditProfile.open();
    const newInfo = userInfo.getUserInfo();
    popUpUserName.value = newInfo.name;
    popUpUserProf.value = newInfo.profession;
});
//переназначить значения
const submitProfileForm = (data) => {

        const info = {
            name: popUpUserName.value,
            profession: popUpUserProf.value
        }
        api.editUserInfo(info.name, info.profession)
            .finally(() => {
                userInfo.setUserInfo(info);
                popupEditProfile.close();
            })
    }
    //открой модалку с авой юзера
avatarButton.addEventListener('click', function() {
    popupEditAvatar.open();
    popupEditAvatar.resetWaitSubmitButton();
});
// изменение авы
const formEditAvatarSubmitHandler = (e) => {
        e.preventDefault();
        avatarIcon.src = popupAvatarInput.value;
        popupEditAvatar.waitSubmitButton('Сохранение...');
        popupEditAvatar.close();
    }
    // объявление попапа авы

const popupEditAvatar = new PopupWithConfirm(avatarEditPopup, avatarCloseBtn,
    formEditAvatarSubmitHandler);
popupEditAvatar.setEventListeners();






const createCard = (item, gridTemplate, handleCardClick) => {
    const card = new Card(item, gridTemplate, handleCardClick);
    return card.getCard();
}


api.getInitialCards().then((cards) => {
    generateInitialCard(cards)
})
const generateInitialCard = (cards) => {
    const initialSection = new Section({
        items: cards,
        renderer: (item) => {
            const card = createCard(item, gridTemplate, handleCardClick);
            initialSection.addItem(card);
        }
    }, list)
    initialSection.renderItems();
}

const submitAddForm = () => {
    const card = createCard({ name: popUpImageTitleInput.value, link: popUpImageLinkInput.value }, '.grid-template', handleCardClick)
    addCard(card);
    popupAddCard.close();
    formAdd.reset(); //сброс
    addFormValidator.deactivateButton(submitButtonAddPopUp, validityConfigSet.inactiveButtonClass) // дизейбл кнопки
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

const popupAddCard = new PopupWithForm(popUpAddSelector, popUpClsBtnSelector, submitAddForm)
popupAddCard.setEventListeners();

popUpAddBtn.addEventListener("click", function() {
    popupAddCard.open();

});

const editFormValidator = new FormValidator(validityConfigSet, profilePopUpForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validityConfigSet, formAdd);
addFormValidator.enableValidation();
//редактирование аватара
