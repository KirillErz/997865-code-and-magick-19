'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var top =  setup.style.top;
  var left = setup.style.left;

  var flagFocus = true;

var onPopupEscPress = function (evt) {
  if (evt.key === utils.ESC_KEY && flagFocus) {
    closePopup();
  }
};

var openPopup = function () {
  setup.style.top = top;
  setup.style.left = left;
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === utils.ENTER_KEY) {
    closePopup();
  }
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.key === utils.ENTER_KEY) {
    openPopup();
  }
});

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupClose.addEventListener('click', function () {
  closePopup();
});


  window.dialog = {

  };
})();
