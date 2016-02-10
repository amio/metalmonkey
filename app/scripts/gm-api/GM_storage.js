const STORAGE_PREFIX = 'SCRIPT:'

class ScriptStorage {
  constructor (scriptId) {
    this.storage = {}
    this.storageId = STORAGE_PREFIX + scriptId
    this.syncFromChromeStorage()
  }

  setValue (name, value) {
    this.storage[name] = value
    this.syncToChromeStorage()
  }

  getValue (name, defaultValue) {
    return this.storage[name] === undefined ? defaultValue : this.storage[name]
  }

  listValues () {
    return Object.keys(this.storage)
  }

  deleteValue (name) {
    this.storage[name] = undefined
    this.syncToChromeStorage()
  }

  syncToChromeStorage () {
    chrome.storage.local.set({
      [this.storageId]: JSON.stringify(this.storage)
    }, function () {
      chrome.runtime.lastError && console.error('Sync to ChromeStorage failed.')
    })
  }

  syncFromChromeStorage (callback) {
    chrome.storage.local.get(this.storageId, items => {
      if (chrome.runtime.lastError) {
        console.error('Sync from ChromeStorage failed.')
        return
      }
      this.storage = JSON.parse(items[this.storageId])
    })
  }
}

export default function initScriptStorage (scriptId) {
  return new ScriptStorage(scriptId)
}
