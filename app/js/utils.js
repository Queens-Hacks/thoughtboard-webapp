function abort(message) {
  if (!message) {
    message = "Omg abort"
  }
  alert(message);
};

module.exports = {
  abort: abort
};