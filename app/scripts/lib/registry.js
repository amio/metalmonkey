import { log } from './dev-helper'
import usp from 'userscript-parser'
import crxp from 'crx-patterns'

export {
  registerUserscript,
  getMatchedUserscripts,
  getUserscriptList
}

const USID_PREFIX = 'USID::'

/**
 * Add a script to metalmonkey registry.
 */
function registerUserscript (url, content) {
  let us = usp(content)
  let usid = USID_PREFIX + url

  us.usid = usid

  chrome.storage.local.set({
    [usid]: content
  })

  chrome.storage.sync.set({
    [usid]: {
      usid: usid,
      name: us.name[0],
      version: us.version[0],
      enabled: true,
      matches: us.match || [],
      includes: us.include || [],
      excludes: us.exclude || [],
      runAt: us['run-at'] && us['run-at'][0] || 'document-end'
    }
  })

  log('[Registry] new item: %s', url)

  return content
}

/**
 * Get registry items that match the url.
 */
function getMatchedUserscripts (url, cb) {
  return getUserscriptList()
    .then(function (scripts) {
      let matched = scripts.filter(us => isUsMatchURL(us, url))
      if (typeof cb === 'function') cb(matched)
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

function getUserscriptList (cb) {
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
  if (typeof cb === 'function') ret.then(cb)
  return ret
}
