import { log } from './dev-helper'
import { getMatchedUserscripts } from './registry'

export { initInjectorListener }

function initInjectorListener () {
  chrome.tabs.onCreated.addListener(function (tab) {
    // log('Create->', tab)
    if (tab.url) usInjector(tab)
  })

  chrome.tabs.onUpdated.addListener(function (tabId, changed, tab) {
    // log('Update->', changed, tab)
    if (changed.url) usInjector(tab)
  })
}

function usInjector (tab) {
  getMatchedUserscripts(tab.url)
    .then(function (matchedUss) {
      matchedUss.forEach((us) => {
        chrome.storage.local.get(us.usid, function (script) {
          const cfg = {
            code: script[us.usid],
            runAt: 'document_start'
          }
          chrome.tabs.executeScript(tab.id, cfg)
        })
      })
    })
    .catch(log)
}
