const usp = require('userscript-parser')
const reg = require('./registry')
import * as dev from './dev-helper.js'

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
  dev.log(isUserJS, isFromExtension, details)

  if (!isUserJS || isFromExtension) return

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

  return {
    redirectUrl: 'javascript:history.back()'
  }
}
