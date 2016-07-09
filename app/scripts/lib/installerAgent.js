export default function () {
  // Blocking request for "*.user.js"
  chrome.webRequest.onBeforeRequest.addListener(
    userscriptAgent,
    { urls: ['*://*/*.user.js'] },
    ['blocking']
  )

  function userscriptAgent (details) {
    // Only deal with userscripts request by 'main_frame'
    // (bypass requests for <script />, etc.)
    if (details.type !== 'main_frame') return

    const indexURL = chrome.extension.getURL('install.html')
    chrome.tabs.create({'url': `${indexURL}?script=${details.url}`})

    return {
      redirectUrl: 'javascript:history.back()'
    }
  }
}
