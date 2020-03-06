'use strict';
var WIZARD_NAME = ['Иван', 'Хуман Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_LASTNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEY = 'Escape';

var ENTER_KEY = 'Enter';

//document.querySelector('.setup').classList.remove('hidden');
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

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupClose = document.querySelector('.setup-close');
var setName = document.querySelector('.setup-user-name');
var userNameInput = setup.querySelector('.setup-user-name');
var wizardStyle = document.querySelector('.setup-wizard');


var wizardCoatFill = wizardStyle.querySelector('.wizard-coat');
var wizardEyesFill = wizardStyle.querySelector('.wizard-eyes');

var fireballFill = document.querySelector('.setup-fireball-wrap');



var countFireballColor = 0;
var form = document.forms[0];
fireballFill.addEventListener('click', () => {
  if (FIREBALL_COLOR.length > 0) {
    fireballFill.style.background = FIREBALL_COLOR[FIREBALL_COLOR.length-1];
    form.elements.namedItem('fireball-color').value = FIREBALL_COLOR[FIREBALL_COLOR.length-1];
    FIREBALL_COLOR.length--
  }
  else {
    countFireballColor = 0;
  }
})
var countEyeColor = 0;
wizardEyesFill.addEventListener('click', () => {
  if (countEyeColor < WIZARD_EYE_COLOR.length) {
    wizardStyle.querySelector('.wizard-eyes').style.fill = WIZARD_EYE_COLOR[countEyeColor];
    form.elements.namedItem('eyes-color').value = WIZARD_EYE_COLOR[countEyeColor];
    countEyeColor++
  }
  else {
    countEyeColor = 0;
  }
})
var countCoatColor = 0;
wizardCoatFill.addEventListener('click', () => {
  if (countCoatColor < WIZARD_COAT_COLOR.length) {
    wizardStyle.querySelector('.wizard-coat').style.fill = WIZARD_COAT_COLOR[countCoatColor];
    form.elements.namedItem('coat-color').value = WIZARD_COAT_COLOR[countCoatColor];
    countCoatColor++
  }
  else {
    countCoatColor = 0;
  }
})

var flagFocus = true;

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && flagFocus) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};



setupClose.addEventListener('keydown', (evt) => {
  if (evt.key == ENTER_KEY) {
    closePopup();
  }
})




  setupOpenIcon.addEventListener('keydown', (evt) => {
    if (evt.key == ENTER_KEY) {
      openPopup();
    }
  })


setupOpen.addEventListener('click', () => {
  openPopup();
})


setName.addEventListener("focusin", (focusin) => {
  flagFocus = !focusin;

})

setName.addEventListener("focusout", (focusout) => {
  flagFocus = focusout;
})


window.addEventListener('keydown', (keydown) => {
  if (keydown.key == ESC_KEY && flagFocus) {
    setup.classList.add('hidden')
  }
})


setupClose.addEventListener('click', () => {
  closePopup();
})






userNameInput.addEventListener('invalid', function (evt) {
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
