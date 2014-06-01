var DOM = require('./DOM');
var cards = require('./cards');
var score = require('./score');
var server = require('./server');

function next() {
  var cardId = cards.currentId();
  var length = cards.shift();
  if (heartState) {
    server.upvote(cardId);
    DOM.heart.classList.remove('active');
    heartState = false;
  }
  // lazyload new cards
  if (length < 5) {
    server.getCards(10, cards.populate);
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
