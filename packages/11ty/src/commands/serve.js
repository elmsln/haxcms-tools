const {Command, flags} = require('@oclif/command')
const server = require("../server/index.js")

class StartCommand extends Command {
  async run() {
    const { flags } = this.parse(StartCommand)
    server();
  }
}

StartCommand.description = `Start the server.`

StartCommand.flags = {
}

module.exports = StartCommand;