import URLSearchParams from 'url-search-params'
import { registerUserscript } from './lib/registry'

const codeElement = document.querySelector('#code')
const params = new URLSearchParams(window.location.search.slice(1))
const script = params.get('script')
const decoder = new window.TextDecoder()

fetch(script)
  .then(res => consume(res))
  .then(uso => onScriptLoaded(uso))
  .catch(e => console.error('Something went wrong: ' + e))

function consume (response) {
  const reader = response.body.getReader()
  const length = response.headers.get('Content-Length') || 'unknown'

  let total = 0
  let scriptText = ''
  let meta
  return new Promise((resolve, reject) => {
    (function pump () {
      reader.read().then(({done, value}) => {
        if (done) {
          return resolve({
            url: script,
            meta: meta,
            bytes: total,
            content: scriptText
          })
        } else {
          const partial = decoder.decode(value || new Uint8Array(), {
            stream: !done
          })
          codeElement.insertAdjacentText('beforeend', partial)
          meta || (meta = parseMeta(scriptText += partial))
          console.log(`got ${total += value.byteLength}/${length} bytes ...`)
          return pump()
        }
      }).catch(reject)
    })()
  })
}

function parseMeta (metaText) {
  if (metaText.split('// ==/UserScript==').length > 1) {
    return {}
  }
}

function onScriptLoaded (userscriptObject) {
  console.info('Ready to install %s.', script)

  const installButton = document.querySelector('#installButton')
  installButton.addEventListener('click', () => {
    registerUserscript(userscriptObject.url, userscriptObject.content)
      .then(result => {
        console.info('Successfully installed %s!', userscriptObject.url)
        window.close()
      })
  })
  installButton.disabled = false
}
