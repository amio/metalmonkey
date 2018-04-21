import React from 'react'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'

import Layout from './layout.jsx'
import Topbar from './topbar.jsx'
import { installAsset } from '../libs/store.js'

export default class InstallIndex extends React.Component {

  constructor (props) {
    super()
    this.state = {
      resourceText: '',
      resourceLoaded: false,
      notify: ''
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

    const that = this
    let loadedBytes = 0
    return new Promise((resolve, reject) => {
      (function pump () {
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

  install () {
    const { url } = this.props
    const { resourceText } = this.state

    installAsset(url, resourceText).then(result => {
      console.info('Successfully installed %s!', url)
      this.setState({ notify: 'Successfully instaled.'})
      setTimeout(() => {
        this.setState({ notify: '' })
        window.close()
      }, 2000)
    })
  }

  render () {
    const { url } = this.props
    const { resourceLoaded, resourceText, notify } = this.state
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
            { !resourceLoaded && <div className='info'>...loading...</div> }
            <Snackbar
              open={notify !== ''}
              SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
              message={<span id='message-id'>{notify}</span>}
            />
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
          .info {
            color: #AAA;
            margin: 5px 0;
            text-align: center;
          }
        `}</style>
      </Layout>
    )
  }
}
