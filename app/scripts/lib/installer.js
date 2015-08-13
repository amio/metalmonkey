import { parseHTML } from './dom-helper'

export function installer () {
  const installerFilter = {
    urls: ['*://*/*.js']
  }
  function installerAgent (details) {
    // Only deal with userscripts request from webpage
    const isUserJS = /\.user\.js$/.test(details.url)
    const isFromExtension = details.tabId === -1
    if (!isUserJS || isFromExtension) return

    setTimeout(function(){
    fetch(details.url)
      .then(function(response){
        return response.text()
      })
      .then(function(text){
        let newItem = {}
        newItem[details.url] = text
        chrome.storage.local.set(newItem)

        mmRegistry.add(details.url, text)
      })

    },2000)

    console.log(isUserJS, isFromExtension, details)

    return {
      cancel: true
    }
  }

  chrome.webRequest.onBeforeRequest.addListener(installerAgent, installerFilter)

}

let mmRegistry = {
  set: log,
  add: log,
  match: log,
}

function log(x){
  console.log(x)
}
