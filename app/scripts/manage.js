// import { log } from './lib/dev-helper'
import genUserscriptList from './comp/us-list'
import genInstaller from './comp/installer'
import genSidebar from './comp/sidebar'

const Sidebar = genSidebar(React)

const App = React.createClass({
  render: function () {
    return (
      <div className="main-wrapper">
        <Sidebar route={this.props.route}/>
        <div className="content">
          <div className="content-header">
            <h2 className="page-title">Manage scripts</h2>
          </div>
          <div className="content-body">
            { this.routeComponents() }
          </div>
        </div>
      </div>
    )
  },
  routeComponents: function () {
    // Lazy execute
    const createComponent = (generator) => React.createElement(
      generator(React), { route: this.props.route }
    )
    switch (this.props.route) {
      case 'manage':
        return createComponent(genUserscriptList)
      case 'install':
        return createComponent(genInstaller)
      default:
        return createComponent(genUserscriptList)
    }
  }
})

function mainRender () {
  const route = window.location.hash.substr(1)
  React.render(<App route={route} />, document.body)
}
window.addEventListener('hashchange', mainRender)
mainRender()
