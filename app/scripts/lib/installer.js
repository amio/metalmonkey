const usp = require('userscript-parser')
const reg = require('./registry')

export function installer () {
  //
  chrome.webRequest.onBeforeRequest.addListener(
    installerAgent,
    { urls: ['*://*/*.user.js'] },
    [ 'blocking' ]
  )

}

function installerAgent (details) {
  // Only deal with userscripts request from webpage
  const isUserJS = /\.user\.js$/.test(details.url)
  const isFromExtension = details.tabId === -1

  console.log(isUserJS, isFromExtension, details)

  if (!isUserJS || isFromExtension) return

  setTimeout(function () {
    fetch(details.url)
      .then(function (response) {
        return response.text()
      })
      .then(function (text) {
        let newItem = {}
        newItem[details.url] = text
        chrome.storage.local.set(newItem)
        reg.add(details.url, text)
      })

  }, 4000)

  return {
    redirectUrl: 'javascript:history.back()'
  }
}
