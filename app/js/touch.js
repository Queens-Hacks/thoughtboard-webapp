var DOM = require('./DOM');

var tappedHeart = false;
var tappedNext = false;
var dragRight = false;

var hasTouch = {
  'heart' : false,
  'swipe': false,
  'navigate' : false
};

var tapHeart = Hammer(DOM.heart).on("tap", function(event) {
  console.log('hearted!');
  if (!tappedHeart) {
    hasTouch.heart = true;
  }
});

var dragRight = Hammer(DOM.cardList).on("dragright", function(event) {
  console.log('dragged Right!');
  if (!dragRight) {
    hasTouch.swipe = true;
  }
});

var tapNext = Hammer(DOM.next).on("tap", function(event) {
  console.log('tapped next!');
  if (!tappedNext) {
    hasTouch.navigate = true;
  }
});

function resetStates() {
  _.map(hasTouch, function(touchItem) {
    touchItem = false;
  });
  console.log("reset touch: " + hasTouch.heart);
};

module.exports = {
  hasTouch: hasTouch,
  reset: resetStates
};
