{
  const API_NAME = 'GM_addStyle'

  window[API_NAME] = function (css) {
    try {
      let el = document.createElement('style')
      el.textContent = css
      document.head.appendChild(el)
    } catch (err) {
      console.log('GM_addStyle error:' + err)
    }
  }
}
