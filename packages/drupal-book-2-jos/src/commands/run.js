const {Command, flags} = require('@oclif/command')
const fs = require('fs-extra')
const path = require('path')
const { convert } = require('../../lib/convert')
const pkg = require('../../package.json')

class RunCommand extends Command {
  async run() {
    const {flags} = this.parse(RunCommand)
    const src = path.join(process.cwd(), path.relative(process.cwd(), flags.src))

    // check to make sure we have a src
    if (!fs.existsSync(src)) {
      throw new Error('Drupal book xml file not found.')
    }
    if (path.extname(src) !== '.xml') {
      throw new Error('file was not of type xml.')
    }

    // load the drupal book xml
    const bookXML = fs.readFileSync(src, 'utf8')
    // convert to jos
    const jos = await convert(bookXML, path.join(path.relative(process.cwd(), flags.dest)))
  }
}

RunCommand.description = `${pkg.description}`

RunCommand.flags = {
  src: flags.string({char: 's', description: 'Source of the drupal book xml file.', required: true }),
  dest: flags.string({char: 'd', description: 'Destination of the JOS location.', default: './'})
}

module.exports = RunCommand