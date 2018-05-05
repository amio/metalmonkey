import browser from 'webextension-polyfill'
import match from 'url-match-patterns'
import parseMeta from './parse-meta.js'

async function installAsset (url, src) {
  const key = url
  const { error, parsed, type } = parseMeta(src)

  if (error) {
    throw error
  } else {
    const { meta, css } = parsed
    return browser.storage.local.set({
      [key]: { from: url, src, meta, css, type }
    })
  }
}

async function removeAsset (url) {
  return browser.storage.local.remove(url)
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
  removeAsset,
  listAssets,
  matchAssetsByURL
}
