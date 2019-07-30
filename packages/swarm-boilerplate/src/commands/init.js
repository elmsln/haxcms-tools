const {Command, flags} = require('@oclif/command')
var yeoman = require('yeoman-environment')
var env = yeoman.createEnv()
env.register(require.resolve('../../generators/app'), 'app')

class InitCommand extends Command {
  async run() {
    const {flags} = this.parse(InitCommand)
    env.run('app', flags)
  }
}

InitCommand.description = `Describe the command here`

InitCommand.flags = {
  name: flags.string({char: 'n', description: 'machine name of the HAXcms site.', required: true}),
}

module.exports = InitCommand
