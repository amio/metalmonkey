import React from 'react'
import { parseId, getAssetCode } from '../libs/store.js'
import Layout from './layout.jsx'

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
      <Layout title='Editor'>
        <div className='main'>
          <textarea readOnly value={this.state.src} />
        </div>
        <style jsx>{`
          textarea {
            display: block;
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            background: none;
            padding: 1rem;
            font: 14px/1.2em monospace;
          }
        `}</style>
      </Layout>
    )
  }
}
