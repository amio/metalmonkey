import { promisifyChromeExtensionApi } from './helper'
import usp from 'userscript-parser'
import crxp from 'crx-patterns'
import initScriptStorage from '../gm-api/GM_storage.js'

export {
  registerUserscript,
  removeUserscript,
  getMatchedUserscripts,
  getUserscriptList,
  getRequires
}

const USID_PREFIX = 'USID:'
const REQUIRE_PREFIX = 'REQS:'

/**
 * Add a script to metalmonkey registry.
 */
function registerUserscript (url, content) {
  const usmeta = usp(content)
  const usid = url

  // fetch & store @resource
  // http://wiki.greasespot.net/Metadata_Block#.40resource
  if (usmeta.resource) {
    const store = initScriptStorage(url)
    store.installResources(usmeta.resource)
  }

  // fetch & store @require
  // http://wiki.greasespot.net/Metadata_Block#.40require
  if (usmeta.require) {
    installRequires(usid, usmeta.require)
  }

  const syncSet = promisifyChromeExtensionApi(
    chrome.storage.sync.set,
    chrome.storage.sync
  )
  const localSet = promisifyChromeExtensionApi(
    chrome.storage.local.set,
    chrome.storage.local
  )

  return Promise.all([
    syncSet({
      [USID_PREFIX + usid]: {
        usid: usid,
        name: usmeta.name && usmeta.name[0] || '',
        version: usmeta.version && usmeta.version[0] || '0',
        enabled: true,
        grant: usmeta.grant || [],
        resource: usmeta.resource || [],
        require: usmeta.require || [],
        matches: usmeta.match || [],
        includes: usmeta.include || [],
        excludes: usmeta.exclude || [],
        runAt: usmeta['run-at'] && usmeta['run-at'][0] || 'document-end'
      }
    }),
    localSet({
      [USID_PREFIX + usid]: content
    })
  ])
}

function installRequires (usid, requires) {
  return Promise.all(requires.map(item => {
    return window.fetch(item).then(res => res.text())
  }))
    .then(scripts => {
      chrome.storage.local.set({
        [REQUIRE_PREFIX + usid]: scripts.join(';')
      })
    })
}

function getRequires (usid) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(REQUIRE_PREFIX + usid, (requires) => {
      if (chrome.runtime.lastError) {
        reject()
      } else {
        resolve(requires[REQUIRE_PREFIX + usid])
      }
    })
  })
}

function removeUserscript (usid) {
  const syncRemove = promisifyChromeExtensionApi(
    chrome.storage.sync.remove,
    chrome.storage.sync
  )
  const localRemove = promisifyChromeExtensionApi(
    chrome.storage.local.remove,
    chrome.storage.local
  )
  return Promise.all([
    syncRemove(USID_PREFIX + usid),
    localRemove(USID_PREFIX + usid)
  ])
}

/**
 * Get registry items that match the url.
 */
function getMatchedUserscripts (url) {
  return getUserscriptList()
    .then(function (scripts) {
      let matched = scripts.filter(us => isUsMatchURL(us, url))
      return matched
    })
    .catch(function (err) {
      console.error('[MM-Registry] ', err)
      return []
    })
}

function isUsMatchURL (usmeta, url) {
  const match = (pattern) => new crxp.MatchPattern(pattern).match(url)
  const matchGM = (pattern) => new MatchPatternGM(pattern).test(url)
  if (usmeta.excludes.some(matchGM)) return false
  if (usmeta.includes.some(matchGM)) return true
  if (usmeta.matches.some(match)) return true
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

function getUserscriptList () {
  const ret = new Promise(function (resolve, reject) {
    chrome.storage.sync.get(null, (items) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        let usMetaArray = []
        Object.keys(items).forEach(k => {
          if (k.indexOf(USID_PREFIX) === 0) usMetaArray.push(items[k])
        })
        resolve(usMetaArray)
      }
    })
  })
  return ret
}
