export { env, log, promisifyChromeExtensionApi }

const env = 'dev'

function log (...args) {
  console.log.apply(console, args)
  return (...more) => log(args.concat(more))
}

function promisifyChromeExtensionApi (fn, me) {
  const self = me || null
  return function (...args) {
    return new Promise(function (res, rej) {
      const cb = function (...results) {
        if (chrome.runtime.lastError) {
          rej(chrome.runtime.lastError)
        } else {
          res(results)
        }
      }
      fn.apply(self, args.concat(cb))
    })
  }
}
