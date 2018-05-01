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
        <AssetsListItem key={asset.url} {...asset} onChange={onChange} />
      ))
    }
  </List>
)

class AssetsListItem extends React.Component {
  deleteAsset = () => {
    const { url, onChange } = this.props
    removeAsset(url).then(onChange, console.error)
  }

  render () {
    const { meta = {}, url } = this.props
    const { name, version, author } = meta
    console.log(this.props)

    return (
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText secondary={author || url}>
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
