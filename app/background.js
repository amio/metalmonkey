import browser from 'webextension-polyfill'
import setupInstaller from './libs/setup-installer.js'

// Open main.html when click browser_action icon
browser.browserAction.onClicked.addListener(tab => {
  // TODO: Switch to tab if it's already open
  browser.tabs.create({
    url: browser.extension.getURL('main.html')
  })
})

setupInstaller()
