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
      include: [].concat(us.include || [], us.match || []),
      exclude: [].concat(us.exclude || []),
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
      log('Registry Error:')(err)
      return []
    })
}

function isUsMatchURL (us, url) {
  const match = (patterns) => new crxp.MatchPattern(patterns).match(url)
  if (us.exclude.some(match)) return false
  if (us.include.some(match)) return true
  return false
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
