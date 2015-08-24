export default function (React) {
  const Sidebar = React.createClass({
    render: function () {
      return (
        <div className="sidebar">
          <div className="logo">
            MetalMonkey
          </div>
          <ul className="navs">
            <li className="sidebar-nav current"><a href="#manage">manage scripts</a></li>
            <li className="sidebar-nav"><a href="#editor">create • edit</a></li>
            <li className="sidebar-nav"><a href="#install">install</a></li>
            <li className="sidebar-nav"><a href="#options">options</a></li>
          </ul>
          <div className="etc">
            <div className="sidebar-nav">
              <a href="#helps">helps</a>
            </div>
          </div>
        </div>
      )
    }
  })

  return Sidebar
}
