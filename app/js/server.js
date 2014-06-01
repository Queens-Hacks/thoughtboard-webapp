var cards = require('./cards');

function getRequest(url, fn) {
  if (typeof fn !== 'function') return false;

  request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    var status = request.status;
    if (status >= 200 && status < 400){
      fn(JSON.parse(request.responseText));
    } else {
      throw new Error('Request to server resulted in error code ' + status);
    }
  };

  request.onerror = function(error) {
    throw new Error('Request to server resulted in error code ' + status);
  };

  request.send();
}

function postRequest(url, data) {
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(data);
}

function checkIn(hash) {
  getRequest(baseUrl + 'check-in?' + uid + '&hash=' + hash, function() {return false;});
}

function getId(hash, fn) {
  var userId = localStorage['userId'];
  if (!userId) {
    getRequest(baseUrl + 'get-id?hash=' + hash, fn);
  } else {
    fn(userId, hash);
  }
}

function getCards(amount, fn) {
  getRequest(baseUrl + 'cards?' + uid + '&amount=' + amount, fn);
}

function upvote(cardId) {
  postRequest(baseUrl + 'upvote?' + uid + '&cardId=' + cardId, {
    cardId: cardId,
    userId: localStorage['userId']
  });
}

function submitPost(message) {
  postRequest(baseUrl + 'new-post?' + uid + 'message=' + message, {
    message: message,
    userId: localStorage['userId']
  });
}

function init() {
  getId(window.location.hash.slice(1) || 0, function(id, hash) {
    var extracted = id.userId;
    uid = 'userId=' + (extracted || id);
    if(extracted) {
      localStorage['userId'] = extracted;
    } else {
      checkIn(hash);
    }
    // initial list population
    getCards(10, cards.populate);
  });
}

var baseUrl = 'http://qbattlehack.herokuapp.com/webapp/';
var uid;

module.exports = {
  init: init,
  upvote: upvote,
  getCards: getCards,
  submitPost: submitPost
};
