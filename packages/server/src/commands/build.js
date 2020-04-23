const {Command, flags} = require('@oclif/command')
const build = require("../build/index.js")

class BuildCommand extends Command {
  async run() {
    const { flags } = this.parse(BuildCommand)
    // run eleventy build
    build();
  }
}

BuildCommand.description = `Create a build.`

BuildCommand.flags = { }

module.exports = BuildCommand;