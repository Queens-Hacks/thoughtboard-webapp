function getRequest(url, callback) {
  if (typeof callback !== 'function') return false;

  request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    var status = request.status;
    if (status >= 200 && status < 400){
      callback(JSON.parse(request.responseText));
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
  return getRequest(baseUrl + 'cards?' + uid + '&amount=' + amount, fn);
}

function upvote(cardId) {
  var postRequest = new XMLHttpRequest();
  postRequest.open('POST', baseUrl + 'upvote?userId=' + userId + '&cardId=' + cardId, true);
  postRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  postRequest.send(cardId);
}

var baseUrl = 'http://qbattlehack.herokuapp.com/webapp/';
var userId, uid;

getId(window.location.hash, function(id) {
  localStorage['userId'] = id;
  userId = id;
  uid = 'userId=' + userId;
});

module.exports = {
  getCards: getCards,
  upvote: upvote
};
