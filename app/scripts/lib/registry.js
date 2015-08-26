import { log, promisifyChromeExtensionApi } from './helper'
import usp from 'userscript-parser'
import crxp from 'crx-patterns'

export {
  registerUserscript,
  removeUserscript,
  getMatchedUserscripts,
  getUserscriptList
}

const USID_PREFIX = 'USID::'

/**
 * Add a script to metalmonkey registry.
 */
function registerUserscript (url, content) {
  const us = usp(content)
  const usid = USID_PREFIX + url
  const usSyncData = {
    [usid]: {
      usid: usid,
      name: us.name && us.name[0] || '',
      version: us.version && us.version[0] || '0',
      enabled: true,
      matches: us.match || [],
      includes: us.include || [],
      excludes: us.exclude || [],
      runAt: us['run-at'] && us['run-at'][0] || 'document-end'
    }
  }
  const usLocalData = {
    [usid]: content
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
    syncSet(usSyncData),
    localSet(usLocalData)
  ])
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
    syncRemove(usid),
    localRemove(usid)
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
      log('[Registry]:', err)
      return []
    })
}

function isUsMatchURL (us, url) {
  const match = (pattern) => new crxp.MatchPattern(pattern).match(url)
  const matchGM = (pattern) => new MatchPatternGM(pattern).test(url)
  if (us.excludes.some(matchGM)) return false
  if (us.includes.some(matchGM)) return true
  if (us.matches.some(match)) return true
  return false
}

/**
 * MatchPattern for Greasemonkey '@include' & '@exclude'
 */
class MatchPatternGM {
  constructor (url_pattern) {
    let regStr = url_pattern
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
  const ret = new Promise(function (res, rej) {
    chrome.storage.sync.get(null, (items) => {
      if (chrome.runtime.lastError) {
        rej(chrome.runtime.lastError)
      } else {
        let usMetaArray = []
        Object.keys(items).forEach(k => {
          if (items[k].usid.indexOf(USID_PREFIX) === 0) usMetaArray.push(items[k])
        })
        res(usMetaArray)
      }
    })
  })
  return ret
}
