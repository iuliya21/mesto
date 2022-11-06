const showInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
}

const disableButton = (submitButtonSelector, inactiveButtonClass) => {
  submitButtonSelector.classList.add(inactiveButtonClass);
  errorElement.disabled = true;
}

const enableButton = (submitButtonSelector, inactiveButtonClass) => {
  submitButtonSelector.classList.remove(inactiveButtonClass);
  errorElement.disabled = false;
}

const toggleButtonState = (submitButtonSelector, inactiveButtonClass) => {
  disableButton(submitButtonSelector, inactiveButtonClass);
  enableButton(submitButtonSelector, inactiveButtonClass);
}

const checkInputValidity = (inputElement, errorElement, inputErrorClass) => {
  if(inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, inputErrorClass);
  } else {
    showInputError(inputElement, errorElement, inputErrorClass);
  }
}

const handleFormInput = (evt, form, inputErrorClass, submitButtonSelector, inactiveButtonClass) => {
  const inputElement = evt.target;
  const errorElement = form.querySelector(`.input-error-${inputElement.name}`);
  checkInputValidity(inputElement, errorElement, inputErrorClass);
  toggleButtonState(submitButtonSelector, inactiveButtonClass);
};

const enableValidation = (config) => {
  const formSelector = config.formSelector;
  const inputSelector = config.inputSelector;
  const inputErrorClass = config.inputErrorClass;
  const submitButtonSelector = config.submitButtonSelector;
  const inactiveButtonClass = config.inactiveButtonClass;
  const form = document.querySelector(formSelector);
  const inputs = modal.querySelectorAll(inputSelector); //все инпуты в модалке редактирования профиля
  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => handleFormInput(evt, form, inputErrorClass, submitButtonSelector, inactiveButtonClass));
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-text',
  inputErrorClass: 'popup__form-text_type_error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled'
});
