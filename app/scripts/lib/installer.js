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
  // Only deal with userscripts request by 'main_frame' request
  // const isUserJS = /\.user\.js$/.test(details.url)
  const byUserRequest = details.type === 'main_frame'

  if (!byUserRequest) return

  const indexURL = chrome.extension.getURL('index.html')
  const installURL = indexURL + '#/install/' + encodeURIComponent(details.url)
  chrome.tabs.create({'url': installURL})

  return {
    redirectUrl: 'javascript:history.back()'
  }
}
