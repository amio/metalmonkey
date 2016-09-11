import React from 'react'
import ReactDocumentTitle from 'react-document-title'
import AppBar from 'material-ui/AppBar'
import { getUserscript } from '../lib/registry.js'
import theme from '../themes/default.js'

export default class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.onChange = (evt) => this.setState({codeText: evt.target.value});
  }

  componentDidMount () {
    const usid = this.props.params.usid
    getUserscript(usid).then(text => this.setState({
      original: text,
      codeText: text
    }))
  }

  render () {
    return (
      <div style={styles.layout}>
        <ReactDocumentTitle title='METALMONKEY Editor' />
        <AppBar
          title={<span><b>METALMONKEY</b> Editor</span>}
          titleStyle={theme.appBar.titleStyle}
          showMenuIconButton={false} />
        <label style={styles.contentWrapper}>
          <div style={styles.editorWrapper}>
            <textarea style={styles.editor} value={this.state.codeText} spellCheck={false} onChange={this.onChange} />
          </div>
        </label>
      </div>
    )
  }
}

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  contentWrapper: {
    flex: 1
  },
  editorWrapper: {
    margin: '0 auto',
    width: '80%',
    maxWidth: '1200px',
    marginTop: '1rem',
    height: 'calc(100% - 56px - 2rem)'
  },
  editor: {
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    fontFamily: 'monospace',
    padding: '0.8em 1em',
    fontSize: '14px',
    resize: 'none'
  }
}
