const MODAL_ACTIVE_CLASS = "popup_opened";

const openModalBtn = document.querySelector(".profile__button-pencil");
const modal = document.querySelector(".popup");
const formElement = document.querySelector(".popup__form");
const closeModalBtn = modal.querySelector(".popup__button-close");
const nameText = document.querySelector(".profile__title");
const jobText = document.querySelector(".profile__paragraph");
const nameInput = formElement.querySelector(".popup__input-name");
const jobInput = formElement.querySelector(".popup__input-job");

function setInput() {
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

function closeModal() {
  modal.classList.remove(MODAL_ACTIVE_CLASS);
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  closeModal();
}

openModalBtn.addEventListener("click", () => {
  modal.classList.add(MODAL_ACTIVE_CLASS);
  setInput();
});
closeModalBtn.addEventListener("click", () => {
  closeModal();
});

formElement.addEventListener("submit", formSubmitHandler);