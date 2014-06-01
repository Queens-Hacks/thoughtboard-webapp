var DOM = require('./DOM');

var tapHeart = Hammer(DOM.heart).on("tap", function(event) {
  console.log('hearted!');
});

var tapNext = Hammer(DOM.cardList).on("tap", function(event) {
  console.log('hearted!');
});

var swipeRight = Hammer(DOM.next).on("swiperight", function(event) {
  console.log('tapped right!');
});
