import React from 'react'
import { withRouter } from 'react-router'
import { removeUserscript } from '../lib/registry.js'
import Store from '../lib/store.js'

import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import { grey400 } from 'material-ui/styles/colors'

class ScriptsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      scriptsList: []
    }

    this.updateDataSource = this.updateDataSource.bind(this)
    this.onMenuClick = this.onMenuClick.bind(this)
  }

  componentDidMount () {
    this.updateDataSource()
  }

  updateDataSource () {
    Store.fetchAssetsRegistry().then(registry => {
      this.setState({
        scriptsList: Object.values(registry).map(item => item.meta)
      })
    })
  }

  onMenuClick (event, menuItem) {
    const { action, url } = menuItem.props.value
    switch (action) {
      case 'delete':
        removeUserscript(url).then(this.updateDataSource)
        break
    }
  }

  onItemClick (item, event) {
    const url = encodeURIComponent(item.url)
    this.props.router.push('edit/' + url)
  }

  render (props) {
    if (this.state.scriptsList.length === 0) {
      return <div style={styles.blank}>Nothing Installed</div>
    }

    const rightIconButton = (
      <IconButton touch>
        <MoreVertIcon color={grey400} />
      </IconButton>
    )
    return (
      <Paper>
        <List style={styles.wrapper}>
          {
            this.state.scriptsList.map((item, index) => {
              const rightIconMenu = (
                <IconMenu iconButtonElement={rightIconButton}
                  onItemTouchTap={this.onMenuClick} >
                  <MenuItem value={{action: 'delete', url: item.url}}>
                    Delete
                  </MenuItem>
                </IconMenu>
              )

              return (
                <ListItem key={item.url}
                  leftIcon={<ActionGrade style={{left: 14}} />}
                  rightIconButton={rightIconMenu}
                  onClick={this.onItemClick.bind(this, item)}
                >
                  <span>{item.name}</span>
                  <span style={styles.itemVersion}>{item.version}</span>
                </ListItem>
              )
            })
          }
        </List>
      </Paper>
    )
  }
}

const styles = {
  wrapper: {
  },
  itemVersion: {
    color: grey400,
    marginLeft: '0.5em'
  },
  blank: {
    margin: '8rem 0',
    textAlign: 'center'
  }
}

export default withRouter(ScriptsList)
