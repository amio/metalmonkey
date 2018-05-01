import browser from 'webextension-polyfill'
import match from 'url-match-patterns'

async function installAsset (url, src, parsed) {
  const key = url
  const { meta, css } = parsed
  return browser.storage.local.set({
    [key]: { url, src, meta, css }
  })
}

async function listAssets (keys) {
  return browser.storage.local.get(keys)
}

async function matchAssetsByURL (url) {
  const entries = await listAssets().then(assets => Object.values(assets))
  return entries.filter(entry => {
    const patterns = entry.meta && entry.meta.matches && entry.meta.matches
    return patterns && patterns.find(p => match(p, url))
  })
}

export {
  installAsset,
  listAssets,
  matchAssetsByURL
}
