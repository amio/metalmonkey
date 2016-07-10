import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import URLSearchParams from 'url-search-params'
import { registerUserscript } from './lib/registry'

class InstallerApp extends React.Component {
  constructor (props) {
    super()
    this.state = {
      resourceText: ''
    }

    fetch(props.scriptURL)
      .then(res => this.consume(res))
      .then(uso => this.onScriptLoaded(uso))
      .catch(e => console.error('Something went wrong: ' + e))
  }

  consume (response) {
    const reader = response.body.getReader()
    const length = response.headers.get('Content-Length') || 'unknown'
    const decoder = new window.TextDecoder()

    let loadedBytes = 0
    return new Promise((resolve, reject) => {
      const that = this
      ;(function pump () {
        reader.read().then(({done, value}) => {
          if (done) {
            return resolve({
              url: that.props.scriptURL,
              bytes: loadedBytes,
              content: that.state.resourceText
            })
          } else {
            console.log(`got ${loadedBytes += value.byteLength} of ${length} bytes ...`)
            const partial = decoder.decode(value || new Uint8Array(), {
              stream: !done
            })
            that.setState({
              resourceText: that.state.resourceText + partial
            })
            return pump()
          }
        }).catch(reject)
      })()
    })
  }

  parseMeta (metaText) {
    if (metaText.split('// ==/UserScript==').length > 1) {
      return {} // TODO: return meta object.
    }
  }

  onScriptLoaded (userscriptObject) {
    console.info('Ready to install %s.', scriptURL)

    const installButton = document.querySelector('#installButton')
    installButton.addEventListener('click', () => {
      registerUserscript(userscriptObject.url, userscriptObject.content)
        .then(result => {
          console.info('Successfully installed %s!', userscriptObject.url)
          setTimeout(function () {
            // window.close()
          }, 300)
        })
    })
    installButton.disabled = false
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <button id='installButton' disabled>install</button>
          <pre id='code'>{this.state.resourceText}</pre>
        </div>
      </MuiThemeProvider>
    )
  }
}

InstallerApp.propTypes = {
  scriptURL: React.PropTypes.string
}

const searchParams = new URLSearchParams(window.location.search.slice(1))
const scriptURL = searchParams.get('script')

ReactDOM.render(<InstallerApp scriptURL={scriptURL} />, document.getElementById('app'))
