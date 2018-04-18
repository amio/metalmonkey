import browser from 'webextension-polyfill'

// Open main.html when click browser_action icon
browser.browserAction.onClicked.addListener(tab => {
  browser.tabs.create({
    url: browser.extension.getURL('main.html')
  })
})
