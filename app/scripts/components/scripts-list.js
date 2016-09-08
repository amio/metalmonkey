import React from 'react'
import { getUserscriptList, removeUserscript } from '../lib/registry.js'

import { List, ListItem } from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import { grey400 } from 'material-ui/styles/colors'

export default class ScriptsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      scriptsList: []
    }

    this.updateData = this.updateData.bind(this)
    this.onMenuClick = this.onMenuClick.bind(this)
  }

  componentDidMount () {
    this.updateData()
  }

  updateData () {
    return getUserscriptList()
    .then(scripts => this.setState({
      scriptsList: scripts
    }))
  }

  onMenuClick (event, menuItem) {
    const { action, usid } = menuItem.props.value
    switch (action) {
      case 'delete':
        removeUserscript(usid).then(this.updateData)
        break
    }
  }

  render (props) {
    const rightIconButton = (
      <IconButton touch>
        <MoreVertIcon color={grey400} />
      </IconButton>
    )
    return (
      <List style={styles.wrapper}>
        {
          this.state.scriptsList.map((item, index) => {
            const rightIconMenu = (
              <IconMenu iconButtonElement={rightIconButton}
                onItemTouchTap={this.onMenuClick} >
                <MenuItem value={{action: 'delete', usid: item.usid}}>
                  Delete
                </MenuItem>
              </IconMenu>
            )

            return (
              <ListItem key={item.usid}
                leftIcon={<ActionGrade style={{left: 14}} />}
                rightIconButton={rightIconMenu}
              >
                <span>{item.name}</span>
                <span style={styles.itemVersion}>{item.version}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }
}

const styles = {
  wrapper: {
  },
  itemVersion: {
    color: grey400,
    marginLeft: '0.5em'
  }
}
