export default function () {
  // Blocking requests for "*.user.js"
  chrome.webRequest.onHeadersReceived.addListener(
    userscriptRequestListener,
    requestFilter,
    extraInfoSpec
  )
}

const requestFilter = {
  urls: ['https://*/*.user.js'],
  types: ['main_frame']
}

const extraInfoSpec = ['blocking', 'responseHeaders']

function userscriptRequestListener (details) {
  if (isUserScript(details.responseHeaders)) {
    const installerPage = chrome.extension.getURL('installer.html')
    chrome.tabs.create({'url': `${installerPage}?script=${details.url}`})
    return { redirectUrl: 'javascript:history.back()' }
  } else {
    return {}
  }
}

function isUserScript (headers) {
  const metas = headers.reduce((meta, curr) => {
    if (curr.name === 'Content-Type') {
      meta.isHTML = /html/.test(curr.value)
      meta.isScript = /javascript/.test(curr.value)
    }
    return meta
  }, {})

  return !metas.isHTML // todo: need more accurate detection
}
