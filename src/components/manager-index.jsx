import React from 'react'
import Layout from './layout.jsx'
import { listAssets } from '../libs/store.js'
import AssetsList from './assets-list.jsx'

import Paper from '@material-ui/core/Paper'

export default class ManagerIndex extends React.Component {
  state = {
    installedAssets: []
  }

  componentDidMount () {
    this.updateAssetsList()
  }

  updateAssetsList = async () => {
    this.setState({
      installedAssets: await listAssets()
    })
  }

  render () {
    const { installedAssets } = this.state

    return (
      <Layout title='Manager'>
        <div className='main'>
          <Paper>
            <AssetsList assets={installedAssets} onChange={this.updateAssetsList} />
          </Paper>
        </div>
        <style jsx>{`
          .main {
            min-width: 60vw;
            margin: 0 auto;
            padding: 2rem;
          }
        `}</style>
      </Layout>
    )
  }
}
