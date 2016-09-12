import { getMatchedUserscripts } from './lib/registry.js'

const popupPageState = {}
chrome.tabs.getSelected(null, tab => (popupPageState.currentTabURL = tab.url))

// Click listeners
const menuManage = document.getElementById('menu-manage')
const menuCreate = document.getElementById('menu-create-script')
menuManage.addEventListener('click', e => openExtensionPage('options.html', '#manage'))
menuCreate.addEventListener('click', e => {
  const host = popupPageState.currentTabURL.match(/\w+:\/\/[^/]+/)
  const newScriptURI = encodeURIComponent(host + '/#' + Date.now() + '.user.js')
  openExtensionPage('options.html', '#create/' + newScriptURI)
})

// Open page
function openExtensionPage (pageName, pageArgs) {
  // page: 'options.html' or 'options.html#create'
  const pageURL = chrome.extension.getURL(pageName)

  chrome.tabs.query({url: pageURL}, function (tabs) {
    if (tabs.length) {
      chrome.tabs.update(tabs[0].id, {active: true})
    } else {
      chrome.tabs.create({url: pageURL + (pageArgs || '')})
    }
  })
}

// Set footer version
const version = require('../../package.json').version
document.querySelector('.version').innerText = 'v' + version

// Menu items for current page
const { React, ReactDOM } = window
class PopupList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      matched: []
    }
  }

  componentDidMount () {
    chrome.tabs.getSelected(null, tab => {
      this.setState({
        currentUrl: tab.url
      })

      getMatchedUserscripts(tab.url).then(uss => this.setState({
        matched: uss
      }))
    })
  }

  goEdit () {
    const uri = encodeURIComponent(this.usid)
    openExtensionPage('options.html', '#edit/' + uri)
  }

  render () {
    return this.state.matched.length ? (
      <ul className='menu'>
        {
          this.state.matched.map(us => {
            return (
              <li key={us.usid}
                className='menu-item'
                onClick={this.goEdit.bind(us)}>
                { us.name }
              </li>
            )
          })
        }
      </ul>
    ) : null
  }
}
ReactDOM.render(<PopupList />, document.getElementById('app'))
