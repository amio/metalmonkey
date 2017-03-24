// Inject userscripts into webpage.

import { info } from './helper'
import { getRequires } from './registry'
import Store from './store'

export default initInjector

function initInjector () {
  chrome.tabs.onUpdated.addListener(function (tabId, changed, tab) {
    if (changed.status === 'loading') {
      // Inject matched userscript into page.
      Store.getMatchedAssets(tab.url)
        .then(matched => userscriptInjector(tabId, matched))
        .catch(e => console.log(e))
    }
  })
}

function userscriptInjector (tabId, matchedAssets) {
  console.info('[TAB-%s] %i userscripts matched.', tabId, matchedAssets.length)
  // Update badge
  chrome.browserAction.setBadgeText({
    tabId: tabId,
    text: matchedAssets.length.toString()
  })

  // inject debug utillities
  // chrome.tabs.executeScript(tabId, {
  //   file: 'scripts/debug.js'
  // }, function () {
  //   if (chrome.runtime.lastError) {
  //     console.error('[TAB-%s] Inject debug.js error.', tabId)
  //   }
  // })

  // Inject userscripts
  matchedAssets.forEach(asset => {
    prepareEnvironment(tabId, asset, () => {
      executeUserscript(tabId, asset)
    })
  })
}

function prepareEnvironment (tabId, asset, cb) {
  const meta = asset.meta
  // Prepare GM_* api
  chrome.tabs.executeScript(tabId, {
    file: 'scripts/gm-api.js',
    runAt: 'document_start'
  }, function () {
    if (chrome.runtime.lastError) {
      console.error('Error in gm-api.js')
      return
    }
    info('[TAB-%s] <%s> Injected gm-api.js.', tabId, meta.name)
    // Init GM_* api env for this userscript
    chrome.tabs.executeScript(tabId, {
      code: `initGreasemonkeyApi("${meta.usid}")`
    }, function () {
      info('[TAB-%s] <%s> Initialized greasemonkey apis.', tabId, meta.name)
      if (meta.require && meta.require.length) {
        getRequires(meta.usid).then(code => {
          info('[TAB-%s] <%s> Required resource injected.', tabId, meta.name)
          chrome.tabs.executeScript(tabId, {
            code: code
          }, function () {
            if (chrome.runtime.lastError) {
              console.error('[TAB-%s] <%s> error load requires.', tabId, meta.name)
              console.error(code)
            }
            cb()
          })
        })
      } else {
        cb()
      }
    })
  })
}

function executeUserscript (tabId, asset) {
  const iifeWrappedCode = `(function(){
    try {
      ${asset.code}
    } catch (e) {
      console.error('Error in <%s> :', '${asset.meta.name}', e)
    }
  })()`
  chrome.tabs.executeScript(tabId, {
    code: iifeWrappedCode,
    runAt: (asset.meta.runAt || 'document_end').replace('-', '_')
  }, function () {
    if (chrome.runtime.lastError) {
      console.error('Error in userscript:', asset.meta.usid)
    }
    info('[TAB-%s] <%s> Executed.', tabId, asset.meta.name)
    // console.log(iifeWrappedCode)
  })
}
