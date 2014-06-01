var DOM = require('./DOM');
var utils = require('./utils');
var server = require('./server');

function pushCard(message, id) {
  var cardList = DOM.cardList;
  var li = document.createElement('li');
  var vcent = document.createElement('div');
  var p = document.createElement('p');
  var randColor = _.random(0, utils.hexList.length - 1);

  vcent.className = 'vcent';
  p.textContent = message;

  li.style.backgroundColor = utils.hexList[randColor];

  li.appendChild(vcent);
  li.appendChild(p);
  cardList.insertBefore(li, cardList.firstChild);
  activeCards.push(new Card(li, id));
}

function shiftCard() {
  var activeCardsLength = activeCards.length;
  if (activeCardsLength) {
    var card = activeCards.shift(), length = activeCards.length;
    card.remove();
    return length;
  }
}

function populate(response) {
  response.content.forEach(function(card) {
    pushCard(card.message, card.id);
  });
}

function remove(e) {
  var el = this.el;
  if (!e || e.propertyName == 'transform' && e.target === el) {
    el.parentNode.removeChild(el);
  }
}

function currentId() {
  return activeCards[0].id;
}

function Card(el, id) {
  this.el = el;
  this.id = id;
}

var activeCards = [];

Card.prototype.remove = function() {
  var el = this.el;
  if (Modernizr.transitionend) {
    transitionEnd(el).bind(remove.bind(this));
  } else {
    window.setTimeout(remove.bind(this), 400);
  }
  this.el.classList.add('leave');
}

module.exports = {
  populate: populate,
  shift: shiftCard,
  currentId: currentId
};
