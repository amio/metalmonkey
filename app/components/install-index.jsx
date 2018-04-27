import React from 'react'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'

import Layout from './layout.jsx'
import Topbar from './topbar.jsx'
import { installAsset } from '../libs/store.js'
import readTextStream from 'read-text-stream'

export default class InstallIndex extends React.Component {
  state = {
    resourceText: '',
    resourceLoaded: false,
    notify: ''
  }

  componentDidMount () {
    this.loadResource()
  }

  loadResource = () => {
    window.fetch(this.props.url)
      .then(async res => readTextStream(res.body, (partial, bytes) => {
        this.setState({ resourceText: this.state.resourceText + partial })
      }))
      .then(() => {
        this.setState({ resourceLoaded: true })
      }, e => console.error(e))
  }

  install = () => {
    const { url } = this.props
    const { resourceText } = this.state

    installAsset(url, resourceText).then(result => {
      // console.info('Successfully installed %s!', url)
      this.setState({ notify: 'Successfully instaled.'})
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
              autoHideDuration={1200}
              onClose={() => this.setState({ notify: '' }, window.close())}
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
