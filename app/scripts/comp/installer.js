
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
            <div className="action-button">
              <button className="install">install</button>
              <a onClick={ this.handleWithChrome }>handle with chrome</a>
            </div>
          </div>
          <div className="content-body">

          </div>
        </div>
      )
    },
    handleWithChrome: function () {
      console.log('handle with chrome')
    }
  })

  return Installer
}
