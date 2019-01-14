'use strict';

(function () {
  var ERROR_MESSAGE_STYLE = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  var ERROR_MESSAGE_POSITION = 'absolute';
  var ERROR_MESSAGE_POSITION_LEFT = 0;
  var ERROR_MESSAGE_POSITION_RIGHT = 0;
  var ERROR_MESSAGE_FONTSIZE = '30px';
  var PAGE_RELOAD_TIME = 1000;

  var KEY_CODE_ESC = 27;

  var element = document.querySelector('.erro-message');

  var removeListener = function () {
    if (element) {
      element.removeEventListener('keydown', onDocumentKeydownEsc);
    }
  };

  var onDocumentKeydownEsc = function (evt) {
    evt.preventDefault();

    if (evt.keyCode === KEY_CODE_ESC) {
      element.remove();

      setTimeout(function () {
        location.reload();
      }, PAGE_RELOAD_TIME);
    }
  };

  var createErrorMessage = function (errorMessage) {
    element = document.createElement('div');
    element.classList.add('error-message');
    element.style = ERROR_MESSAGE_STYLE;
    element.style.position = ERROR_MESSAGE_POSITION;
    element.style.left = ERROR_MESSAGE_POSITION_LEFT;
    element.style.right = ERROR_MESSAGE_POSITION_RIGHT;
    element.style.fontSize = ERROR_MESSAGE_FONTSIZE;

    element.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', element);

    document.addEventListener('keydown', onDocumentKeydownEsc);
  };

  removeListener();

  window.errorMessage = {
    create: createErrorMessage
  };
})();
