import browser from 'webextension-polyfill'
import match from 'url-match-patterns'
import parseMeta from './parse-meta.js'

async function installAsset (url, src) {
  const { error, parsed, type } = parseMeta(src)

  if (error) {
    throw error
  } else {
    const key = url
    const { meta, css } = parsed
    await browser.storage.local.set({
      [url]: { src, css }
    })
    await browser.storage.sync.set({
      [key]: { type, meta, from: url }
    })
    return { url, type, meta, src, css }
  }
}

async function removeAsset (url) {
  // await browser.storage.local.clear()
  // await browser.storage.sync.clear()
  await browser.storage.local.remove(url)
  return browser.storage.sync.remove(url)
}

async function listAssets (keys) {
  return Object.values(await browser.storage.sync.get(keys))
}

async function getAssetCode (key) {
  const cached = await browser.storage.local.get(key)
  if (cached) {
    return cached[key]
  } else {
    const src = await window.fetch(key).then(res => res.text())
    const { css } = await installAsset(key, src)
    return { src, css }
  }
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
  getAssetCode,
  matchAssetsByURL
}
