const cp = require('child_process')
const path = require('path')
const nodemonPath = require.resolve('nodemon')
const serverPath = path.join(__dirname, '../../src/server/index.js')

console.log(serverPath)

module.exports = (options = {}) => {
  cp.spawn(nodemonPath, [`${serverPath}`], {
    stdio: 'inherit'
  })
}