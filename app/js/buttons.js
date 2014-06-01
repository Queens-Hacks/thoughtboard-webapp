var DOM = require('./DOM');
var cards = require('./cards');
var score = require('./score');

function next() {
  var id = cards.shift();
  if (heartState) {
    // send id to server for upvote
    DOM.heart.classList.remove('active');
    heartState = false;
  }
  score.addPoints(1);
}

function heart() {
  DOM.heart.classList[heartState ? 'remove' : 'add']('active');
  heartState = !heartState;
}

var heartState = false;

DOM.heart.addEventListener('click', heart, true);
DOM.next.addEventListener('click', next, true);
