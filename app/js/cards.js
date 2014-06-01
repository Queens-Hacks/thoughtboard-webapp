var DOM = require('./DOM');

function pushCard(message, id) {
  var card = document.createElement('li');
  DOM.cardList.appendChild(card);
  cardList.push(new Card(el, id));
}

function shiftCard() {
  cardList.shift().remove();
}

function remove(e) {
  var el = this.el;
  if (e.target === el) {
    el.parentNode.removeChild(el);
  }
}

function Card(el, id) {
  this.el = el;
  this.id = id;
}

var cardList = [];

Card.prototype.remove = function() {
  this.addEventListener('transitionend', remove.bind(this), true);
  this.el.classList.add('leave');
}

module.exports = {
  push: pushCard,
  shift: shiftCard
};
