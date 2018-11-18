'use strict';

/*
var  названиеСвойства = ...
var  названиеСущность+названиеСвойства = ...
var  делатьЧтото = ...
*/

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#ffffff';
// SHADOW
var SHADOW_INDENT = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
// BAR
var BAR_WIDTH_INDENT = 50;
var BAR_WIDTH = 40;
var BAR_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
// TEXT
var TEXT_HEIGHT = 40;
var TEXT_INDENT = BAR_WIDTH_INDENT / 2;
var TEXT_COLOR = '#000000';
var TEXT_BASELINE = 'hanging';
var TEXT_USER_NAME = 'Вы';

var barHeight = (CLOUD_HEIGHT - BAR_WIDTH_INDENT - TEXT_HEIGHT - BAR_WIDTH_INDENT) * -1;

// MESSAGE
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
  ctx.moveTo(x, y);
  ctx.lineTo(x + (CLOUD_WIDTH / 2), y + (CLOUD_HEIGHT - 260));
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + (CLOUD_WIDTH - 10), y + (CLOUD_HEIGHT / 2));
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + (CLOUD_WIDTH / 2), y + (CLOUD_HEIGHT - 10));
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + (CLOUD_WIDTH - 410), y + (CLOUD_HEIGHT / 2));
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

  // URL: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
};

var renderMessages = function (ctx) {
  ctx.fillStyle = MESSAGE_FONT_COLOR;
  ctx.font = MESSAGE_FONT;
  ctx.textBaseline = MESSAGE_FONT_BASELINE;
  ctx.fillText(MESSAGE_TEXT_HEADLINE, MESSAGE_START_POSITION, MESSAGE_TEXT_INDENT);
  ctx.fillText(MESSAGE_TEXT_RESULT, MESSAGE_START_POSITION, MESSAGE_TEXT_INDENT + MESSAGE_LINEHEIGHT);
};

var generateRandomColor = function () {
  return 'rgba(0, 0,' + Math.round(Math.random() * 255) + ', 1)';
};

var renderBars = function (ctx, times, names) {
  var barPositionX;
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {

    ctx.fillStyle = TEXT_COLOR;
    ctx.textBaseline = TEXT_BASELINE;

    barPositionX = CLOUD_X + BAR_WIDTH_INDENT + (BAR_WIDTH + BAR_WIDTH_INDENT) * i;

    ctx.fillText(Math.floor(times[i]), barPositionX, (barHeight * times[i]) / maxTime + MESSAGE_TIME_INDENT);
    ctx.fillText(names[i], barPositionX, CLOUD_HEIGHT - TEXT_INDENT);

    // устанавливает цвет гистограммы игрока
    // иначе, генерирует случайный синий цвет
    ctx.fillStyle = names[i] === TEXT_USER_NAME ? BAR_PLAYER_COLOR : generateRandomColor();

    ctx.fillRect(CLOUD_X + BAR_WIDTH_INDENT + (BAR_WIDTH + BAR_WIDTH_INDENT) * i, CLOUD_HEIGHT - TEXT_HEIGHT, BAR_WIDTH, (barHeight * times[i]) / maxTime);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_INDENT, CLOUD_Y + SHADOW_INDENT, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  renderMessages(ctx);
  renderBars(ctx, times, names);
};
