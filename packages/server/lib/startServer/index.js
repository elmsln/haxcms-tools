const cp = require('child_process')
const path = require('path')

module.exports = (options = {}) => {
  cp.spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    cwd: path.join(__dirname, '../../')
  })
}