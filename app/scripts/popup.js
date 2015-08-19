const optionBtn = document.querySelector('#menu-options')

optionBtn.addEventListener('click', function (ev) {
  // chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id })
  var optionsUrl = chrome.extension.getURL('html/options.html')

  chrome.tabs.query({url: optionsUrl}, function (tabs) {
    if (tabs.length) {
      chrome.tabs.update(tabs[0].id, {active: true})
    } else {
      chrome.tabs.create({url: optionsUrl})
    }
  })
})
