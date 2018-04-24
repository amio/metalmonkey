import browser from 'webextension-polyfill'
import setupInstaller from './libs/setup-installer.js'

setupInstaller()

// Open main.html when click browser_action icon
browser.browserAction.onClicked.addListener(tab => {
  // TODO: Switch to tab if it's already open
  browser.tabs.create({
    url: browser.extension.getURL('main.html')
  })
})

// TODO: Wait for chrome to support `browser.contentScripts` api
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contentScripts
//
// Insert install-button to npmjs.com
// browser.contentScripts.register({
//   matches: ['https://www.npmjs.com/package/*'],
//   js: {
//     file: 'content.js'
//   }
// })
