// import { log } from './lib/helper'
import router from './comp/router'
import Sidebar from './comp/sidebar.jsx'
import Manager from './comp/manager.jsx'
import Installer from './comp/installer.jsx'
import InstallerHome from './comp/installer-home.jsx'
import Options from './comp/options.jsx'
import Helps from './comp/helps.jsx'

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

router.init(App, document.querySelector('#app'))
