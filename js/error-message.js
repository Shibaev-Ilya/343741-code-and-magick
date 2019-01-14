'use strict';

(function () {
  var ERROR_MESSAGE_STYLE = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  var ERROR_MESSAGE_POSITION = 'absolute';
  var ERROR_MESSAGE_POSITION_LEFT = 0;
  var ERROR_MESSAGE_POSITION_RIGHT = 0;
  var ERROR_MESSAGE_FONTSIZE = '30px';

  var KEY_CODE_ESC = 27;

  var errorElement = document.querySelector('.erro-message');

  var removeListener = function () {
    if (errorElement) {
      errorElement.removeEventListener('keydown', onDocumentKeydownEsc);
    }
  };

  var onDocumentKeydownEsc = function (evt) {
    evt.preventDefault();

    if (evt.keyCode === KEY_CODE_ESC) {
      errorElement.remove();

      setTimeout(function () {
        location.reload();
      }, 1000);
    }
  };

  var createErrorMessage = function (errorMessage) {
    errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.style = ERROR_MESSAGE_STYLE;
    errorElement.style.position = ERROR_MESSAGE_POSITION;
    errorElement.style.left = ERROR_MESSAGE_POSITION_LEFT;
    errorElement.style.right = ERROR_MESSAGE_POSITION_RIGHT;
    errorElement.style.fontSize = ERROR_MESSAGE_FONTSIZE;

    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);

    document.addEventListener('keydown', onDocumentKeydownEsc);
  };

  removeListener();

  window.errorMessage = {
    createErrorMessage: createErrorMessage
  };
})();
