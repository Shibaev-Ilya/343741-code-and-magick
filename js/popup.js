'use strict';

(function () {
  var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];


  var KEYCODE_ESC = 27;

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
        wizardCoatColorElement.style.fill = window.setup.getRandomElement(WIZARD_COATS_COLORS);
        break;
      case wizardEyesColorElement:
        wizardEyesColorElement.style.fill = window.setup.getRandomElement(WIZARD_EYES_COLORS);
        break;
      case wizardFireballColorElement:
        wizardFireballColorElement.parentNode.style.background = window.setup.getRandomElement(WIZARD_FIREBALL_COLOR);
        break;
    }
  };

  var handleFormSubmit = function () {
    if (setupUserNameElement.checkValidity()) {
      setupFormElement.submit();
    }
  };

  var popupOpen = function () {
    setupFormElement.classList.remove('hidden');
    setupFormElement.addEventListener('submit', onSetupFormSubmit);
    document.addEventListener('keydown', onPopupEscClose);
    setupPlayerElement.addEventListener('click', onSetupWizardColorClick);
  };

  var popupClose = function () {
    setupFormElement.classList.add('hidden');
    setupFormElement.removeEventListener('submit', onSetupFormSubmit);
    document.removeEventListener('keydown', onPopupEscClose);
    setupPlayerElement.removeEventListener('click', onSetupWizardColorClick);
  };

  var setupFormElement = document.querySelector('.setup');
  var setupUserNameElement = document.querySelector('.setup-user-name');
  var setupSubmitElement = document.querySelector('.setup-submit');
  var setupPlayerElement = document.querySelector('.setup-player');

  setupSubmitElement.tabIndex = 0;

  var wizardCoatColorElement = document.querySelector('.wizard-coat');
  var wizardEyesColorElement = document.querySelector('.wizard-eyes');
  var wizardFireballColorElement = document.querySelector('.setup-fireball');

  window.popup = {
    open: popupOpen,
    close: popupClose
  };
})();
