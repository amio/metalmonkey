// import { log } from './lib/dev-helper'
import router from './lib/router'
import genSidebar from './comp/sidebar'
import genManager from './comp/manager'
import genInstaller from './comp/installer'

const Sidebar = genSidebar()
const Manager = genManager()
const Installer = genInstaller()
const appRouter = router.route({
  '/manage': Manager,
  '/install': Installer
}, '/manage')

const App = React.createClass({
  render: function () {
    const router = this.router(this.props.route)
    return (
      <div className="main-wrapper">
        <Sidebar route={router.route}/>
        { router.subComponent() }
      </div>
    )
  },
  router: appRouter
})

router.init(App, document.body)
