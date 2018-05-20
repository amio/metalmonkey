import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { version } from '../../package.json'

export default ({title}) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton color='inherit'>
          <MenuIcon />
        </IconButton>
        <Typography variant='title' color='inherit' style={{flex: 1}}>
          <em>METALMONKEY</em><span>{title}</span>
        </Typography>
        <i>{version}</i>
      </Toolbar>
      <style jsx>{`
        em, span {
          font-size: 1.2rem;
        }
        em {
          margin: 0 0.2em;
          font-style: normal;
          font-weight: 600;
        }
        span {
          font-weight: 300;
        }
        i {
          font-style: normal;
          font-size: 14px;
          opacity: 0.6;
        }
      `}</style>
    </AppBar>
  )
}
