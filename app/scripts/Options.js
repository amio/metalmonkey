const { React, ReactDOM } = window

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

class OptionsApp extends React.Component {
  constructor (props) {
    super()
    this.state = {
      resourceText: 'new options page.',
      resourceLoaded: false
    }
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={<span>MetalMonkey</span>}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          />
          <div style={styles.contentWrapper}>
            <pre id='code'>{this.state.resourceText}</pre>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

const styles = {
  contentWrapper: {
    margin: '0 auto',
    maxWidth: '1200px',
    padding: '3rem',
    fontSize: '16px'
  }
}

ReactDOM.render(<OptionsApp />, document.getElementById('app'))
