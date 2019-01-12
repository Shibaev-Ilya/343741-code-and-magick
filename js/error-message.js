'use strict';

(function () {
  var ERROR_MESSAGE_ELEMENT = 'div';
  var ERROR_MESSAGE_STYLE = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  var ERROR_MESSAGE_POSITION = 'absolute';
  var ERROR_MESSAGE_POSITION_LEFT = 0;
  var ERROR_MESSAGE_POSITION_RIGHT = 0;
  var ERROR_MESSAGE_FONTSIZE = '30px';

  var createErrorMessage = function (errorMessage) {
    var node = document.createElement(ERROR_MESSAGE_ELEMENT);
    node.style = ERROR_MESSAGE_STYLE;
    node.style.position = ERROR_MESSAGE_POSITION;
    node.style.left = ERROR_MESSAGE_POSITION_LEFT;
    node.style.right = ERROR_MESSAGE_POSITION_RIGHT;
    node.style.fontSize = ERROR_MESSAGE_FONTSIZE;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.errorMessage = {
    createErrorMessage: createErrorMessage
  };
})();
