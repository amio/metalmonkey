import browser from 'webextension-polyfill'
import { matchAssetsByURL } from './store.js'

export default setupUserjsInjector

function setupUserjsInjector () {
  browser.tabs.onUpdated.addListener((tabId, changed, tab) => {
    if (changed.status === 'loading') {
      matchAssetsByURL(tab.url)
        .then(assets => assets.length && injectAssets(tabId, assets))
        .catch(console.error)
    }
  })
}

function injectAssets (tabId, assets) {
  // Set icon text to matched userjs count
  browser.browserAction.setBadgeText({
    tabId,
    text: assets.length.toString()
  })

  // Execute userjs
  assets.map(asset => execAsset(tabId, asset))
}

function execAsset (tabId, asset) {
  browser.tabs.executeScript(tabId, {
    code: autoExecWrapper(asset.code),
    runAt: 'document_idle'
  })
}

const autoExecWrapper = (src) => `
  const module = { exports: {} }
  const exports = module.exports
  ${src}
  const userjs_main = module.exports['default'] || module.exports
  if (typeof userjs_main === 'function') userjs_main()
`
