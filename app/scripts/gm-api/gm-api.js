import initScriptStorage from './GM_storage.js'
import GM_xmlhttpRequest from './GM_xmlhttpRequest.js'

window.initGreasemonkeyApi = function (scriptId) {
  scriptId = scriptId || 'debug'
  const scriptStore = initScriptStorage(scriptId)

  window.gmApi = window.gmApi || {}
  window.gmApi[scriptId] = {
    GM_setValue: scriptStore.setValue.bind(scriptStore),
    GM_getValue: scriptStore.getValue.bind(scriptStore),
    GM_listValues: scriptStore.listValues.bind(scriptStore),
    GM_deleteValue: scriptStore.deleteValue.bind(scriptStore),
    GM_xmlhttpRequest: GM_xmlhttpRequest
  }
}
