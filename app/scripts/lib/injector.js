import { log } from './helper'
import { getMatchedUserscripts } from './registry'

function initInjectorListener () {
  chrome.tabs.onUpdated.addListener(function (tabId, changed, tab) {
    if (changed.status === 'loading') {
      getMatchedUserscripts(tab.url)
        .then(matched => userscriptInjector(tabId, matched))
        .catch(log)
    }
  })
}

function userscriptInjector (tabId, matchedUss) {
  // Update badge
  chrome.browserAction.setBadgeText({
    tabId: tabId,
    text: matchedUss.length.toString()
  })

  // Inject userscripts
  matchedUss.forEach((userscriptMeta) => {
    // Prepare GM_* api
    chrome.tabs.executeScript(tabId, {
      file: 'scripts/gm-api.js',
      runAt: 'document_start'
    }, function () {
      if (chrome.runtime.lastError) {
        console.error('Error in gm-api.js')
        return
      }
      // Init GM_* api for this userscript
      chrome.tabs.executeScript(tabId, {
        code: `initGreasemonkeyApi(${userscriptMeta.usid})`
      }, function () {
        // inject this userscript
        chrome.storage.local.get(userscriptMeta.usid, function (script) {
          chrome.tabs.executeScript(tabId, {
            code: script[userscriptMeta.usid],
            runAt: (script.runAt || 'document_end').replace('-', '_')
          })
        })
      })
    })

  })
}

export { initInjectorListener }
