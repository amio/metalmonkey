import { log } from './lib/helper'
import initInstallerAgent from './lib/installerAgent'
import initInjectorAgent from './lib/injectorAgent'

versionCheck()

// Intercept *.user.js link click
initInstallerAgent()

// Listener on every webpage, for injecting userscripts.
initInjectorAgent()

function versionCheck () {
  chrome.runtime.onInstalled.addListener(function (details) {
    log('previousVersion', details.previousVersion)
  })
}
