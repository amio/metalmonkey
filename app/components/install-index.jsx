import React from 'react'
import Button from 'material-ui/Button'
import Layout from './layout.jsx'
import Topbar from './topbar.jsx'

export default class InstallIndex extends React.Component {

  constructor (props) {
    super()
    this.state = {
      resourceText: '',
      resourceLoaded: false
    }

    window.fetch(props.url)
      .then(res => this.consume(res))
      .then(uso => {
        this.setState({ resourceLoaded: true })
        console.info('Ready to install %s.', props.url)
      })
      .catch(e => console.error(e))

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

          console.log(`Got ${loadedBytes += value.byteLength} of ${length} bytes ...`)
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
    // Store.installAsset(this.props.resourceURL, this.state.resourceText)
    // .then(result => {
    //   console.info('Successfully installed %s!', this.props.resourceURL)
    //   setTimeout(function () {
    //     window.close()
    //   }, 200)
    // })
  }

  render () {
    const { url } = this.props
    const { resourceLoaded, resourceText } = this.state
    return (
      <Layout>
        <Topbar title='Install' />
        <div className='url'>
          <div className='content-wrapper'>{url}</div>
        </div>
        <div className='content-wrapper'>
          <div className='ops'>
            <Button
              variant='raised'
              color='secondary'
              disabled={!resourceLoaded}
              onClick={this.install}>
              Install
            </Button>
          </div>
          <pre className='code'>{resourceText}</pre>
        </div>
        <style jsx>{`
          .url {
            background-color: #FFF;
            height: 3rem;
            line-height: 3rem;
            color: #666;
            font: 14px/3rem Courier, monospace;
            border-bottom: 1px solid #EEE;
          }
          .content-wrapper {
            margin: 0 auto;
            padding: 0 1em;
            max-width: 1200px;
          }
          .ops {
            float: right;
          }
          .code {
            margin: 1rem 0;
            font-size: 14px;
            color: #222;
          }
        `}</style>
      </Layout>
    )
  }
}
