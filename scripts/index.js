const modalActiveClass = "popup_opened";

const buttonOpenPopupProfile = document.querySelector(".profile__button-pencil"); //кнопка редактирования имени и деятельности
const buttonOpenPopupCard = document.querySelector(".profile__button"); //кнопка добавления новой карточки
const modals = document.querySelectorAll(".popup"); //создаем коллекцию всех попапов
const modal = document.querySelector(".popup_type_edit"); //первый попап
const modalCreateCard = document.querySelector(".popup_type_card"); //второй попап
const modalImage = document.querySelector(".popup_type_image"); //третий попап с увеличенным изображением
const fullImage = document.querySelector(".popup-image__photo");//фото из третьего попапа
const imageOpenFullDescription = document.querySelector(".popup-image__description");//подпись фото из третьего попапа
const buttonsCloseModal = document.querySelectorAll(".popup__button-close"); //все крестики (Node-list)
const nameText = document.querySelector(".profile__title");
const jobText = document.querySelector(".profile__paragraph");
const formElement = document.querySelector(".popup__form"); //форма для первого попапа
const nameInput = formElement.querySelector(".popup__form-text_input_name"); //инпут Имя
const jobInput = formElement.querySelector(".popup__form-text_input_job"); //инпут Род деятельности
const formPlace = modalCreateCard.querySelector(".popup__form"); //форма для второго попапа
const placeInput = modalCreateCard.querySelector(".popup__form-text_input_place");
const linkInput = modalCreateCard.querySelector(".popup__form-text_input_link");
const place = document.querySelector(".places");
const list = document.querySelector(".elements");
const cardTemplateContent = document.querySelector("#template-card").content; //контент template
const cardItem = cardTemplateContent.querySelector(".elements-item");

//Функция открытия окна
const openModal = function (popup) {
  popup.classList.add(modalActiveClass);
}
//Функция закрытия окна
const closeModal = function (popup) {
  popup.classList.remove(modalActiveClass);
}
//функция очистки модального окна: название места и ссылка
const clearInput = () => {
  formPlace.reset();
}
//Функция удаления карточки
const removeCard = (element) => {
  element.remove();
}
//Функция создания карточки
const createItem = (item) => {
  const element = cardItem.cloneNode(true);
  const elementName = element.querySelector(".elements-item__title");
  const elementPhoto = element.querySelector(".elements-item__photo"); //фотография места
  const btnRemove = element.querySelector(".elements-item__button");

const openImage = function() {
  fullImage.alt = item.name;
  fullImage.src = item.link;
  imageOpenFullDescription.textContent = item.name;
  openModal(modalImage);
}

  btnRemove.addEventListener("click", () => removeCard(element));
  elementName.textContent = item.name;
  elementPhoto.src = item.link;
  elementPhoto.alt = item.name;

  elementPhoto.addEventListener("click", openImage);

  element.querySelector(".elements-item__like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("elements-item__like_active");
  });
  return element;
}

function renderCard (element) {
  list.prepend(element);
}

initialCards.forEach(item => {
  renderCard(createItem(item));
});

//Функция установки в текстовые поля формы имени и рода деятельности первого исследователя
function setInput() {
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

//Функция, которая сохраняет введенные значения в форму и закрывает её
function submitHandlerForm(evt) { 
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  closeModal(modal);
}

//Функция сохранения информации в новую карточку
function submitHandlerCard(evt) {
  evt.preventDefault();
  const newPlace = placeInput.value;
  const newLink = linkInput.value;
  renderCard(createItem({
    name: newPlace,
    link: newLink,
  },));
  closeModal(modalCreateCard);
}

//Слушатель на кнопку карандаша, который при клике на карандаш вызывает функцию, которая открывает окно формы
buttonOpenPopupProfile.addEventListener("click", () => {
  openModal(modal);
  setInput();
});

//Слушатель на кнопку добавления новой карточки
buttonOpenPopupCard.addEventListener("click", () => {
  openModal(modalCreateCard);
  clearInput();
});

//Слушатель на кнопку-крестик, который запускает функцию закрытия формы
buttonsCloseModal.forEach((evt) => {
  const popup = evt.closest(".popup");
  evt.addEventListener("click", () => {
    closeModal(popup);
  });
});

//Отправка формы редактирования имени при событии sumbit
formElement.addEventListener("submit", submitHandlerForm);

//Отправка формы добавления карточки
formPlace.addEventListener("submit", submitHandlerCard);