import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'

import ScriptsList from './components/scripts-list.js'

class OptionsApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      resourceLoaded: false
    }
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title={<span>MetalMonkey</span>} />
          <Paper style={styles.contentWrapper}>
            <ScriptsList />
          </Paper>
        </div>
      </MuiThemeProvider>
    )
  }
}

const styles = {
  contentWrapper: {
    maxWidth: '1100px',
    margin: '3rem auto',
    fontSize: '16px'
  }
}

ReactDOM.render(<OptionsApp />, document.getElementById('app'))
