import browser from 'webextension-polyfill'

export default function setupMessageListener () {
  browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    switch (msg.type) {
      case 'background-log':
        console.log(...msg.obj)
        break
      default:
        console.info('[unhandled message]:', msg)
    }
  })
}
