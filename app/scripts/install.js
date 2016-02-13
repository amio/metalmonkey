import URLSearchParams from 'url-search-params'

const codeElement = document.querySelector('#code')
const params = new URLSearchParams(window.location.search.slice(1))
const script = params.get('script')
const decoder = new window.TextDecoder()

fetch(script)
  .then(res => consume(res.body.getReader()))
  .then(bytes => console.info('Ready to install %s!', script))
  .catch(e => console.error('Something went wrong: ' + e))

function consume (reader) {
  let total = 0
  let metaText = ''
  let meta
  return new Promise((resolve, reject) => {
    (function pump () {
      reader.read().then(({done, value}) => {
        if (done) {
          return resolve(total, meta)
        } else {
          const partial = decoder.decode(value || new Uint8Array(), {
            stream: !done
          })
          codeElement.insertAdjacentText('beforeend', partial)
          meta || (meta = parseMeta(metaText += partial))
          console.log(`got ${total += value.byteLength} bytes ...`)
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
