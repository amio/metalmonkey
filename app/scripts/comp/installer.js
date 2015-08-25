import usp from 'userscript-parser'
import { registerUserscript } from '../lib/registry'

export default function () {
  const Installer = React.createClass({
    render: function () {
      return (
        <div className="content installer">
          <div className="content-header">
            <div className="page-title">
              <h2>Install: { this.state.us.name || '. . . loading script . . .' }</h2>
              <span className="title-desc">{ this.state.us.url }</span>
            </div>
            <div className="actions">
              <a className="install-button" onClick={ this.installUserscript }>install</a>
              <a className="handle-with-chrome" onClick={ this.handleWithChrome }>handle with chrome</a>
            </div>
          </div>
          <div className="content-body">
            <div className="userscript-meta">
              <table className="info">
                <tbody>
                  <tr><th>author</th><td>{ this.state.us.author }</td></tr>
                  <tr><th>version</th><td>{ this.state.us.version }</td></tr>
                  <tr><th>description</th><td>{ this.state.us.description }</td></tr>
                </tbody>
              </table>
              <table className="apply-to">
                <tbody>
                  <tr><th>applies to</th><td>{ '' + this.state.us.appliesto }</td></tr>
                </tbody>
              </table>
            </div>
            <textarea className="userscript-code" value={ this.state.us.content } onChange={ this.modifyCode }></textarea>
          </div>
        </div>
      )
    },
    getInitialState: function () {
      return {
        route: this.props.route,
        us: {}
      }
    },
    componentWillMount: function () {
      const url = decodeURIComponent(this.props.url)
      fetch(url)
        .then((response) => {
          return response.text()
        })
        .then((text) => {
          const parsed = usp(text)
          this.state.us = {
            url: url,
            name: parsed.name[0],
            author: parsed.author[0],
            version: parsed.version[0],
            description: parsed.description[0],
            appliesto: parsed.include,
            content: parsed.content
          }
          this.setState(this.state)
        })
    },
    installUserscript: function () {
      registerUserscript(this.state.us.url, this.state.us.content)
    },
    handleWithChrome: function () {
      console.log('handle with chrome')
    },
    modifyCode: function () {
      console.log('modified')
    }
  })

  return Installer
}
