'use strict';
var WIZARD_NAME = ['Иван', 'Хуман Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_LASTNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


var setup = document.querySelector('.setup');
var setName = document.querySelector('.setup-user-name');
var userNameInput = setup.querySelector('.setup-user-name');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

var generateWizards = function (name, lastName, coatColor, eyeColor, count) {
  var wizards = [];
  var Wizard = function (wizardName, wizardLastName, wizardCoatColor, wizardEyeColor) {
    this.name = wizardName[randomInteger(0, wizardName.length - 1)];
    this.lastName = wizardLastName[randomInteger(0, wizardLastName.length - 1)];
    this.coatColor = wizardCoatColor[randomInteger(0, wizardCoatColor.length - 1)];
    this.eyeColor = wizardEyeColor[randomInteger(0, wizardEyeColor.length - 1)];
  };

  for (var i = 0; i < count; i++) {
    var newWizard = new Wizard(name, lastName, coatColor, eyeColor);
    wizards.push(newWizard);
  }

  return wizards;
};

var wizards = generateWizards(WIZARD_NAME, WIZARD_LASTNAME, WIZARD_COAT_COLOR, WIZARD_EYE_COLOR, 4);

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name + ' ' + wizards[i].lastName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyeColor;
  fragment.appendChild(wizardElement);
}
similarListElement.appendChild(fragment);

var setStyleWizard = function (wizard, partWizard, colors, inputId, elementId) {
  var form = document.forms[0];
  var fireballFill = document.querySelector('.setup-fireball-wrap');
  var count = 0;
  partWizard.addEventListener('click', function () {
    if (count < colors.length) {
      if (elementId === null) {
        fireballFill.style.background = colors[count];
      } else {
        wizard.querySelector(elementId).style.fill = colors[count];
      }
      form.elements.namedItem(inputId).value = colors[count];
      count++;
    } else {
      count = 0;
    }
  });
};

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity(
        'Имя должно состоять минимум из ' +
      MIN_NAME_LENGTH +
      '-х символов'
    );
  } else {
    target.setCustomValidity('');
  }
});

var wizardStyle = document.querySelector('.setup-wizard');

var fireballFill = document.querySelector('.setup-fireball-wrap');
setStyleWizard(wizardStyle, fireballFill, FIREBALL_COLOR, 'fireball-color', null);

var wizardEyesFill = wizardStyle.querySelector('.wizard-eyes');
setStyleWizard(wizardStyle, wizardEyesFill, WIZARD_EYE_COLOR, 'eyes-color', '.wizard-eyes');

var wizardCoatFill = wizardStyle.querySelector('.wizard-coat');
setStyleWizard(wizardStyle, wizardCoatFill, WIZARD_COAT_COLOR, 'coat-color', '.wizard-coat');


setName.addEventListener('focusin', function (evt) {
  flagFocus = !evt;
});

setName.addEventListener('focusout', function (evt) {
  flagFocus = evt;
});

window.addEventListener('keydown', function (keydown) {
  if (keydown.key === utils.ESC_KEY && flagFocus) {
    setup.classList.add('hidden');
  }
});



var dialogHandle = setup.querySelector('.upload');

dragging.setDragging(dialogHandle);
