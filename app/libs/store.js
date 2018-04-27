import browser from 'webextension-polyfill'

async function installAsset (url, code) {
  // const { META } = await import(url)
  // console.log(META)
  const id = url
  return browser.storage.local.set({
    [id]: { url, code }
  })
}

export {
  installAsset
}
