const cp = require('child_process')
const path = require('path')

module.exports = (options = {}) => {
  let params = [
    '--watch',
    '--serve'
  ]
  if (options.open) {
    params.push('--open')
    params.push('--open-path=/')
  }
  if (options.port) [
    params.push(`--port=${options.port}`)
  ]
  cp.spawn(path.join(__dirname, '../../node_modules/.bin/eleventy'), params, {
    stdio: 'inherit',
    cwd: process.cwd()
  })
}