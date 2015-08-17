import { log } from './lib/dev-helper'
import { initInstallerAgent } from './lib/installer'

chrome.runtime.onInstalled.addListener(function(details) {
  log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({
  text: '\'Allo'
});

log('\'Allo \'Allo! Event Page for Browser Action');

initInstallerAgent()
