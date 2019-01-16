'use strict';

(function () {
  var ERROR_MESSAGE_STYLE = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  var ERROR_MESSAGE_POSITION = 'absolute';
  var ERROR_MESSAGE_POSITION_LEFT = 0;
  var ERROR_MESSAGE_POSITION_RIGHT = 0;
  var ERROR_MESSAGE_FONTSIZE = '30px';
  var PAGE_RELOAD_TIME = 1000;

  var KEY_CODE_ESC = 27;

  var createErrorMessage = function (errorMessage) {
    errortElement = document.createElement('div');
    errortElement.classList.add('error-message');
    errortElement.style = ERROR_MESSAGE_STYLE;
    errortElement.style.position = ERROR_MESSAGE_POSITION;
    errortElement.style.left = ERROR_MESSAGE_POSITION_LEFT;
    errortElement.style.right = ERROR_MESSAGE_POSITION_RIGHT;
    errortElement.style.fontSize = ERROR_MESSAGE_FONTSIZE;

    errortElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errortElement);

    document.addEventListener('keydown', onDocumentKeydownEsc);
  };

  var errortElement = document.querySelector('.error-message');

  var removeListener = function () {
    if (errortElement) {
      errortElement.removeEventListener('keydown', onDocumentKeydownEsc);
    }
  };

  var onDocumentKeydownEsc = function (evt) {
    evt.preventDefault();

    if (evt.keyCode === KEY_CODE_ESC) {
      errortElement.remove();

      setTimeout(function () {
        location.reload();
      }, PAGE_RELOAD_TIME);
    }
  };

  removeListener();

  window.errorMessage = {
    create: createErrorMessage
  };
})();
