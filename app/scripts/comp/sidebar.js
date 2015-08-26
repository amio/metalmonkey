import classnames from 'classnames'

export default function () {
  const Sidebar = React.createClass({
    render: function () {
      const navClasses = (route) => classnames({
        'sidebar-nav': true,
        'current': route === this.props.route
      })
      return (
        <div className="sidebar">
          <div className="logo">
            MetalMonkey
          </div>
          <ul className="navs">
            <li className={ navClasses('/manage') }><a href="#/manage">manage scripts</a></li>
            <li className={ navClasses('/editor') }><a href="#/editor">create • edit</a></li>
            <li className={ navClasses('/install/:url') }><a href="#/install">install</a></li>
            <li className={ navClasses('/options') }><a href="#/options">options</a></li>
          </ul>
          <div className="etc">
            <div className={ navClasses('helps') }>
              <a href="#helps">helps</a>
            </div>
          </div>
        </div>
      )
    }
  })

  return Sidebar
}
