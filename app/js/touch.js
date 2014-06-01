var DOM = require('./DOM');
var buttons = require('./buttons');

function init() {
  Hammer(DOM.cardList).on("swipeleft", function(event) {
    buttons.next();
  });

  Hammer(DOM.next).on("tap", function(event) {
    buttons.next();
  });
}

module.exports = {
  init: init
};
