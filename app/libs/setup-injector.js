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
  const { src, css, runAt } = asset
  const soonest = [
    'document_start',
    'document_idle',
    'document_end'
  ].includes(runAt) && runAt

  if (src) {
    browser.tabs.executeScript(tabId, {
      code: autoExecWrapper(src),
      runAt: soonest || 'document_idle'
    })
  }

  if (css) {
    browser.tabs.insertCSS(tabId, {
      code: css,
      runAt: soonest || 'document_start'
    })
  }
}

const autoExecWrapper = (src) => `
  const module = { exports: {} }
  const exports = module.exports
  ${src}
  const userjs_main = module.exports['default'] || module.exports
  if (typeof userjs_main === 'function') userjs_main()
`
