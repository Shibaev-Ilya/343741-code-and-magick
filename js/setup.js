'use strict';

// @TODO На submit нельзя перейти табом
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_QUANTITY = 4;

var KEYCODE_ENTER = 13;
var KEYCODE_ESC = 27;

var CUSTOM_WARNING_MESSAGE_MAP = {
  tooShort: 'Имя должно состоять минимум из 2-х символов',
  emptyField: 'Обязательное поле'
};

// variables
var setupFormOpenElement = document.querySelector('.setup-open');
var setupFormCloseElement = document.querySelector('.setup-close');
var setupFormIconElement = document.querySelector('.setup-open-icon');
var setupFormElement = document.querySelector('.setup');
var setupUserNameElement = document.querySelector('.setup-user-name');
var setupSubmitElement = document.querySelector('.setup-submit');

var setupPlayerElement = document.querySelector('.setup-player');
var wizardCoatColorElement = document.querySelector('.wizard-coat');
var wizardEyesColorElement = document.querySelector('.wizard-eyes');
var wizardFireballColorElement = document.querySelector('.setup-fireball');

setupFormIconElement.tabIndex = 0;
setupFormCloseElement.tabIndex = 0;
setupSubmitElement.tabIndex = 0;

// function
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplateElement.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

var generateWizard = function () {
  return {
    name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_LASTNAMES),
    coatColor: getRandomElement(WIZARD_COATS_COLORS),
    eyesColor: getRandomElement(WIZARD_EYES_COLORS)
  };
};

var generateWizards = function () {
  var similarWizards = [];
  for (var i = 0; i < WIZARD_QUANTITY; i++) {
    similarWizards.push(generateWizard());
  }
  return similarWizards;
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) - min);
};

var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

var onSetupSubmitClick = function () {
  if (setupUserNameElement.checkValidity() && onUserNameInValidity()) {
    setupFormElement.submit();
  }
};

var onUserNameInValidity = function () {
  if (setupUserNameElement.validity.tooShort) {
    setupUserNameElement.setCustomValidity(CUSTOM_WARNING_MESSAGE_MAP.tooShort);
  } else if (setupUserNameElement.validity.valueMissing) {
    setupUserNameElement.setCustomValidity(CUSTOM_WARNING_MESSAGE_MAP.emptyField);
  } else {
    setupUserNameElement.setCustomValidity('');
  }
};

var onPopupEscClose = function (evt) {
  if (evt.keyCode === KEYCODE_ESC && evt.target !== setupUserNameElement) {
    setupFormElement.classList.add('hidden');
  }
};
var popupOpen = function () {
  setupFormElement.classList.remove('hidden');
  setupFormElement.addEventListener('submit', onSetupSubmitClick);
  document.addEventListener('keydown', onPopupEscClose);
  setupUserNameElement.addEventListener('invalid', onUserNameInValidity);
  setupUserNameElement.addEventListener('input', onUserNameInValidity);
  setupSubmitElement.addEventListener('click', onSetupSubmitClick);
  setupPlayerElement.addEventListener('click', onSetupWizardColorClick);
};

var popupClose = function () {
  setupFormElement.classList.add('hidden');
  setupFormElement.removeEventListener('submit', onSetupSubmitClick);
  document.removeEventListener('keydown', onPopupEscClose);
  setupUserNameElement.removeEventListener('invalid', onUserNameInValidity);
  setupUserNameElement.removeEventListener('input', onUserNameInValidity);
  setupSubmitElement.removeEventListener('click', onSetupSubmitClick);
  setupPlayerElement.removeEventListener('click', onSetupWizardColorClick);
};

setupFormOpenElement.addEventListener('click', function () {
  popupOpen();
});

setupFormOpenElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
    popupOpen();
  }
});

setupFormCloseElement.addEventListener('click', function () {
  popupClose();
});

setupFormCloseElement.addEventListener('keydown', function () {
  popupClose();
});

var onSetupWizardColorClick = function (evt) {
  var target = evt.target;
  if (target === wizardCoatColorElement) {
    wizardCoatColorElement.style.fill = getRandomElement(WIZARD_COATS_COLORS);
  } else if (target === wizardEyesColorElement) {
    wizardEyesColorElement.style.fill = getRandomElement(WIZARD_EYES_COLORS);
  } else if (target === wizardFireballColorElement) {
    wizardFireballColorElement.parentNode.style.background = getRandomElement(WIZARD_FIREBALL_COLOR);
  }
};

// logic
var userDialogElement = document.querySelector('.setup');
var similarListElement = userDialogElement.querySelector('.setup-similar-list');
var similarWizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
userDialogElement.querySelector('.setup-similar').classList.remove('hidden');

renderWizards(generateWizards());
