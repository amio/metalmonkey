import usp from 'userscript-parser'
import crxp from 'crx-patterns'
import ChromePromise from 'chrome-promise'

const cp = new ChromePromise()

/**
 * METALMONKEY Store
 *
 * ## What is "user-asset"
 *
 *    An user-asset refers to an userscript or userstyle
 *
 * ## chrome.storage.sync (Config. The config synced across browsers)
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
 * ## chrome.storage.local (Registry. All installed user assets content)
 *
 *    'UA^https://example.com/script1.user.js': {}
 *    'UA^https://example.com/script2.user.js': {}
 */

const USER_ASSET_ID_PREFIX = 'UA^'

function isUAID (text) {
  return text.indexOf(USER_ASSET_ID_PREFIX) === 0
}

function toUAID (url) {
  return USER_ASSET_ID_PREFIX + url
}

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

function isAssetMatchURL (asset, url) {
  const match = (pattern) => new crxp.MatchPattern(pattern).match(url)
  const matchGM = (pattern) => new MatchPatternGM(pattern).test(url)
  if (asset.meta.excludes.some(matchGM)) return false
  if (asset.meta.includes.some(matchGM)) return true
  if (asset.meta.matches.some(match)) return true
  return false
}

/**
 * MatchPattern for Greasemonkey '@include' & '@exclude'
 */
class MatchPatternGM {
  constructor (urlPattern) {
    let regStr = urlPattern
      .replace('*', '.*')
      .replace(/[?:()\[\]^$]/g, function (x) {
        return '\\' + x
      })
    this.reg = new RegExp('^' + regStr + '$')
  }
  test (url) {
    return this.reg.test(url)
  }
}

class MMStore {
  constructor () {
    // local registry cache
    this._registry = {}
    this.updateRegistry()

    chrome.storage.onChanged.addListener((changes, areaName) => {
      console.info(areaName, changes)
    })
  }

  updateRegistry () {
    this.fetchAssetsRegistry().then(r => {
      this._registry = r
    })
  }

  /**
   *  Fetch installed user-assets from chrome.storage.local
   */
  fetchAssetsRegistry () {
    return cp.storage.local.get(null).then(storage => {
      const installedAssets = {}
      // filter: user assets only
      Object.keys(storage).forEach(key => {
        if (isUAID(key)) {
          installedAssets[key] = storage[key]
        }
      })
      return installedAssets
    })
  }

  /**
   *  Install an user-asset
   */
  installAsset (url, code) {
    const meta = formatAssetMeta(code)
    const uaid = toUAID(url)

    // TODO: use cp.storage.sync.set too

    meta.url = url
    return cp.storage.local.set({
      [uaid]: {
        meta: meta,
        code: code
      }
    })
  }
  removeAsset () {}

  /**
   *  Get an installed user-asset from chrome.storage.local
   */
  getAsset (url) {
    const id = toUAID(url)
    return cp.storage.local.get(id).then(result => {
      return result[id] || {code: ''} // TODO: result or create with template
    })
  }

  getMatchedAssets (url) {
    return this.fetchAssetsRegistry()
    .then(reg => Object.values(reg))
    .then(assets => assets.filter(asset => isAssetMatchURL(asset, url)))
  }

  /**
   *  Clean up chrome.storage.local
   *
   *  @return undefined
   */
  cleanup (yesdoit) {
    cp.storage.local.get(null)
    .then(storage => {
      if (yesdoit) {
        chrome.storage.local.clear()
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
