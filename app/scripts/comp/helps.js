const HelpsPanel = React.createClass({
  render: function () {
    return (
    <div className="content">
      <div className="content-header">
        <div className="page-title">
          <h2>Helps</h2>
        </div>
      </div>
      <div className="content-body">
        Hello world!
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

export default HelpsPanel
