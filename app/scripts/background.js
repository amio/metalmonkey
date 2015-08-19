import { log } from './lib/dev-helper'
import { initInstallerAgent } from './lib/installer'
import { getMatchedUserscripts } from './lib/registry'

chrome.browserAction.setBadgeText({
  text: 'Metal'
})

versionCheck()
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
  },
  //
  'runmyscripts': function (request, sender, sendResponse) {
    getMatchedUserscripts(sender.url)
      .then(function (matchedUsids) {
        matchedUsids.forEach((usid) => {
          chrome.storage.local.get(usid, function (script) {
            // log(sender.tab.id, script[usid])
            chrome.tabs.executeScript(sender.tab.id, { code: script[usid] })
          })
        })
      })
      .catch(log)

  }
}

function versionCheck () {
  chrome.runtime.onInstalled.addListener(function (details) {
    log('previousVersion', details.previousVersion)
  })
}
