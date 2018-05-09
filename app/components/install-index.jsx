import React from 'react'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import readTextStream from 'read-text-stream'

import Layout from './layout.jsx'
import Topbar from './topbar.jsx'
import { installAsset, parseId } from '../libs/store.js'

export default class InstallIndex extends React.Component {
  state = {
    resourceURL: parseId(this.props.match.params.id),
    resourceText: '',
    resourceLoaded: false,
    notify: ''
  }

  componentDidMount () {
    this.loadResource()
  }

  loadResource = () => {
    window.fetch(this.state.resourceURL)
      .then(async res => readTextStream(res.body, (partial, bytes) => {
        this.setState({ resourceText: this.state.resourceText + partial })
      }))
      .then(() => {
        this.setState({ resourceLoaded: true })
      }, e => console.error(e))
  }

  install = async () => {
    const { resourceURL, resourceText } = this.state

    installAsset(resourceURL, resourceText).then(result => {
      this.setState({ notify: 'Successfully instaled.' })
    }, e => {
      this.setState({ notify: `ERROR: ${e.message}` })
    })
  }

  onNotifyClose = () => {
    if (!this.state.notify.match(/ERROR/)) {
      window.close()
    }
  }

  render () {
    const { resourceURL, resourceLoaded, resourceText, notify } = this.state
    return (
      <Layout>
        <Topbar title='Install' />
        <div className='url'>{resourceURL}</div>
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
            autoHideDuration={1200}
            onClose={this.onNotifyClose}
            SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
            message={<span id='message-id'>{notify}</span>}
          />
        </div>
        <pre className='code'>{resourceText}</pre>
        <style jsx>{`
          .url {
            background-color: #FFF;
            padding: 1rem;
            color: #666;
            font: 14px/1.4rem Courier, monospace;
            border-bottom: 1px solid #EEE;
          }
          .ops {
            float: right;
            margin: 1rem;
          }
          .code {
            margin: 1rem;
            font-size: 14px;
            color: #222;
            white-space: pre-wrap;
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
