var geoLocation = require('geo');
var localStorage = require('localStorage');
var utils = require('utils');

if (!localStorage.isSupported) {
  utils.abort('Get a better browser you dummy');
}
