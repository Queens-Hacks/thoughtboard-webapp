var buttons = require('./buttons');
var cards = require('./cards');
var DOM = require('./DOM');
var geo = require('./geo');
var newMsg = require('./newMessage');
var score = require('./score');
var server = require('./server');
var touch = require('./touch');
var utils = require('./utils');

Modernizr.transitionend = !!transitionEnd(document.body).whichTransitionEnd();

if (!score.isSupported) {
  utils.abort('Get a better browser you dummy');
} else {
  DOM.score.textContent = score.get();
}

server.init();

// alert('Welcome! Once you\'ve looked through a few submissions you can submit a thought of your own.');
