'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 270;
var GAP = 50;
var FONT_GAP = GAP / 2;
var TEXT_HEIGHT = 40;
var BAR_WIDTH = 40;
var barHeight = (CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP) * -1;
var CLOUD_TITLE_GAP = 40;
var TIME_GAP = 210;
var playerBarColor = 'rgba(255, 0, 0, 1)';

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
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 16px PT Mono';
  ctx.textBaseline = 'baseline';
  ctx.fillText('Ура вы победили!', CLOUD_X + (GAP / 2), CLOUD_TITLE_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + (GAP / 2), CLOUD_TITLE_GAP + 16 * 1.2);
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {

    ctx.fillStyle = '#000000';
    ctx.textBaseline = 'hanging';
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, (barHeight * times[i]) / maxTime + TIME_GAP);
    ctx.fillText(names[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_Y - FONT_GAP);

    // устанавливает цвет гистограммы игрока
    // иначе, генерирует случайный синий цвет
    if (names[i] === 'Вы') {
      ctx.fillStyle = playerBarColor;
    } else {
      ctx.fillStyle = 'rgba(0, 0,' + Math.round(Math.random() * 255) + ', 1)';

    }
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_Y - TEXT_HEIGHT, BAR_WIDTH, (barHeight * times[i]) / maxTime);
  }
};
