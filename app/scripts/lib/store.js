import usp from 'userscript-parser'
import ChromePromise from 'chrome-promise'

/**
 * METALMONKEY Store
 *
 * ## What is "User Asset"
 *
 *    An user-asset refers to an userscript or userstyle
 *
 * ## chrome.storage.sync (stores config synced across browsers)
 *
 *    MMAssets: [
 *      'http://example.com/script1.user.js',
 *      'http://example.com/script2.user.js'
 *    ]
 *
 *    MMPreference: {}
 *
 *    MMConfigVersion: 0
 *
 * ## chrome.storage.local (stores installed user assets content)
 *
 *    'UA^ https://example.com/script1.user.js': {}
 *    'UA^ https://example.com/script2.user.js': {}
 */

const USER_ASSET_ID_PREFIX = 'UA^'

function isUAID (text) {
  return text.indexOf(USER_ASSET_ID_PREFIX) === 0
}

function toUAID (url) {
  return USER_ASSET_ID_PREFIX + url
}

// function fromUAID (uaid) {
//   return uaid.replace(new RegExp('^' + USER_ASSET_ID_PREFIX), '')
// }

function formatAssetMeta (codeText) {
  const rawMeta = usp(codeText)
  return {
    name: rawMeta.name && rawMeta.name[0] || '',
    version: rawMeta.version && rawMeta.version[0] || '0',
    enabled: true,
    grant: rawMeta.grant || [],
    resource: rawMeta.resource || [],
    require: rawMeta.require || [],
    matches: rawMeta.match || [],
    includes: rawMeta.include || [],
    excludes: rawMeta.exclude || [],
    runAt: rawMeta['run-at'] && rawMeta['run-at'][0] || 'document-end'
  }
}

const cp = new ChromePromise()

class MMStore {
  constructor () {
    this.registry = {}
    this.updateRegistry()
  }

  updateRegistry () {
    this.fetchRegistry().then(r => {
      this.registry = r
    })
  }

  /**
   *  Get installed user assets from chrome.storage.local
   */
  fetchRegistry () {
    return cp.storage.local.get(null).then(storage => {
      const installedAssets = {}
      // filter user assets
      Object.keys(storage).forEach(key => {
        if (isUAID(key)) {
          installedAssets[key] = storage[key]
        }
      })
      return installedAssets
    })
  }

  /**
   *  Install an asset
   */
  installAsset (url, code) {
    const meta = formatAssetMeta(code)
    const uaid = toUAID(url)

    // TODO: use cp.storage.sync.set too

    return cp.storage.local.set({
      [uaid]: {
        url: url,
        meta: meta,
        code: code
      }
    })
  }
  removeAsset () {}
  getAsset () {}
  getAllAssets () {}
  getMatchedAssets () {}

  /**
   *  Clean up chrome.storage.local
   */
  cleanup (doit) {
    cp.storage.local.get(null)
    .then(storage => {
      if (doit) {
        //
      } else {
        // for debugging
        Object.keys(storage).forEach(x => console.log(x))
      }
    })
  }
}

const store = new MMStore()
window.store = store

export default store
