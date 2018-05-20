import React from 'react'
import { withRouter } from 'react-router-dom'
import { removeAsset, genId } from '../libs/store.js'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import StarIcon from '@material-ui/icons/Star'

const AssetsList = ({ assets, onChange = () => {} }) => (
  <List>
    {
      assets.map(asset => (
        <AssetsListItem
          {...asset}
          key={asset.from}
          onChange={onChange} />
      ))
    }
  </List>
)

const AssetsListItem = withRouter(class extends React.Component {
  deleteAsset = () => {
    const { from, onChange } = this.props
    removeAsset(from).then(onChange, console.error)
  }

  editAsset = () => {
    const { from, history } = this.props
    history.push(`/edit/${genId(from)}`)
  }

  render () {
    const { meta = {} } = this.props
    const { name, version, author } = meta
    console.log(name, this.props)

    return (
      <ListItem button onClick={this.editAsset}>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText secondary={author}>
          <span>{name || 'Anoymous'} <sup>{version}</sup></span>
        </ListItemText>
        <ListItemSecondaryAction style={{ margin: '0 0.5rem' }}>
          <IconButton aria-label='Delete'>
            <DeleteIcon onClick={this.deleteAsset} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
})

export default AssetsList
