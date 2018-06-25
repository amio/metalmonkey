import browser from 'webextension-polyfill'
import parseMeta from './libs/parse-meta.js'
import match from 'url-match-patterns'
import * as userjsInstall from './libs/install-button.user.js'

// Userscript Install Button for npmjs.com/package/*
if (userjsInstall.options.matches.find(p => match(p, window.location.href))) {
  userjsInstall.default()
}

// Inject install button on `*.user.mjs` pages
if (document.title === '' && /\.user\.mjs/.test(window.location.href)) {
  const source = document.body.innerText
  if (parseMeta(source).parsed) {
    insertInstallButton(source)
  }
}

function insertInstallButton (src) {
  document.body.insertAdjacentHTML(
    'afterbegin',
    '<button id="install" style="float: right">Install</button>'
  )

  const button = document.querySelector('#install')
  button.addEventListener('click', e => {
    installAsset(src)
  })
  // onclick: installAsset(src)
}

function installAsset (src) {
  return browser.runtime.sendMessage({
    type: 'install',
    content: src
  }).then(console.log)
}
