var cards = require('./cards');
var DOM = require('./DOM');
var geoLocation = require('./geo');
var score = require('./score');
var utils = require('./utils');

if (!score.isSupported) {
  utils.abort('Get a better browser you dummy');
}

// alert('Welcome! Once you\'ve looked through a few submissions you can submit a thought of your own.');

