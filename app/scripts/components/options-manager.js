import React from 'react'
import ReactDocumentTitle from 'react-document-title'
import AppBar from 'material-ui/AppBar'
import ScriptsList from './scripts-list.js'
import theme from '../themes/default.js'

export default () => (
  <div style={styles.layout}>
    <ReactDocumentTitle title='METALMONKEY Manager' />
    <AppBar
      title={<span><b>METALMONKEY</b> Manager</span>}
      titleStyle={theme.appBar.titleStyle}
      showMenuIconButton={false} />
    <div style={styles.contentWrapper}>
      <ScriptsList />
    </div>
  </div>
)

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  contentWrapper: {
    maxWidth: '1100px',
    width: '80%',
    overflow: 'scroll',
    margin: '3rem auto',
    fontSize: '16px'
  }
}
