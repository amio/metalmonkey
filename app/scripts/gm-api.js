/*eslint camelcase:0*/
import initScriptStorage from './gm-api/GM_storage.js'
import GM_xmlhttpRequest from './gm-api/GM_xmlhttpRequest.js'
import GM_addStyle from './gm-api/GM_addStyle.js'

window.initGreasemonkeyApi = function (scriptId) {
  scriptId = scriptId || 'debug'
  const scriptStore = initScriptStorage(scriptId)

  window.gmApi = window.gmApi || {}
  window.gmApi[scriptId] = {
    GM_setValue: scriptStore.setValue.bind(scriptStore),
    GM_getValue: scriptStore.getValue.bind(scriptStore),
    GM_listValues: scriptStore.listValues.bind(scriptStore),
    GM_deleteValue: scriptStore.deleteValue.bind(scriptStore),
    GM_getResourceURL: scriptStore.getResourceURL.bind(scriptStore),
    GM_getResourceText: scriptStore.getResourceText.bind(scriptStore),
    GM_xmlhttpRequest: GM_xmlhttpRequest,
    GM_addStyle: GM_addStyle
  }
}
