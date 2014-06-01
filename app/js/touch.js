var DOM = require('./DOM')
var card = require('./cards')
var buttons = require('./buttons')

var dragRight = Hammer(DOM.cardList).on("swipeleft", function(event) {
  console.log('swiped!');
  buttons.next();
})

var tapNext = Hammer(DOM.next).on("tap", function(event) {
  buttons.next();
})
