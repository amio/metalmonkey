import React from 'react'
import Layout from './layout.jsx'
import Topbar from './topbar.jsx'

export default class EditorIndex extends React.Component {
  render () {
    return (
      <Layout>
        <Topbar title='Editor' />
        <div className='main'>
          asdf
        </div>
        <style jsx>{`
          .main {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
          }
        `}</style>
      </Layout>
    )
  }
}
