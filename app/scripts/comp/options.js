
export default function () {

  const OptionsPanel = React.createClass({
    render: function () {
      return (
        <div className="content">
          <div className="content-header">
            <div className="page-title">
              <h2>Options</h2>
            </div>
          </div>
          <div className="content-body">
            <ul className="option-list">
              <li className="option-group">
                <h3 className="group-title">APPEARANCE</h3>
                <div className="group-content">
                  <div className="option">
                    <span className="option-desc">Editor Font Size:</span>
                    <label><input name="editor-font-size" type="radio"></input>SMALL</label>
                    <label><input name="editor-font-size" type="radio" checked></input>MEDIUM</label>
                    <label><input name="editor-font-size" type="radio"></input>LARGE</label>
                  </div>
                </div>
              </li>
              <li className="option-group">
                <h3 className="group-title">MAINTENANCE</h3>
                <div className="group-content">
                  <button onClick={ this.clearAllData }>CLEAR ALL DATA</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    clearAllData: function () {
      const confirmed = window.confirm('Delete all userscripts?')
      if (confirmed) {
        chrome.storage.sync.clear()
        chrome.storage.local.clear()
      }
    }
  })

  return OptionsPanel
}
