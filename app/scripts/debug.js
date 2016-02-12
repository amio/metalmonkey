
window.db = {
  // Log chrome.storage.local content
  local: function (cb) {
    chrome.storage.local.get(null, items => {
      if (typeof cb === 'function') {
        cb(items)
      } else {
        console.log(items)
      }
    })
  }
}
