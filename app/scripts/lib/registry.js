module.exports = {
  set: log,
  add: register,
  match: log,
}

/**
 * Add a script to metalmonkey registry.
 */
function register (url, content) {
  //
}

/**
 * Get registry item that match the url.
 */
function match (url) {}

function log (x) {
  console.log(x)
}
