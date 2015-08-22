export { env, log }

const env = 'dev'

function log (...args) {
  console.log.apply(console, args)
  return (...more) => log(args.concat(more))
}
