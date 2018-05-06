import browser from 'webextension-polyfill'
import { matchAssetsByURL, getAssetCode } from './store.js'

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

async function execAsset (tabId, asset) {
  console.info(`TAB[${tabId}] <- ${asset.meta.name}`)
  const { from, runAt } = asset
  const soonest = [
    'document_start',
    'document_idle',
    'document_end'
  ].includes(runAt) && runAt

  const { src, css } = await getAssetCode(from)
  console.log(src, css)

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
