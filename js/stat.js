'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_COLOR = '#ffffff';
  var CLOUD_END_POINT_X = CLOUD_X + CLOUD_WIDTH;
  var CLOUD_END_POINT_Y = CLOUD_Y + CLOUD_HEIGHT;
  var CLOUD_MIDDLE_POINT_X = CLOUD_X + CLOUD_WIDTH / 2;
  var CLOUD_MIDDLE_POINT_Y = CLOUD_Y + CLOUD_HEIGHT / 2;
  var CLOUD_INDENT = 10;

  var SHADOW_INDENT = 10;
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

  var BAR_WIDTH_INDENT = 50;
  var BAR_WIDTH = 40;
  var BAR_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
  var BAR_BOTTOM_INDENT = 40;
  var BAR_HEIGHT = (CLOUD_HEIGHT - BAR_WIDTH_INDENT - BAR_BOTTOM_INDENT - BAR_WIDTH_INDENT);

  var TEXT_INDENT = BAR_WIDTH_INDENT / 2;
  var TEXT_COLOR = '#000000';
  var TEXT_BASELINE = 'hanging';
  var TEXT_USER_NAME = 'Вы';

  var MESSAGE_FONT_SIZE = 16;
  var MESSAGE_FONT_FAMILY = 'PT Mono';
  var MESSAGE_FONT_WEIGHT = 'bold';
  var MESSAGE_FONT = MESSAGE_FONT_WEIGHT + ' ' + MESSAGE_FONT_SIZE + 'px' + ' ' + MESSAGE_FONT_FAMILY;
  var MESSAGE_FONT_COLOR = '#000000';
  var MESSAGE_FONT_BASELINE = 'baseline';
  var MESSAGE_TEXT_HEADLINE = 'Ура вы победили!';
  var MESSAGE_TEXT_RESULT = 'Список результатов:';
  var MESSAGE_TEXT_INDENT = 40;
  var MESSAGE_TIME_INDENT = 210;
  var MESSAGE_LINEHEIGHT = MESSAGE_FONT_SIZE * 1.2;
  var MESSAGE_START_POSITION = CLOUD_X + (BAR_WIDTH_INDENT / 2);

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(CLOUD_X, CLOUD_Y);
    ctx.lineTo(CLOUD_MIDDLE_POINT_X, CLOUD_Y + CLOUD_INDENT);
    ctx.lineTo(CLOUD_END_POINT_X, CLOUD_Y);
    ctx.lineTo(CLOUD_END_POINT_X - CLOUD_INDENT, CLOUD_MIDDLE_POINT_Y);
    ctx.lineTo(CLOUD_END_POINT_X, CLOUD_END_POINT_Y);
    ctx.lineTo(CLOUD_MIDDLE_POINT_X, CLOUD_END_POINT_Y - CLOUD_INDENT);
    ctx.lineTo(CLOUD_X, CLOUD_END_POINT_Y);
    ctx.lineTo(CLOUD_X + CLOUD_INDENT, CLOUD_MIDDLE_POINT_Y);
    ctx.stroke();
    ctx.fill();
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (typeof arr[i] !== 'undefined' && arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  var renderMessages = function (ctx) {
    ctx.fillStyle = MESSAGE_FONT_COLOR;
    ctx.font = MESSAGE_FONT;
    ctx.textBaseline = MESSAGE_FONT_BASELINE;
    ctx.fillText(MESSAGE_TEXT_HEADLINE, MESSAGE_START_POSITION, MESSAGE_TEXT_INDENT);
    ctx.fillText(MESSAGE_TEXT_RESULT, MESSAGE_START_POSITION, MESSAGE_TEXT_INDENT + MESSAGE_LINEHEIGHT);
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

  var renderBars = function (ctx, times, names) {
    var maxTime = getMaxElement(times);
    var barPositionX;
    var barPositionY;
    for (var i = 0; i < names.length; i++) {

      ctx.fillStyle = TEXT_COLOR;
      ctx.textBaseline = TEXT_BASELINE;

      barPositionX = CLOUD_X + BAR_WIDTH_INDENT + (BAR_WIDTH + BAR_WIDTH_INDENT) * i;
      barPositionY = (BAR_HEIGHT * times[i]) / maxTime * (-1);

      ctx.fillText(Math.floor(times[i]), barPositionX, barPositionY + MESSAGE_TIME_INDENT);
      ctx.fillText(names[i], barPositionX, CLOUD_HEIGHT - TEXT_INDENT);

      ctx.fillStyle = names[i] === TEXT_USER_NAME ? BAR_PLAYER_COLOR : generateRandomColor('blue');

      ctx.fillRect(barPositionX, CLOUD_HEIGHT - BAR_BOTTOM_INDENT, BAR_WIDTH, barPositionY);
    }
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + SHADOW_INDENT, CLOUD_Y + SHADOW_INDENT, SHADOW_COLOR);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
    renderMessages(ctx);
    renderBars(ctx, times, names);
  };
})();
