export { env, log }

const env = 'dev'

function log () {
  console.log.apply(console, [].slice.call(arguments))
}
