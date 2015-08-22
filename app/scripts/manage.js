// import { log } from './lib/dev-helper'
import { getUserscriptList, removeUserscript } from './lib/registry'

const Userscript = React.createClass({
  render: function () {
    const us = this.props.us
    return (
      <li className="item">
        <span className="item-status"><input type="checkbox" checked={ us.enabled } /></span>
        <span className="item-name">{ us.name }</span>
        <span className="item-version">v{ us.version }</span>
        <span className="item-links">
          { us.links && <a href={ us.links[0] }>HOME</a> }
        </span>
        <span className="item-actions">
          <a>UPDATE</a>•
          <a>EDIT</a>•
          <a className="delete" onClick={ this.removeScript }>DELETE</a>
        </span>
      </li>
    )
  },
  removeScript: function () {
    removeUserscript(this.props.us.usid)
      .then(this.props.onRemove)
  }
})

const UserscriptList = React.createClass({
  render: function () {
    return (
    <ul className="us-list">
      { this.state.items.map((us) => {
        return React.createElement(Userscript, {
          us: us,
          key: us.usid,
          onRemove: this.updateList
        })
      }) }
    </ul>
    )
  },
  getInitialState: function () {
    return {
      items: this.props.items || []
    }
  },
  componentWillMount: function () {
    this.updateList()
  },
  updateList: function () {
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
