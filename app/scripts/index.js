// import { log } from './lib/dev-helper'
import genSidebar from './comp/sidebar'
import genManage from './comp/manage'
import genInstaller from './comp/installer'

const Sidebar = genSidebar(React)

const App = React.createClass({
  render: function () {
    return (
      <div className="main-wrapper">
        <Sidebar route={this.props.route}/>
        { this.routeComponents() }
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
        return createComponent(genManage)
      case 'install':
        return createComponent(genInstaller)
      default:
        return createComponent(genManage)
    }
  }
})

function mainRender () {
  const route = window.location.hash.substr(1)
  React.render(<App route={route} />, document.body)
}
window.addEventListener('hashchange', mainRender)
mainRender()
