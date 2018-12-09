'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_QUANTITY = 4;

var KEYCODE_ENTER = 13;
var KEYCODE_ESC = 27;

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

var dialogHandleElement = setupFormElement.querySelector('.upload');

setupFormIconElement.tabIndex = 0;
setupFormCloseElement.tabIndex = 0;
setupSubmitElement.tabIndex = 0;

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

var handleFormSubmit = function () {
  if (setupUserNameElement.checkValidity()) {
    setupFormElement.submit();
  }
};

var onSetupSubmitClick = function () {
  handleFormSubmit();
};

var onSetupFormSubmit = function () {
  handleFormSubmit();
};

var onPopupEscClose = function (evt) {
  if (evt.keyCode === KEYCODE_ESC && evt.target !== setupUserNameElement) {
    setupFormElement.classList.add('hidden');
  }
};

var onSetupWizardColorClick = function (evt) {
  switch (evt.target) {
    case wizardCoatColorElement:
      wizardCoatColorElement.style.fill = getRandomElement(WIZARD_COATS_COLORS);
      break;
    case wizardEyesColorElement:
      wizardEyesColorElement.style.fill = getRandomElement(WIZARD_EYES_COLORS);
      break;
    case wizardFireballColorElement:
      wizardFireballColorElement.parentNode.style.background = getRandomElement(WIZARD_FIREBALL_COLOR);
      break;
  }
};

var popupOpen = function () {
  setupFormElement.classList.remove('hidden');
  setupFormElement.addEventListener('submit', onSetupFormSubmit);
  document.addEventListener('keydown', onPopupEscClose);
  setupSubmitElement.addEventListener('click', onSetupSubmitClick);
  setupPlayerElement.addEventListener('click', onSetupWizardColorClick);
};

var popupClose = function () {
  setupFormElement.classList.add('hidden');
  setupFormElement.removeEventListener('submit', onSetupSubmitClick);
  document.removeEventListener('keydown', onPopupEscClose);
  setupSubmitElement.removeEventListener('click', onSetupSubmitClick);
  setupPlayerElement.removeEventListener('click', onSetupWizardColorClick);
};

var userDialogElement = document.querySelector('.setup');
var similarListElement = userDialogElement.querySelector('.setup-similar-list');
var similarWizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

userDialogElement.querySelector('.setup-similar').classList.remove('hidden');

renderWizards(generateWizards());

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

dialogHandleElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shiftCoords = {
      x: moveEvt.clientX - startCoords.x,
      y: moveEvt.clientY - startCoords.y
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setupFormElement.style.top = (setupFormElement.offsetTop + shiftCoords.y) + 'px';
    setupFormElement.style.left = (setupFormElement.offsetLeft + shiftCoords.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (dragEvt) {
        dragEvt.preventDefault();
        dialogHandleElement.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandleElement.addEventListener('click', onClickPreventDefault);
    }
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});
