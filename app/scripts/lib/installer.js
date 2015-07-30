import { parseHTML } from './dom-helper'

export function installer(){

  document.body.classList.add('mm-jsfile')

  // Prepend header DOM
  const header = parseHTML('<h1 class="installer-header">Install Script</h1>')
  document.body.insertBefore(header, document.body.firstChild)
}
