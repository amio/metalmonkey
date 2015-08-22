import { getUserscriptList } from './lib/registry'

const UserscriptList = React.createClass({
  render: function () {
    return (
    <ul className="us-list">
      {this.state.items.map(function (us) {
        return (
          <li className="item" key={ us.usid }>
            <span className="item-status"><input type="checkbox" checked={ us.enabled } /></span>
            <span className="item-name">{ us.name }</span>
            <span className="item-version">v{ us.version }</span>
            <span className="item-links"><a href={ us.links && us.links[0] }>HOME</a></span>
            <span className="item-actions"><a>UPDATE</a>• <a>EDIT</a>• <a className="delete">DELETE</a></span>
          </li>
        )
      })}
    </ul>
    )
  },
  getInitialState: function () {
    return {
      items: this.props.items || []
    }
  },
  componentWillMount: function () {
    getUserscriptList()
      .then(scripts => {
        this.setState({
          items: scripts
        })
      })
  }
})

React.render(
  React.createElement(UserscriptList),
  document.getElementById('us-list')
)
