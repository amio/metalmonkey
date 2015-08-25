
export default function () {
  const Installer = React.createClass({
    render: function () {
      return (
        <div className="content installer">
          <div className="content-header">
            <div className="page-title">
              <h2>Install: Youtube Auto Subtitle Downloader</h2>
              <span className="title-desc">{'https://greasyfork.org/scripts/5367-youtube-auto-subtitle-downloader/code/Youtube%20Auto%20Subtitle%20Downloader.user.js'}</span>
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
                  <tr><th>author</th><td>gantt</td></tr>
                  <tr><th>version</th><td>1.2.3</td></tr>
                  <tr><th>description</th><td>Adds a button that lets you download YouTube videos.</td></tr>
                </tbody>
              </table>
              <table className="apply-to">
                <tbody>
                  <tr><th>applies to</th><td>youtube.com<br/>ytimg.com</td></tr>
                </tbody>
              </table>
            </div>
            <textarea className="userscript-code" value="codes" onChange={ this.modifyCode }></textarea>
          </div>
        </div>
      )
    },
    installUserscript: function () {
      console.log('install')
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
