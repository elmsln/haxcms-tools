const {Command, flags} = require('@oclif/command')
const startServer = require('../../lib/startServer/index.js')
const polymerServe = require('../../lib/polymerServe/index.js')

class StartCommand extends Command {
  async run() {
    const {flags} = this.parse(StartCommand)
    startServer()
    polymerServe()
  }
}

StartCommand.description = `Start the server.`

StartCommand.flags = {
  server: flags.boolean({char: 's', description: 'start backend server'}),
  frontend: flags.boolean({char: 'f', description: 'start frontend server'})
}

module.exports = StartCommand