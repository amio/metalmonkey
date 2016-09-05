import React from 'react'
import classnames from 'classnames'

const Sidebar = React.createClass({
  render: function () {
    const routeMapping = {
      '/manage': 'manage',
      '/editor': 'editor',
      '/install/:url': 'install',
      '/install': 'install',
      '/options': 'options',
      '/helps': 'helps'
    }
    const navClasses = (route) => classnames({
      ['nav-' + route]: true,
      'sidebar-nav': true,
      'current': route === routeMapping[this.props.route]
    })
    return (
      <div className='sidebar'>
        <div className='logo'>
          MetalMonkey
        </div>
        <ul className='navs'>
          <li className={navClasses('manage')}><a href='#/manage'>manage</a></li>
          <li className={navClasses('editor')}><a href='#/editor'>create • edit</a></li>
          <li className={navClasses('install')}><a href='#/install'>discover</a></li>
          <li className={navClasses('options')}><a href='#/options'>options</a></li>
        </ul>
        <div className='etc'>
          <div className={navClasses('helps')}>
            <a href='#helps'>helps</a>
          </div>
        </div>
      </div>
    )
  }
})

export default Sidebar
