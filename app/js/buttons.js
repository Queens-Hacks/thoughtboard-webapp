var DOM = require('./DOM');
var cards = require('./cards');

DOM.heart.addEventListener('click', function(){alert('hi');}, true);
DOM.heart.parentNode.removeChild(DOM.heart);