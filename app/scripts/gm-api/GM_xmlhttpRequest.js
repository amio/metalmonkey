{
  const API_NAME = 'GM_xmlhttpRequest'
  window[API_NAME] = function (details) {
    console.log(API_NAME, 'called.')
  }
}
