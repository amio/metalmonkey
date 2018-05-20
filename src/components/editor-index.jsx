import React from 'react'
import { parseId, getAssetCode } from '../libs/store.js'
import Layout from './layout.jsx'
import Topbar from './topbar.jsx'

export default class EditorIndex extends React.Component {
  state = {
    src: ''
  }

  componentDidMount () {
    this.loadSource()
  }

  async loadSource () {
    const id = parseId(this.props.match.params.id)
    const code = await getAssetCode(id)
    this.setState({src: code.src})
  }

  render () {
    return (
      <Layout>
        <Topbar title='Editor' />
        <div className='main'>
          <textarea value={this.state.src} />
        </div>
        <style jsx>{`
          .main {
            max-width: 800px;
            padding: 2rem;
          }
          textarea {
            display: block;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </Layout>
    )
  }
}
