var DOM = require('./DOM');

function pushCard(message, id) {
  var cardList = DOM.cardList;
  var li = document.createElement('li');
  var vcent = document.createElement('div');
  var p = document.createElement('p');

  vcent.className = 'vcent';
  p.textContent = message;

  li.appendChild(vcent);
  li.appendChild(p);
  cardList.insertBefore(li, cardList.firstChild);
  activeCards.push(new Card(li, id));
}

function shiftCard() {
  var activeCardsLength = activeCards.length;
  if (activeCardsLength) {
    var card = activeCards.shift(), id = card.id;
    card.remove();
    // lazyload new cards
    if (activeCardsLength < 5) {
      populate(10);
    }
    return id;
  }
}

function populate(amount) {
  // get <amount> cards from the server. Dummy var:
  var cards = [
                ['Hello I am won', 1],
                ['Hello I am too', 2],
                ['Hello I am tree', 3],
                ['Hello I am for', 4],
                ['Hello I am fooglyive', 5],
                ['Hello I am sex', 6],
                ['Hello I am saven', 7],
                ['Hello I am ate', 8],
                ['Hello I am nein', 9],
                ['Hello I am then', 10]
  ];

  cards.forEach(function(args) {
    pushCard(args[0], args[1]);
  });
}

function remove(e) {
  var el = this.el;
  if (!e || e.propertyName == 'transform' && e.target === el) {
    el.parentNode.removeChild(el);
  }
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
  shift: shiftCard
};
