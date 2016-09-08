import React from 'react'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import ScriptsList from './scripts-list.js'
import theme from '../themes/default.js'

export default () => (
  <div>
    <AppBar title='MetalMonkey / Manage Scripts' titleStyle={theme.appBar.titleStyle} />
    <Paper style={styles.contentWrapper}>
      <ScriptsList />
    </Paper>
  </div>
)

const styles = {
  contentWrapper: {
    maxWidth: '1100px',
    margin: '3rem auto',
    fontSize: '16px'
  }
}
