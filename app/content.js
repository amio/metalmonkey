import match from 'url-match-patterns'
import * as userjsInstall from './libs/userjs-install-button.js'

// Userscript Install Button for npmjs.com/package/*
if (userjsInstall.options.matches.find(p => match(p, window.location.href))) {
  userjsInstall.default()
}
