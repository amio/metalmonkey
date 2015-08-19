import { registerUserscript } from './registry'

export { initInstallerAgent }

function initInstallerAgent () {
  //
  chrome.webRequest.onBeforeRequest.addListener(
    installerAgent,
    { urls: ['*://*/*.user.js'] },
    ['blocking']
  )

}

function installerAgent (details) {
  // Only deal with userscripts request from webpage
  const isUserJS = /\.user\.js$/.test(details.url)
  const isFromExtension = details.tabId === -1

  if (!isUserJS || isFromExtension) return

  fetch(details.url)
    .then(function (response) {
      return response.text()
    })
    .then(function (text) {
      return registerUserscript(details.url, text)
    })

  return {
    redirectUrl: 'javascript:history.back()'
  }
}
