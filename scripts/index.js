const modalActiveClass = "popup_opened";

const openModalBtn = document.querySelector(".profile__button-pencil");
const modal = document.querySelector(".popup");
const formElement = document.querySelector(".popup__form");
const closeModalBtn = modal.querySelector(".popup__button-close");
const nameText = document.querySelector(".profile__title");
const jobText = document.querySelector(".profile__paragraph");
const nameInput = formElement.querySelector(".popup__form-text_input_name");
const jobInput = formElement.querySelector(".popup__form-text_input_job");

//Функция установки в текстовые поля формы имени и рода деятельности первого исследователя
function setInput() { 
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

//Функция закрытия окна, при нажатии на крестик
function closeModal() {
  modal.classList.remove(modalActiveClass);
}

//Функция, которая сохраняет введенные значения в форму и закрывает её
function submitHandlerForm (evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  closeModal();
}
//Слушатель на кнопку карандаша, который при клике на карандаш, открывает окно формы
openModalBtn.addEventListener("click", () => {
  modal.classList.add(modalActiveClass);
  setInput();
});

//Слушатель на кнопку-крестик, который запускает функцию закрытия формы
closeModalBtn.addEventListener("click", () => {
  closeModal();
});

//Отправка формы при событии sumbit
formElement.addEventListener("submit", submitHandlerForm);