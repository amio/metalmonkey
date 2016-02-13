import { log } from './lib/helper'
import initUserscriptAgent from './lib/agent'
import initInjector from './lib/injector'

versionCheck()

// Intercept *.user.js link click
initUserscriptAgent()

// Listener on every webpage, for injecting userscripts.
initInjector()

function versionCheck () {
  chrome.runtime.onInstalled.addListener(function (details) {
    log('previousVersion', details.previousVersion)
  })
}
