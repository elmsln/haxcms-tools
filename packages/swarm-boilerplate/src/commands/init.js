const {Command, flags} = require('@oclif/command')
var yeoman = require('yeoman-environment')
var env = yeoman.createEnv()
env.register(require.resolve('../../generators/init'), 'init')

class InitCommand extends Command {
  async run() {
    const {flags} = this.parse(InitCommand)
    env.run('init', flags)
  }
}

InitCommand.description = `Describe the command here`

InitCommand.flags = {
  name: flags.string({char: 'n', description: 'machine name of the HAXcms site.', required: true}),
}

module.exports = InitCommand
