import React from 'react'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import ScriptsList from './scripts-list.js'
import theme from '../themes/default.js'

export default () => (
  <div style={styles.layout}>
    <AppBar
      title={<span><b>METALMONKEY</b> Manager</span>}
      titleStyle={theme.appBar.titleStyle}
      showMenuIconButton={false} />
    <Paper style={styles.contentWrapper}>
      <ScriptsList />
    </Paper>
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
