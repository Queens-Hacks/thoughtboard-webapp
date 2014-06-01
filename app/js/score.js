var DOM = require('./DOM');

function isSupported() {
  return Modernizr.localstorage;
}

function addPoints(points) {
  var newScore = localStorage['score'] + points;
  localStorage['score'] = newScore;
  DOM.score.textContent = newScore;
}

if (!localStorage['score']) {
  localStorage['score'] = 0;
}

module.exports = {
  isSupported: isSupported,
  addPoints: addPoints
};
