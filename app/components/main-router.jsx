import React from 'react'

import InstallIndex from './install-index.jsx'
import ManagerIndex from './manager-index.jsx'

function MainRouter (props) {
  const searchParams = new window.URLSearchParams(window.location.search)
  const installURL = searchParams.get('install')

  if (installURL) {
    return <InstallIndex url={installURL} />
  } else {
    return <ManagerIndex />
  }
}

export default MainRouter
