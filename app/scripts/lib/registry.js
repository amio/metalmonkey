import { log } from './dev-helper'
import usp from 'userscript-parser'
import crxp from 'crx-patterns'

export { registerUserscript, getMatchedUserscripts }

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
  return new Promise(function (resolve, reject) {
    if (chrome.runtime.lastError) reject(chrome.runtime.lastError)

    let matched = []
    chrome.storage.sync.get(null, function (syncConfig) {
      Object.keys(syncConfig).map((k) => {
        if (isUsMatchURL(syncConfig[k], url)) {
          matched.push(syncConfig[k])
        }
      })
      if (typeof cb === 'function') cb(matched)
      resolve(matched)
    })
  })
}

function isUsMatchURL (usPatterns, url) {
  const match = (patterns) => new crxp.MatchPattern(patterns).match(url)
  if (usPatterns.exclude.some(match)) return false
  if (usPatterns.include.some(match)) return true
  return false
}
