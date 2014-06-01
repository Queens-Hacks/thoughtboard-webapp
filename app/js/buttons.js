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

function toggleTop() {
  if (score.get() >= 5) {
    DOM.newForm.classList.toggle('show');
    DOM.plus.classList.toggle('fa-plus-circle');
    DOM.plus.classList.toggle('fa-arrow-circle-up');
  } else {
    console.log('Insufficient funds');
  }
}

function submit(e) {
  var textarea;
  e.preventDefault();

  if (score.get() >= 5) {
    textarea = DOM.newForm.newPost;
    server.submitPost(textarea.value);
    textarea.value = '';
  }
}

function init() {
  DOM.heart.addEventListener('click', heart, true);
  DOM.next.addEventListener('click', next, true);
  DOM.topBar.addEventListener('click', toggleTop, true);
  DOM.newForm.addEventListener('submit', submit, true);
}

var heartState = false;

module.exports = {
  next: next,
  init: init
};
