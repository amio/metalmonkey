import browser from 'webextension-polyfill'
import { genId } from './store.js'

export default function setupInstaller () {
  // Blocking requests for "*.user.js"
  browser.webRequest.onHeadersReceived.addListener(
    userjsRequestListener,
    {
      urls: ['https://*/*.user.js'],
      types: ['main_frame']
    },
    ['blocking', 'responseHeaders']
  )
}

function userjsRequestListener (details) {
  const isUserjs = details.responseHeaders.find(header => {
    return header.name.toLowerCase() === 'content-type' && /javascript/.test(header.value)
  })

  if (isUserjs) {
    browser.tabs.create({
      'url': browser.extension.getURL(`main.html#/install/${genId(details.url)}`)
    })
    return { redirectUrl: 'javascript:history.back()' }
  } else {
    return {}
  }
}
