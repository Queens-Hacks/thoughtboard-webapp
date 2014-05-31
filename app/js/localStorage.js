function isSupported() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function handleStorage(e) {
  if (!e) {
    e = window.event;
  }
}

if (!localStorage['score']) {
  localStorage['score'] = 0;
}

window.addEventListener('storage', handle_storage, false);

module.exports = isSupported;
