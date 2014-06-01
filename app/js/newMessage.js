var DOM = require('./DOM');
var score = require('./score');
var server = require('./server');

function toggle() {
  if (score.get() >= 5) {
    DOM.newMsg.classList.toggle('show');
    DOM.plus.classList.toggle('fa-plus-circle');
    DOM.plus.classList.toggle('fa-arrow-circle-up');
  } else {
    console.log('Insufficient funds');
  }
}

DOM.topBar.addEventListener('click', toggle, true);
