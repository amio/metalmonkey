
import { getUserscriptList, removeUserscript } from '../lib/registry'
import classnames from 'classnames'

export default function (React) {

  const Userscript = React.createClass({
    render: function () {
      const meta = this.state.meta
      const classes = classnames('item', {
        disabled: !meta.enabled
      })
      return (
        <li className={ classes }>
          <span className="item-status">
            <input type="checkbox" checked={ meta.enabled } onChange={ this.setEnableStatus } />
          </span>
          <span className="item-name">{ meta.name }</span>
          <span className="item-version">v{ meta.version }</span>
          <span className="item-links">
            { meta.links && <a href={ meta.links[0] }>HOME</a> }
          </span>
          <span className="item-actions">
            <a>UPDATE</a>•
            <a>EDIT</a>•
            <a className="delete" onClick={ this.removeScript }>DELETE</a>
          </span>
        </li>
      )
    },
    getInitialState: function () {
      return {
        meta: this.props.meta
      }
    },
    setEnableStatus: function () {
      let meta = this.state.meta
      meta.enabled = !meta.enabled
      chrome.storage.sync.set(
        { [meta.usid]: meta },
        () => this.setState({meta: meta})
      )
    },
    removeScript: function () {
      removeUserscript(this.props.us.usid)
        .then(this.props.onRemove)
    }
  })

  const ManagePanel = React.createClass({
    render: function () {
      return (
        <div className="content">
          <div className="content-header">
            <div className="page-title">
              <h2>Manage scripts</h2>
            </div>
          </div>
          <div className="content-body">
            <ul className="us-list">
              { this.state.items.map((us) => {
                return React.createElement(Userscript, {
                  key: us.usid,
                  meta: us,
                  onRemove: this.updateList
                })
              }) }
            </ul>
          </div>
        </div>
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

  return ManagePanel
}
