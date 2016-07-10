const { React, ReactDOM } = window
import URLSearchParams from 'url-search-params'
import { registerUserscript } from './lib/registry'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

class InstallerApp extends React.Component {
  constructor (props) {
    super()
    this.state = {
      resourceText: '',
      resourceLoaded: false
    }

    fetch(props.resourceURL)
    .then(res => this.consume(res))
    .then(uso => {
      this.setState({ resourceLoaded: true })
      console.info('Ready to install %s.', props.resourceURL)
    })
    .catch(e => console.error('Something went wrong: ' + e))

    this.install = this.install.bind(this)
  }

  consume (response) {
    const decoder = new window.TextDecoder()
    const reader = response.body.getReader()
    const length = response.headers.get('Content-Length') || 'unknown'

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
          }

          console.log(`got ${loadedBytes += value.byteLength} of ${length} bytes ...`)
          const partial = decoder.decode(value || new Uint8Array(), {
            stream: !done
          })
          that.setState({
            resourceText: that.state.resourceText + partial
          })
          return pump()
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

    installButton.disabled = false
  }

  install () {
    registerUserscript(this.props.resourceURL, this.state.resourceText)
    .then(result => {
      console.info('Successfully installed %s!', this.props.resourceURL)
      setTimeout(function () {
        window.close()
      }, 300)
    })
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={<span style={styles.title}>Install Userscript</span>}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          />
          <div style={styles.contentWrapper}>
            <RaisedButton label='Install' primary style={styles.installButton}
              disabled={!this.state.resourceLoaded}
              onClick={this.install} />
            <pre id='code'>{this.state.resourceText}</pre>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

InstallerApp.propTypes = {
  resourceURL: React.PropTypes.string
}

const styles = {
  contentWrapper: {
    margin: '0 auto',
    maxWidth: '1200px',
    padding: '3rem',
    fontSize: '16px'
  },
  installButton: {
    float: 'right'
  }
}

const searchParams = new URLSearchParams(window.location.search.slice(1))
const scriptURL = searchParams.get('script')

ReactDOM.render(<InstallerApp resourceURL={scriptURL} />, document.getElementById('app'))
