import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import InstallIndex from './components/install-index.jsx'
import ManagerIndex from './components/manager-index.jsx'
import EditorIndex from './components/editor-index.jsx'

const routes = (
  <HashRouter>
    <Switch>
      <Route path='/install/:id' component={InstallIndex} />
      <Route path='/edit/:id' component={EditorIndex} />
      <Route component={ManagerIndex} />
    </Switch>
  </HashRouter>
)

document.body.insertAdjacentHTML('afterBegin', '<div id="app"></div>')
ReactDOM.render(routes, document.getElementById('app'))
