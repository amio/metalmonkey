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
  console.info(`[TAB-${tabId}] ${assets.length} userscripts matched.`)
}
