import React from 'react'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import ScriptsList from './scripts-list.js'

const styles = {
  contentWrapper: {
    maxWidth: '1100px',
    margin: '3rem auto',
    fontSize: '16px'
  }
}

export default () => (
  <div>
    <AppBar title='MetalMonkey: Manager' />
    <Paper style={styles.contentWrapper}>
      <ScriptsList />
    </Paper>
  </div>
)
