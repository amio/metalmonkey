import browser from 'webextension-polyfill'

async function installAsset (url, meta, code) {
  const key = url
  return browser.storage.local.set({
    [key]: { url, meta, code }
  })
}

async function listAssets (keys) {
  return browser.storage.local.get(keys)
}

export {
  installAsset,
  listAssets
}
