// import { log } from './lib/helper'
import router from './lib/router'
import genSidebar from './comp/sidebar'
import genManager from './comp/manager'
import genInstaller from './comp/installer'
import genInstallerHome from './comp/installer-home'
import genOptions from './comp/options'
import genHelps from './comp/helps'

const Sidebar = genSidebar()
const Manager = genManager()
const Installer = genInstaller()
const InstallerHome = genInstallerHome()
const Options = genOptions()
const Helps = genHelps

const appRouter = router.route({
  '/manage': Manager,
  '/install/:url': Installer,
  '/install': InstallerHome,
  '/options': Options,
  '/helps': Helps
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
