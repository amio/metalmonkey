import React from 'react'
import Layout from './layout.jsx'
import Topbar from './topbar.jsx'

import { listAssets } from '../libs/store.js'

export default class ManagerIndex extends React.Component {
  async componentDidMount () {
    const assets = await listAssets()
    console.log(assets)
  }

  render () {
    return (
      <Layout>
        <Topbar title='Manager' />
      </Layout>
    )
  }
}
