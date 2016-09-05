// http://wiki.greasespot.net/GM_addStyle
export default function (cssText) {
  try {
    const styleEl = document.createElement('style')
    styleEl.textContent = cssText
    document.head.appendChild(styleEl)
  } catch (err) {
    console.log('GM_addStyle error:' + err)
  }
}
