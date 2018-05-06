import React from 'react'

import InstallIndex from './install-index.jsx'
import ManagerIndex from './manager-index.jsx'
import EditorIndex from './editor-index.jsx'

function MainRouter (props) {
  const searchParams = new window.URLSearchParams(window.location.search)
  const installURL = searchParams.get('install')
  const editURL = searchParams.get('edit')

  if (installURL) {
    return <InstallIndex url={installURL} />
  } else if (editURL) {
    return <EditorIndex url={editURL} />
  } else {
    return <ManagerIndex />
  }
}

export default MainRouter
