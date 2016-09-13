import { log } from './lib/helper'
import initInstallerAgent from './lib/installerAgent'
import initInjectorAgent from './lib/injectorAgent'

versionCheck()

// Intercept *.user.js url opening
initInstallerAgent()

// Listener on every webpage, for injecting userscripts.
initInjectorAgent()

function versionCheck () {
  chrome.runtime.onInstalled.addListener(function (details) {
    log('previousVersion', details.previousVersion)
  })
}

chrome.runtime.onMessage.addListener(
  // https://developer.chrome.com/extensions/messaging
  function (request, sender, sendResponse) {
    switch (request.action) {
      case 'register-userscript':
        console.log('register-userscript')
        break
      case 'greeting':
        sendResponse({farewell: 'goodbye'})
        break
      default:
        console.log('Unknown Message', request)
    }
  })
