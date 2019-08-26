const {Command, flags} = require('@oclif/command')
var yeoman = require('yeoman-environment')
var env = yeoman.createEnv()
env.register(require.resolve('../../generators/upgrade-browser'), 'upgrade-browser')

class UpgradeBrowserCommand extends Command {
  async run() {
    const {flags} = this.parse(UpgradeBrowserCommand)
    env.run('upgrade-browser', flags)
  }
}

UpgradeBrowserCommand.description = `Display an upgrade your browser message to those that do not support web components`

UpgradeBrowserCommand.flags = {
  name: flags.string({char: 'n', description: 'machine name of the HAXcms site.', required: true}),
}

module.exports = UpgradeBrowserCommand
