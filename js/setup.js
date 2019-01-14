'use strict';

(function () {

  var KEYCODE_ENTER = 13;

  var setupFormElement = document.querySelector('.setup-wizard-form');
  var setupFormOpenElement = document.querySelector('.setup-open');
  var setupFormCloseElement = document.querySelector('.setup-close');
  var setupFormIconElement = document.querySelector('.setup-open-icon');

  setupFormIconElement.tabIndex = 0;
  setupFormCloseElement.tabIndex = 0;

  setupFormOpenElement.addEventListener('click', function () {
    window.popup.open();
  });

  setupFormOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      window.popup.open();
    }
  });

  setupFormCloseElement.addEventListener('click', function () {
    window.popup.close();
  });

  setupFormCloseElement.addEventListener('keydown', function () {
    window.popup.close();
  });

  var onSaveError = function (error) {
    window.errorMessage.create(error);
  };

  setupFormElement.addEventListener('submit', function (evt) {
    window.backend.save(
        new FormData(setupFormElement),
        function () {
          window.popup.close();
        },
        onSaveError);
    evt.preventDefault();
  });

})();

