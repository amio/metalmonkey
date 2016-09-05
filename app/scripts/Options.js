const { React, ReactDOM } = window

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
// import IconButton from 'material-ui/IconButton'
// import NavigationClose from 'material-ui/svg-icons/navigation/close'

import { getUserscriptList, removeUserscript } from './lib/registry.js'

class OptionsApp extends React.Component {
  constructor (props) {
    super()
    this.state = {
      resourceText: 'new options page.',
      resourceLoaded: false
    }
  }

  componentDidMount () {
    getUserscriptList()
      .then(scripts => {
        console.log(scripts, removeUserscript)
        this.setState({
          items: scripts
        })
      })
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title={<span>MetalMonkey</span>} />
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
