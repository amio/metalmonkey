import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Manager from './components/options-manager.js'
import Editor from './components/options-editor.js'

import theme from './themes/default.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const OptionsApp = () => (
  <MuiThemeProvider muiTheme={theme}>
    <Router history={browserHistory}>
      <Route path='/' component={Manager}>
        <Route path='edit/:usid' component={Editor} />
        <Route path='*' component={Manager} />
      </Route>
    </Router>
  </MuiThemeProvider>
)

ReactDOM.render(<OptionsApp />, document.getElementById('app'))
