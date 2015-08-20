const UserscriptList = React.createClass({
  render: function () {
    const usNodes = this.props.items.map(function (us) {
      return (
        <li className="item" key={ us.usid }>
          <span className="item-status">{ us.enabled ? 'YES' : 'NO' }</span>
          <span className="item-name">{ us.name }</span>
          <span className="item-version">v{ us.version }</span>
          <span className="item-links"><a href="{ us.links }">HOME</a></span>
          <span className="item-actions">
            <a>UPDATE</a>•
            <a>EDIT</a>•
            <a className="delete">DELETE</a>
          </span>
        </li>
      )
    })
    return (
      <ul className="us-list">
        { usNodes }
      </ul>
    )
  }
})

const data = {
  items: [
    {
      usid: 'http://www.example.com/downloader.user.js',
      enabled: true,
      name: 'Youtube Downloader',
      version: '0.2.1',
      links: 'http://www.example.com'
    },
    {
      usid: 'http://www.example.com/destroyer.user.js',
      enabled: true,
      name: 'Youtube Anotation Destroyer',
      version: '1.1.2',
      links: 'http://www.example.com'
    },
    {
      usid: 'http://www.example.com/disabled.user.js',
      enabled: false,
      name: 'A Disabled Userscript',
      version: '1.0',
      links: 'http://www.example.com'
    }
  ]
}

React.render(
  React.createElement(UserscriptList, data),
  document.getElementById('us-list')
)
