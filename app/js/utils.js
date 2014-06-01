function abort(message) {
  if (!message) {
    message = "Omg abort";
  }
  alert(message);
}

var hexList = [
  "#E57871",
  "#D3C084",
  "#CEEB94",
  "#C8E7D8"
]

module.exports = {
  abort: abort,
  hexList: hexList
}
