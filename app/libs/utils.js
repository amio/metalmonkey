import browser from 'webextension-polyfill'

// background-log
function blog (...args) {
  browser.runtime.sendMessage({
    type: 'background-log',
    obj: args
  })
}

export {
  blog
}
