const STORAGE_PREFIX = 'STORE:'
const RESOURCE_PREFIX = 'RES:'

class ScriptStorage {
  constructor (scriptId) {
    this.storage = {}
    this.storageId = STORAGE_PREFIX + scriptId
    this.syncFromChromeStorage()
    chrome.storage.onChanged.addListener((changes, namespace) => {
      for (let key in changes) {
        if (namespace === 'local' && key === this.storageId) {
          this.syncFromChromeStorage()
        }
      }
    })
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

  getResourceURL (name) {
    const data = this.storage[RESOURCE_PREFIX + name]
    if (data) {
      return JSON.parse(data).base64
    } else {
      throw new Error('Resource not found: ' + name)
    }
  }

  getResourceText (name) {
    const data = this.storage[RESOURCE_PREFIX + name]
    if (data) {
      return window.atob(JSON.parse(data).base64.replace(/^\S+;base64,/, ''))
    } else {
      throw new Error('Resource not found: ' + name)
    }
  }

  installResources (resources) {
    resources.forEach(resource => {
      const resArr = resource.split(' ')
      window.fetch(resArr[1])
        .then(res => res.blob())
        .then(blob => {
          const r = new window.FileReader()
          r.onload = (e) => {
            this.setValue(RESOURCE_PREFIX + resArr[0], JSON.stringify({
              url: resArr[1],
              base64: e.target.result
            }))
          }
          r.readAsDataURL(blob)
        })
    })
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
      if (items[this.storageId]) {
        this.storage = JSON.parse(items[this.storageId])
      }
    })
  }
}

export default function initScriptStorage (scriptId) {
  return new ScriptStorage(scriptId)
}
