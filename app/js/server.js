var cards = require('./cards');

function getRequest(url, fn) {
  if (typeof fn !== 'function') return false;

  request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    console.dir(request);
    var status = request.status;
    if (status >= 200 && status < 400){
      fn(JSON.parse(request.responseText));
    } else {
      throw new Error('Request to server resulted in error code ' + status);
    }
  };

  request.onerror = function() {
    throw new Error('Request to server resulted in error code ' + status);
  };

  request.send();
}

function getId(hash, fn) {
  var userId = localStorage['userId'];
  if (!localStorage['userId']) {
    userId = getRequest(baseUrl + 'get-id?hash=' + hash, fn);
  } else {
    fn(userId);
  }
}

function getCards(amount, fn) {
  getRequest(baseUrl + 'cards?' + uid + '&amount=' + amount, fn);
}

function upvote(cardId) {
  var postRequest = new XMLHttpRequest();
  postRequest.open('POST', baseUrl + 'upvote?' + uid + '&cardId=' + cardId, true);
  postRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  postRequest.send(cardId);
}

function init() {
  getId(window.location.hash.slice(1), function(id) {
    localStorage['userId'] = id;
    userId = id;
    uid = 'userId=' + userId;
    // initial list population
    getCards(10, cards.populate);
  });
}

var baseUrl = 'http://qbattlehack.herokuapp.com/webapp/';
var userId, uid;

module.exports = {
  init: init,
  upvote: upvote
};
