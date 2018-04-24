import match from 'url-match-patterns'
import userjsInstallButton, { options as installButtonOptions } from './libs/userjs-install-button.js'

if (installButtonOptions.matches.find(p => match(p, window.location.href))) {
  userjsInstallButton()
}
