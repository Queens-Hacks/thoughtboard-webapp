var DOM = require('./DOM');
var cards = require('./cards');
var score = require('./score');

function next() {
  var cardId = cards.shift();
  if (heartState) {
//    server.send('upvote', userId, cardId);
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
