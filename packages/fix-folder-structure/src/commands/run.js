const { Command, flags } = require('@oclif/command')
const { join, parse, dirname } = require('path')
const fixFolderStructure = require('../../lib/fix-folder-structure.js')

class RunCommand extends Command {
  async run() {
    const { flags, args } = this.parse(RunCommand)
    const siteLocation = join(process.cwd(), args.path)
    fixFolderStructure(siteLocation)
  }
}

RunCommand.description = `Correctly fix folder structure of a HAXcms site.`

RunCommand.args = [
  {
    name: 'path',               // name of arg to show in help and reference with args[name]
    required: true,            // make the arg required with `required: true`
    description: 'path to the site.json file.', // help description
  }
]

RunCommand.flags = {
}

module.exports = RunCommand