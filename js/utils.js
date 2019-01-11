'use strict';

(function () {

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) - min);
  };

  var getRandomElement = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
  };

  var getMaxElement = function (arr) {
    return arr.reduce(function (maxElement, minElement) {
      return (minElement > maxElement) ? minElement : maxElement;
    }, 0);
  };

  var generateRandomColor = function (color) {
    switch (color) {
      case 'red':
        return 'rgba(' + Math.round(Math.random() * 255) + ', 0, 0, 1)';
      case 'green':
        return 'rgba(0, ' + Math.round(Math.random() * 255) + ', 0, 1)';
      default:
        return 'rgba(0, 0,' + Math.round(Math.random() * 255) + ', 1)';
    }
  };

  window.utils = {
    getRandomElement: getRandomElement,
    generateRandomColor: generateRandomColor,
    getMaxElement: getMaxElement
  };
})();
