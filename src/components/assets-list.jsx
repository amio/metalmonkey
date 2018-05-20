import React from 'react'
import { removeAsset } from '../libs/store.js'

import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import StarIcon from '@material-ui/icons/Star'

const AssetsList = ({ assets, onChange = () => {} }) => (
  <List>
    {
      assets.map(asset => (
        <AssetsListItem key={asset.from} {...asset} onChange={onChange} />
      ))
    }
  </List>
)

class AssetsListItem extends React.Component {
  deleteAsset = () => {
    const { from, onChange } = this.props
    removeAsset(from).then(onChange, console.error)
  }

  editAsset = () => {
    const { from } = this.props
    window.location.href = `/main.html?edit=${from}`
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
}

export default AssetsList
