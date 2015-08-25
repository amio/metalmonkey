
export default function () {
  const InstallerHome = React.createClass({
    render: function () {
      return (
        <div className="content installer-home">
          <div className="content-header">
            <div className="page-title">
              <h2>Find Userscript</h2>
            </div>
          </div>
          <div className="content-body">
            <p>Discover userscript at:</p>
            <p className="links">
              <a href="https://greasyfork.org">GreasyFork</a>
              <a href="https://openuserjs.org">OpenUserJS</a>
              <a href="http://userscripts-mirror.org/">UserscriptsMirror</a>
            </p>
          </div>
        </div>
      )
    },
    searchUserscript: function () {
      console.log('search')
    }
  })

  return InstallerHome
}
