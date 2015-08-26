import { log } from './helper'
import { getMatchedUserscripts } from './registry'

export { initInjectorListener }

function initInjectorListener () {
  chrome.tabs.onUpdated.addListener(function (tabId, changed, tab) {
    // log('Update->', changed, tab)
    if (changed.status === 'loading') usInjector(tab)
  })
}

function usInjector (tab) {
  getMatchedUserscripts(tab.url)
    .then(function (matchedUss) {
      matchedUss.forEach((us) => {
        chrome.storage.local.get(us.usid, function (script) {
          const cfg = {
            code: script[us.usid],
            runAt: (script.runAt || 'document_end').replace('-', '_')
          }
          chrome.tabs.executeScript(tab.id, cfg)
        })
      })
    })
    .catch(log)
}
