const {Command, flags} = require('@oclif/command')
var yeoman = require('yeoman-environment')
var env = yeoman.createEnv()
env.register(require.resolve('../../generators/swarm'), 'swarm')

class SwarmCommand extends Command {
  async run() {
    const {flags} = this.parse(SwarmCommand)
    env.run('swarm', flags)
  }
}

SwarmCommand.description = `Describe the command here`

SwarmCommand.flags = {
  name: flags.string({char: 'n', description: 'machine name of the HAXcms site.', required: true}),
  port: flags.string({char: 'n', description: 'port of the traefik container', default: 80, required: true})
}

module.exports = SwarmCommand
