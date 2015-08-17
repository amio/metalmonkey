const usp = require('userscript-parser')
const reg = require('./registry')
import { log } from './dev-helper.js'

export function initInstallerAgent () {
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
  log('[Installer] isUserJS:%s, isFromExtension:%s, detail:', isUserJS, isFromExtension, details)

  if (!isUserJS || isFromExtension) return

  fetch(details.url)
    .then(function (response) {
      return response.text()
    })
    .then(function (text) {
      return reg.add(details.url, text)
    })

  return {
    redirectUrl: 'javascript:history.back()'
  }
}
