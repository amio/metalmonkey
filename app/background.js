import browser from 'webextension-polyfill'
import setupInstaller from './libs/setup-installer.js'
import setupInjector from './libs/setup-injector.js'

// Intercept *.user.js url opening
setupInstaller()

// Listener on every webpage, for injecting userscripts.
setupInjector()

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

// Open main.html when click browser_action icon
browser.browserAction.onClicked.addListener(tab => {
  // TODO: Switch to tab if it's already open
  browser.tabs.create({
    url: browser.extension.getURL('main.html')
  })
})
