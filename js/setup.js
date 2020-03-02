'use strict';
var WIZARD_NAME = ['Иван', 'Хуман Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_LASTNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

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

setupOpenIcon.tabIndex = 0;
setupClose.tabIndex = 0;


setupClose.addEventListener("focusin", () => {
  setupClose.addEventListener('keydown', (event) => {
    if (event.keyCode == 13) {
      setup.classList.add('hidden');
    }
  })
})

setupOpenIcon.addEventListener("focusin", () => {

  setupOpenIcon.addEventListener('keydown', (event) => {
    if (event.keyCode == 13) {
      setup.classList.remove('hidden');
    }
  })
});

setupOpen.addEventListener('click', () => {
  setup.classList.remove('hidden');
})

var flagFocus = true;
setName.addEventListener("focusin", (focusin) => {
  flagFocus = !focusin;

})

setName.addEventListener("focusout", (focusout) => {
  flagFocus = focusout;
})


window.addEventListener('keydown', (keydown) => {
  if (keydown.keyCode == 27 && flagFocus) {
    setup.classList.add('hidden')
  }
  //keydown.preventDefault();
})


setupClose.addEventListener('click', () => {
    setup.classList.add('hidden');
})

