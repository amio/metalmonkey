import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import ReactDocumentTitle from 'react-document-title'
import Manager from './components/options-manager.js'
import Editor from './components/options-editor.js'

import theme from './themes/default.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import 'react-mdl/extra/material.js'

const OptionsApp = () => (
  <MuiThemeProvider muiTheme={theme}>
    <ReactDocumentTitle title='METALMONKEY'>
      <Router history={hashHistory}>
        <Route path='edit/:url' component={Editor} />
        <Route path='create/:url' component={Editor} />
        <Route path='*' component={Manager} />
      </Router>
    </ReactDocumentTitle>
  </MuiThemeProvider>
)

ReactDOM.render(<OptionsApp />, document.getElementById('app'))
