import { log } from '../lib/helper'
import usp from 'userscript-parser'
import { registerUserscript } from '../lib/registry'

const Installer = React.createClass({
  render: function () {
    const us = this.state.us
    return (
      <div className="content installer">
        <div className="content-header">
          <div className="page-title">
            <h2>Install: { us.name || '. . . loading script . . .' }</h2>
            <span className="title-desc">{ us.url }</span>
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
                <tr><th>author</th><td>{ us.author }</td></tr>
                <tr><th>version</th><td>{ us.version }</td></tr>
                <tr><th>description</th><td>{ us.description }</td></tr>
              </tbody>
            </table>
            <table className="apply-to">
              <tbody>
                <tr><th>applies to</th><td>{ us.matches && us.matches.join(' ') }</td></tr>
              </tbody>
            </table>
          </div>
          <div className="userscript-code" onChange={ this.modifyCode }>
            <pre>{ us.content }</pre>
          </div>
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
        this.setState(({
          us: { content: text }
        }))
        const parsed = usp(text)
        const usData = {
          url: url,
          name: parsed.name[0],
          author: parsed.author ? parsed.author[0] : '',
          version: parsed.version ? parsed.version[0] : '',
          description: parsed.description ? parsed.description[0] : '',
          matches: [].concat(parsed.match, parsed.include),
          content: text
        }
        this.setState({us: usData})
      })
  },
  installUserscript: function () {
    registerUserscript(this.state.us.url, this.state.us.content)
      .then(function () {
        // window.close()
      })
      .catch(function (e) {
        log(e)
        window.alert('Ooops, install failed. Please retry.')
      })
  },
  handleWithChrome: function () {
    console.log('handle with chrome')
  },
  modifyCode: function () {
    console.log('modified')
  }
})

export default Installer
