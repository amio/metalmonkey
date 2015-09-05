import { log } from './helper'
import { getMatchedUserscripts } from './registry'

function initInjectorListener () {
  // chrome.tabs.onCreated.addListener(function (tab) {
  //   usInjector(tab)
  // })
  chrome.tabs.onUpdated.addListener(function (tabId, changed, tab) {
    if (changed.status === 'loading') {
      getMatchedUserscripts(tab.url)
        .then(matched => usInjector(tabId, matched))
        .catch(log)
    }
  })
}

function usInjector (tabId, matchedUss) {
  // Update badge
  chrome.browserAction.setBadgeText({
    tabId: tabId,
    text: matchedUss.length.toString()
  })

  // Inject userscripts
  matchedUss.forEach((usMeta) => {
    chrome.storage.local.get(usMeta.usid, function (script) {
      // Prepare GM_* API
      injectGMApi(usMeta)
      // Inject script
      chrome.tabs.executeScript(tabId, {
        code: script[usMeta.usid],
        runAt: (script.runAt || 'document_end').replace('-', '_')
      })
    })
  })
}

function injectGMApi (usMeta, tabId) {
  for (let api of usMeta.grant) {
    chrome.tabs.executeScript(tabId, {
      file: 'scripts/' + api + '.js',
      runAt: 'document_start'
    }, function () {
      if (chrome.runtime.lastError) {
        console.error('Missing api:', api)
      }
    })
  }
}

export { initInjectorListener }
