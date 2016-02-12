import { info } from './helper'
import { getMatchedUserscripts } from './registry'

function initInjectorListener () {
  chrome.tabs.onUpdated.addListener(function (tabId, changed, tab) {
    if (changed.status === 'loading') {
      getMatchedUserscripts(tab.url)
        .then(matched => userscriptInjector(tabId, matched))
        .catch(e => console.log(e))
    }
  })
}

function userscriptInjector (tabId, matchedUss) {
  console.info('[TAB-%s] Matched userscripts count:', tabId, matchedUss.length)
  // Update badge
  chrome.browserAction.setBadgeText({
    tabId: tabId,
    text: matchedUss.length.toString()
  })

  // inject debug utillities
  chrome.tabs.executeScript(tabId, {
    file: 'scripts/debug.js'
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
      info('[TAB-%s] <%s> Injected gm-api.js.', tabId, userscriptMeta.name)
      // Init GM_* api env for this userscript
      chrome.tabs.executeScript(tabId, {
        code: `initGreasemonkeyApi("${userscriptMeta.usid}")`
      }, function () {
        info('[TAB-%s] <%s> Initialized greasemonkey apis.', tabId, userscriptMeta.name)
        // inject this userscript
        const USStorageKey = 'USID:' + userscriptMeta.usid
        chrome.storage.local.get(USStorageKey, function (script) {
          const iifeWrappedCode = `(function(){
            ${userscriptMeta.grant.map(api => {
              return `var ${api} = window.gmApi["${userscriptMeta.usid}"].${api}`
            }).join(';')};
            try {
              ${script[USStorageKey]}
            } catch (e) {
              console.error('Error in <%s> :', '${userscriptMeta.name}', e)
            }
          })()`
          chrome.tabs.executeScript(tabId, {
            code: iifeWrappedCode,
            runAt: (script.runAt || 'document_end').replace('-', '_')
          }, function () {
            if (chrome.runtime.lastError) {
              console.error('Error in userscript:', userscriptMeta.usid)
            }
            info('[TAB-%s] <%s> Executed.', tabId, userscriptMeta.name)
            // console.log(iifeWrappedCode)
          })
        })
      })
    })

  })
}

export { initInjectorListener }
