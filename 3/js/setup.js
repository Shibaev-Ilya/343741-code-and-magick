'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_QUANTITY = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizards = function () {
  var similarWizards = generateWizards();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < similarWizards.length; i++) {
    fragment.appendChild(renderWizard(similarWizards[i]));
  }
  similarListElement.appendChild(fragment);
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.lastName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var generateWizards = function () {
  var wizards = [];
  for (var i = 0; i < WIZARD_QUANTITY; i++) {
    var wizardName = WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)];
    var wizardLastName = WIZARD_LASTNAMES[Math.floor(Math.random() * WIZARD_LASTNAMES.length)];
    var wizardCoatColor = WIZARD_COAT_COLOR[Math.floor(Math.random() * WIZARD_COAT_COLOR.length)];
    var wizardEyeColor = WIZARD_EYES_COLOR[Math.floor(Math.random() * WIZARD_EYES_COLOR.length)];
    wizards.push({
      name: wizardName,
      lastName: wizardLastName,
      coatColor: wizardCoatColor,
      eyesColor: wizardEyeColor
    });
    WIZARD_NAMES.splice(wizardName, 1);
    WIZARD_LASTNAMES.splice(wizardLastName, 1);
    WIZARD_COAT_COLOR.splice(wizardCoatColor, 1);
    WIZARD_EYES_COLOR.splice(wizardEyeColor, 1);
  }
  return wizards;
};

userDialog.querySelector('.setup-similar').classList.remove('hidden');
renderWizards();
