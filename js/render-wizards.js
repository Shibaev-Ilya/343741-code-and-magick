'use strict';
(function () {

  var WIZARD_QUANTITY = 4;

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var userDialogElement = document.querySelector('.setup');
  var similarListElement = userDialogElement.querySelector('.setup-similar-list');
  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var onLoadWizardsSuccess = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARD_QUANTITY; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialogElement.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onLoadWizardsError = function (error) {
    window.errorMessage.create(error);
  };

  window.backend.load(onLoadWizardsSuccess, onLoadWizardsError);
})();
