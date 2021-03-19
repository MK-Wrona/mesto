let popUp = document.querySelector(".pop-up");
let popUpOpenButton = document.querySelector(".profile__edit-button");
let popUpCloseButton = document.querySelector(".pop-up__close-button");
let popUpSubmitButton = document.querySelector(".pop-up__submit-button");
let popUpDefaultName = document.querySelector(".profile__name");
let popUpDefaultProf = document.querySelector(".profile__prof");
let popUpForm = document.querySelector(".pop-up__form");
let popUpUserName = document.querySelector(".pop-up__name");
let popUpUserProf = document.querySelector(".pop-up__profession");

function popUpOpens() {
    popUp.classList.add("pop-up_opened");
}

function popUpCloses() {
    popUp.classList.remove("pop-up_opened");
}
popUpCloseButton.addEventListener("click", popUpCloses);

let fillForm = () => {
    popUpUserName.textContent = popUpDefaultName.textContent;
    popUpUserProf.textContent = popUpDefaultProf.textContent;
    popUpOpens();
}

popUpOpenButton.addEventListener("click", fillForm, popUpOpens);


function submitForm(event) {
    event.preventDefault();
    popUpDefaultName.textContent = popUpUserName.value;
    popUpDefaultProf.textContent = popUpUserProf.value;
    popUpCloses();
}
popUpForm.addEventListener("submit", submitForm);
