var DOM = require('./DOM');

function isSupported() {
  return Modernizr.localstorage;
}

function addPoints(points) {
  var newScore = parseInt(localStorage.score) + points;
  localStorage.score = newScore;
  DOM.score.textContent = newScore;
}

function get() {
  return localStorage.score;
}

if (!localStorage.score) {
  localStorage.score = 0;
}

module.exports = {
  isSupported: isSupported,
  addPoints: addPoints,
  get: get
};
