
// Click listener for "Manage install scripts"
document.getElementById('menu-manage')
.addEventListener('click', e => openExtensionPage('options.html', '#manage'))

// Set footer version
const version = require('../../package.json').version
document.querySelector('.version').innerText = 'v' + version

// Menu items for current page
const { React, ReactDOM } = window

const PopupApp = props => {
  return (
    <ul className='menu'>
      <li className='menu-item' id='menu-options'>{'Create a new script'}</li>
    </ul>
  )
}

ReactDOM.render(<PopupApp />, document.getElementById('app'))

// Open page
function openExtensionPage (page, hashRoute) {
  // page: 'options.html' or 'options.html#create'
  const pageURL = chrome.extension.getURL(page)

  chrome.tabs.query({url: pageURL}, function (tabs) {
    if (tabs.length) {
      chrome.tabs.update(tabs[0].id, {active: true})
    } else {
      chrome.tabs.create({url: pageURL + (hashRoute || '')})
    }
  })
}
