import initScriptStorage from './GM_storage.js'
import GM_xmlhttpRequest from './GM_xmlhttpRequest.js'

window.initGreasemonkeyApi = function (scriptId) {
  scriptId = scriptId || 'debug'

  // Storage Apis
  const scriptStore = initScriptStorage(scriptId)
  window.GM_setValue = scriptStore.setValue.bind(scriptStore)
  window.GM_getValue = scriptStore.getValue.bind(scriptStore)
  window.GM_listValues = scriptStore.listValues.bind(scriptStore)
  window.GM_deleteValue = scriptStore.deleteValue.bind(scriptStore)

  // xmlhttpRequest
  window.GM_xmlhttpRequest = GM_xmlhttpRequest
}
