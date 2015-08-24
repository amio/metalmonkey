// import { log } from './lib/dev-helper'
import genUserscriptList from './comp/us-list'
import genInstaller from './comp/installer'

const UserscriptList = genUserscriptList(React)
const Installer = genInstaller(React)

const Sidebar = React.createClass({
  render: function () {
    return (
      <div className="sidebar">
        <div className="logo">
          MetalMonkey
        </div>
        <ul className="navs">
          <li className="sidebar-nav current"><a href="">manage scripts</a></li>
          <li className="sidebar-nav"><a href="">create • edit</a></li>
          <li className="sidebar-nav"><a href="">install</a></li>
          <li className="sidebar-nav"><a href="">options</a></li>
        </ul>
        <div className="etc">
          <div className="sidebar-nav">
            <a href="">helps</a>
          </div>
        </div>
      </div>
    )
  }
})

const Content = React.createClass({
  render: function () {
    return (
      <div className="content">
        <div className="content-header">
          <h2 className="page-title">Manage scripts</h2>
        </div>
        <div className="content-body">
          <Installer />
        </div>
      </div>
    )
  }
})

const App = React.createClass({
  render: function () {
    return (
      <div className="main-wrapper">
        <Sidebar/>
        <Content/>
      </div>
    )
  }
})

React.render(<App/>, document.body)
