var DOM = require('./DOM');
var score = require('./score');

function toggle() {
  if (!DOM.newMsg.classList.contains('show')) {
    if (score.get() < 5) {
      console.log('Unsufficient funds');
    }
    else {
      DOM.newMsg.classList.toggle('show');
      DOM.plus.classList.remove('fa-plus-circle');
      DOM.plus.classList.add('fa-arrow-circle-up');
      // fa-arrow-circle-up
    }
  } else if (DOM.newMsg.classList.contains('show')) {
    DOM.newMsg.classList.toggle('show');
    DOM.plus.classList.remove('fa-arrow-circle-up');
    DOM.plus.classList.add('fa-plus-circle');
  }
}

function sendMessage() {
  if (score.get() < 5) {
    return false;
  }
  //TODO
}

DOM.topBar.addEventListener('click', toggle, true);
