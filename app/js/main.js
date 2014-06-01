var buttons = require('./buttons');
var cards = require('./cards');
var DOM = require('./DOM');
var geo = require('./geo');
var score = require('./score');
var utils = require('./utils');

Modernizr.transitionend = !!transitionEnd(document.body).whichTransitionEnd();

if (!score.isSupported) {
  utils.abort('Get a better browser you dummy');
} else {
  DOM.score.textContent = score.get();
}

cards.populate(10);

// alert('Welcome! Once you\'ve looked through a few submissions you can submit a thought of your own.');
