import React from 'react'
import ReactDocumentTitle from 'react-document-title'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { getUserscript, registerUserscript } from '../lib/registry.js'
import theme from '../themes/default.js'

export default class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.onChange = (evt) => this.setState({codeText: evt.target.value})
    this.onSave = () => registerUserscript(this.props.params.usid, this.state.codeText)
  }

  componentDidMount () {
    const usid = this.props.params.usid
    getUserscript(usid).then(text => this.setState({
      original: text,
      codeText: text
    }))
  }

  render () {
    const saveButton = this.state.codeText !== this.state.original
      ? <FlatButton label='Save' onClick={this.onSave} />
      : undefined
    return (
      <div style={styles.layout}>
        <ReactDocumentTitle title='METALMONKEY Editor' />
        <AppBar
          title={<span><b>METALMONKEY</b> Editor</span>}
          titleStyle={theme.appBar.titleStyle}
          showMenuIconButton={false}
          iconElementRight={saveButton} />
        <div style={styles.editorBannerWrapper}>
          <div style={styles.editorBanner}>{this.props.params.usid}</div>
        </div>
        <label style={styles.contentWrapper}>
          <div style={styles.editorWrapper}>
            <textarea
              spellCheck={false}
              style={styles.editor}
              value={this.state.codeText}
              onChange={this.onChange} />
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
  editorBannerWrapper: {
    height: theme.appBar.height,
    lineHeight: theme.appBar.height + 'px',
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#AAA',
    background: '#FFF',
    borderBottom: '1px solid #EEE'
  },
  editorBanner: {
    margin: 'auto',
    width: '80%',
    maxWidth: '1200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  editorWrapper: {
    margin: '0 auto',
    width: '80%',
    maxWidth: '1200px',
    height: 'calc(100% - 56px - 56px)'
  },
  editor: {
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    padding: '1rem 0',
    fontFamily: 'monospace',
    fontSize: '14px',
    resize: 'none'
  }
}
