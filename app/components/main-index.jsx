import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import Layout from './layout.jsx'

function MainIndex (props) {
  return (
    <Layout>
      <AppBar position='static'>
        <div>
          <Toolbar>
            <IconButton color='inherit'>
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit' className='main-title'>
              METALMONKEY
            </Typography>
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </div>
      </AppBar>
      <style jsx>{`
        div :global(.main-title) {
          flex: 1
        }
      `}</style>
    </Layout>
  )
}

export default MainIndex
