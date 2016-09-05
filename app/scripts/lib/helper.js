export { env, info, log, promisifyChromeExtensionApi }

const env = 'dev'

function log (...args) {
  console.log.apply(console, args)
  return (...more) => log(args.concat(more))
}

function info (...args) {
  env === 'dev' && console.info.apply(console, args)
  return (...more) => info(args.concat(more))
}

function promisifyChromeExtensionApi (fn, me) {
  const self = me || null
  return function (...args) {
    return new Promise(function (resolve, reject) {
      const cb = function (...results) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          resolve(results)
        }
      }
      fn.apply(self, args.concat(cb))
    })
  }
}
