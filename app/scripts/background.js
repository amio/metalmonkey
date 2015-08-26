import { log } from './lib/helper'
import { initInstallerAgent } from './lib/installer'
import { initInjectorListener } from './lib/injector'

versionCheck()
initInjectorListener()
initInstallerAgent()

// Response to messages
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (typeof messageHandlers[request.title] === 'function') {
    messageHandlers[request.title](request, sender, sendResponse)
  }
})

const messageHandlers = {
  //
  'whoami': function (request, sender, sendResponse) {
    sendResponse(sender.tab)
  }
}

function versionCheck () {
  chrome.runtime.onInstalled.addListener(function (details) {
    log('previousVersion', details.previousVersion)
  })
}
