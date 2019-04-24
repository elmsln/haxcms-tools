const cp = require('child_process')
const path = require('path')
const polymerPkg = require('polymer-cli/package.json')
const polymerBinPath = require.resolve(path.join('polymer-cli', polymerPkg.bin.polymer))

module.exports = (options = {}) => {
  let params = [
    'serve',
    '--npm',
    '--module-resolution=node',
    `--entrypoint=${options.entrypoint ? options.entrypoint : 'dist/dev.html'}`,
  ]
  if (options.open) {
    params.push('--open')
    params.push('--open-path=/')
  }
  if (options.port) [
    params.push(`--port=${options.port}`)
  ]
  cp.spawn(path.join(__dirname, '../../node_modules/.bin/polymer'), params, {
    stdio: 'inherit'
  })
}