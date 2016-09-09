import React from 'react'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import theme from '../themes/default.js'
import { getUserscript } from '../lib/registry.js'

export default class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    const usid = this.props.params.usid
    getUserscript(usid).then(text => this.setState({
      codeText: text
    }))
  }

  render () {
    return (
      <div style={styles.layout}>
        <AppBar
          title={<span><b>METALMONKEY</b> Editor</span>}
          titleStyle={theme.appBar.titleStyle}
          showMenuIconButton={false} />
        <div style={styles.contentWrapper}>
          <Paper style={styles.editorWrapper}>
            <textarea style={styles.editor} value={this.state.codeText} spellCheck={false} />
          </Paper>
        </div>
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
    flex: 1,
    margin: '0 auto',
    width: '80%',
    maxWidth: '1100px'
  },
  editorWrapper: {
    marginTop: '3rem',
    height: 'calc(100% - 56px - 6rem)'
  },
  editor: {
    border: 'none',
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    fontFamily: 'monospace',
    padding: '0.8em 1.2em',
    fontSize: '14px'
  }
}
