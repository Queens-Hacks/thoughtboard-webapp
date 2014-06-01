var DOM = require('./DOM')
var card = require('./cards')
var buttons = require('./buttons')

var hasTouch = {
  'heart' : false,
  'swipe': false,
  'navigate' : false
}

var tapHeart = Hammer(DOM.heart).on("tap", function(event) {
  console.log('hearted!');
  buttons.heart();
})

var dragRight = Hammer(DOM.cardList).on("dragright", function(event) {
  console.log('dragged Right!');
  if (!hasTouch.navigate) {
    hasTouch.swipe = true;
  }
})

var tapNext = Hammer(DOM.next).on("tap", function(event) {
  console.log('tapped next!');
  buttons.next()
})

function resetStates() {
  _.map(hasTouch, function(touchItem) {
    touchItem = false;
  });
  console.log("reset touch: " + hasTouch.heart);
}

module.exports = {
  hasTouch: hasTouch,
  reset: resetStates
}
