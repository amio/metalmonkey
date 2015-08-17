import { log } from './dev-helper'

export {
  log as set,
  add,
  match,
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
 * Get registry items that match the url.
 */
function match (url) {}
