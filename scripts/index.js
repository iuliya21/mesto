const modalActiveClass = "popup_opened";

const openModalBtn = document.querySelector(".profile__button-pencil"); //кнопка редактирования имени и деятельности
const openNewCardBtn = document.querySelector(".profile__button"); //кнопка добавления новой карточки
const modals = document.querySelectorAll(".popup"); //создаем коллекцию всех попапов
const modal = modals[0]; //первый попап
const modalCreateCard = modals[1]; //второй попап
const closeModalBtns = document.querySelectorAll(".popup__button-close"); //все крестики (Node-list)
const nameText = document.querySelector(".profile__title");
const jobText = document.querySelector(".profile__paragraph");
const formElement = document.querySelector(".popup__form"); //форма для первого попапа
const nameInput = formElement.querySelector(".popup__form-text_input_name");
const jobInput = formElement.querySelector(".popup__form-text_input_job");
const formPlace = modalCreateCard.querySelector(".popup__form"); //форма для второго попапа
const placeInput = modalCreateCard.querySelector(".popup__form-text_input_place");
const linkInput = modalCreateCard.querySelector(".popup__form-text_input_link");
const list = document.querySelector(".elements");
const cardTemplateContent = document.querySelector("#template-card").content; //контент template
const cardItem = cardTemplateContent.querySelector(".elements-item");

//Первоначальный массив карточек: фотографий и названий
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//функция очистки модального окна: название места и ссылка
const clearInput = () => {
  placeInput.value = "";
  linkInput.value = "";
}

//Функция удаления карточки
const removeCard = (element) => {
  element.remove();
}

//Функция создания карточки
const createItem = (item) => {
  const element = cardItem.cloneNode(true);
  const elementName = element.querySelector(".elements-item__title");
  const elementPhoto = element.querySelector(".elements-item__photo");
  const btnRemove = element.querySelector(".elements-item__button");
  btnRemove.addEventListener("click", () => removeCard(element));
  elementName.textContent = item.name;
  elementPhoto.src = item.link;
  elementPhoto.alt = item.name;
  list.prepend(element);
  clearInput ();
};



initialCards.forEach(createItem); //проходим по массиву, создаем карточки

//Функция установки в текстовые поля формы имени и рода деятельности первого исследователя
function setInput() {
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

//Функция закрытия окна, при нажатии на любой крестик
function closeModal() {
  modals.forEach((evt) => {
    evt.classList.remove(modalActiveClass);
  });
}

//Функция, которая сохраняет введенные значения в форму и закрывает её
function submitHandlerForm(evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  closeModal();
}

//Функция сохранения информации в новую карточку
function submitHandlerCard(evt) {
  evt.preventDefault();
  const newPlace = placeInput.value;
  const newLink = linkInput.value;
  createItem({
    name: newPlace,
    link: newLink,
  },);
  closeModal();
}

//Слушатель на кнопку карандаша, который при клике на карандаш вызывает функцию, которая открывает окно формы
openModalBtn.addEventListener("click", () => {
  modal.classList.add(modalActiveClass);
  setInput();
});

//Слушатель на кнопку добавления новой карточки
openNewCardBtn.addEventListener("click", () => {
  modalCreateCard.classList.add(modalActiveClass);
});

//Слушатель на кнопку-крестик, который запускает функцию закрытия формы
closeModalBtns.forEach((evt) => {
  evt.addEventListener("click", () => {
    closeModal();
  });
});

//Отправка формы редактиррования имени при событии sumbit
formElement.addEventListener("submit", submitHandlerForm);

//Отправка формы добавления карточки
formPlace.addEventListener("submit", submitHandlerCard);