import { log } from './lib/dev-helper'

chrome.runtime.sendMessage({title: 'runmyscripts'})
chrome.runtime.sendMessage({title: 'whoami'}, function (res) {
  log('tabid:', res)
})
log(11)
