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
    gridCardTemplateId,
    popupConfirm,
    popupAddCloseButtonSelector,
    userId,





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
    avatarIcon.src = data.avatar;
}));


const userInfo = new UserInfo(profileSelectors);
popUpOpenButton.addEventListener('click', function() {
    popupEditProfile.open();
    const newInfo = userInfo.getUserInfo();
    popUpUserName.value = newInfo.name;
    popUpUserProf.value = newInfo.profession;
});

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
    // добавление карточек
const formSubmitAddHandler = (event) => {

        const titleCard = popUpImageTitleInput.value;
        const linkCard = popUpImageLinkInput.value;
        api.plusCard(titleCard, linkCard)
            .then(dataCard => {
                const card = new Card(dataCard, userId, gridCardTemplateId, {
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
                }, dataCard._id);
                const cardElement = card.generateCard();
                list.prepend(cardElement);
            });

        popupAddCard.close();
    }
    //генерация начального сета карточек
const generateInitialCards = (cards) => {
    const defaultCardGrid = new Section({
        items: cards,
        renderer: (item) => {
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
            const cardElement = card.generateCard();
            defaultCardGrid.addItem(cardElement);
        }
    }, list);
    defaultCardGrid.renderItems();
}

api.getInitialCards().then((cards) => {
    generateInitialCards(cards);
});





//const generateInitialCard = (cards) => {
//  const initialSection = new Section({
//    items: cards,
//  renderer: (item) => {
//    const card = createCard(item, gridTemplate, handleCardClick);
//  initialSection.addItem(card);
//        }
//    }, list)
//  initialSection.renderItems();
//}

//const createCard = (item, gridTemplate, handleCardClick) => {
//  const card = new Card(item, gridTemplate, handleCardClick);
// return card.getCard();
//}
//
//const submitAddForm = () => {
//   const card = createCard({ name: popUpImageTitleInput.value, link: popUpImageLinkInput.value }, '.grid-template', handleCardClick)
//   addCard(card);
//   popupAddCard.close();
//    formAdd.reset(); //сброс
//   addFormValidator.deactivateButton(submitButtonAddPopUp, validityConfigSet.inactiveButtonClass) // дизейбл кнопки
//}


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


});

const editFormValidator = new FormValidator(validityConfigSet, profilePopUpForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validityConfigSet, formAdd);
addFormValidator.enableValidation();
//редактирование аватара


const formEditAvatarSubmitHandler = (event) => {
    event.preventDefault();
    const avatarLink = document.querySelector(avatarInput).value
    avatarIcon.src = avatarLink;
    popupEditAvatar.waitSubmitButton('Сохранение...');
    api.editUserAvatar(avatarLink)
        .finally(() => {
            popupEditAvatar.close();
        });
}

const popupEditAvatar = new PopupWithConfirm(avatarEditPopup, popUpClsBtnSelector,
    formEditAvatarSubmitHandler);
popupEditAvatar.setEventListeners();

avatarButton.addEventListener('click', function() {
    popupEditAvatar.open();
    popupEditAvatar.resetWaitSubmitButton();
});


const formDeleteSubmitHandler = (evt, card) => {
    evt.preventDefault();

    popupSubmitDel.waitSubmitButton('Удаление...');
    api.deleteCard(card._cardId)
    card.deleteCard(); //  удалить карточку на клиенте
    popupSubmitDel.close();
    popupSubmitDel.resetWaitSubmitButton();
}

// модалка удаления
const popupSubmitDel = new PopupWithConfirm(popupConfirm, popUpClsBtnSelector,
    (evt, card) => {
        formDeleteSubmitHandler(evt, card)
    }
)
popupSubmitDel.setEventListeners();


//const formEditAvatarSubmitHandler = (e) => {
//    e.preventDefault();
//   avatarIcon.src = popupAvatarInput.value;
//   popupEditAvatar.waitSubmitButton('Сохранение...');
//}
//avatarButton.addEventListener('click', function() {
//  popupEditAvatar.open();
//popupEditAvatar.resetWaitSubmitButton();
//});
