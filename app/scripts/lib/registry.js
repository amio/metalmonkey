import { log } from './dev-helper'

module.exports = {
  set: log,
  add: add,
  match: log,
}

/**
 * Add a script to metalmonkey registry.
 */
function add (url, content) {
  let newItem = {}
  newItem[url] = content
  chrome.storage.local.set(newItem)
  log('[Registry] new item: %s', url)

  return content
}

/**
 * Get registry item that match the url.
 */
function match (url) {}
