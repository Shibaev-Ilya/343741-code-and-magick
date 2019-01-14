'use strict';

(function () {
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';

  var RESPONSE_TYPE = 'json';
  var RESPONSE_TIMEOUT = 10000;

  var StatusCodes = {
    OK: 200
  };

  var LoadEventHandlers = {
    LOAD: 'load',
    ERROR: 'error',
    TIMEOUT: 'timeout'
  };

  var ERROR_CONNECTION = 'Произошла ошибка соединения';
  var TEMPLATE_ERROR_MESSAGE = 'Статус ответа: {statusCode} {statusText}';
  var TEMPLATE_ERROR_TIMEOUT = 'Запрос не успел выполниться за: {timeout} мс';

  var createErrorMessage = function (statusCode, statusText) {
    return TEMPLATE_ERROR_MESSAGE
    .replace('{statusCode}', statusCode)
    .replace('{statusText}', statusText);
  };

  var createTimeoutMessage = function (timeout) {
    return TEMPLATE_ERROR_TIMEOUT
    .replace('{timeout}', timeout);
  };

  var createRequest = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener(LoadEventHandlers.LOAD, function () {
      return xhr.status === StatusCodes.OK ? onLoad(xhr.response) : onError(createErrorMessage(xhr.status, xhr.statusText));
    });
    xhr.addEventListener(LoadEventHandlers.ERROR, function () {
      onError(ERROR_CONNECTION);
    });
    xhr.addEventListener(LoadEventHandlers.TIMEOUT, function () {
      onError(createTimeoutMessage(xhr.timeout));
    });
    xhr.timeout = RESPONSE_TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError) {
      return createRequest(URL_LOAD, 'GET', onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      return createRequest(URL_SAVE, 'POST', onLoad, onError, data);
    }
  };
})();
