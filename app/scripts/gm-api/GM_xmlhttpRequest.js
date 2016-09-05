/* global XMLHttpRequest */

export default function (detail) {
  // greasify: transform XMLHttpRequest object to GreaseMonkey Response Object.
  // http://wiki.greasespot.net/GM_xmlhttpRequest#Response_Object
  const greasify = function (fn) {
    if (typeof fn !== 'function') return function () {}

    return function () {
      const resp = this
      resp.context = detail.context
      // TODO: The final URL requested, if Location redirects were followed.
      resp.finalUrl = detail.url
      // resp.lengthComputable = ?
      // resp.loaded = ?
      // resp.total = ?
      fn(resp)
    }
  }

  const req = new XMLHttpRequest()
  req.open(detail.method, detail.url, !detail.synchronous, detail.user, detail.password)
  req.addEventListener('readystatechange', greasify(detail.onreadystatechange))
  req.addEventListener('progress', greasify(detail.onprogress))
  req.addEventListener('load', greasify(detail.onload))
  req.addEventListener('error', greasify(detail.onerror))
  req.addEventListener('abort', greasify(detail.onabort))
  req.addEventListener('timeout', greasify(detail.ontimeout))
  req.overrideMimeType(detail.overrideMimeType || 'text/html; charset=ISO-8859-1')

  // headers
  if (detail.headers) {
    Object.keys(detail.headers).forEach(key => {
      req.setRequestHeader(key, detail.headers[key])
    })
  }

  return req.send(detail.data)
}
