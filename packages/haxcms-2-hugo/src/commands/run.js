const { Command, flags } = require('@oclif/command')
const path = require('path')
const fs = require('fs-extra')
const Batch = require('batch')
const batch = new Batch
batch.concurrency(1)
const _cliProgress = require('cli-progress');
const progressBar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
const convert = require('../../lib/convert')

class RunCommand extends Command {
  async run() {
    const { flags } = this.parse(RunCommand)
    const jos = path.join(process.cwd(), flags.jos)
    const destination = path.join(process.cwd(), flags.destination)
    
    // check to make sure we have a jos
    if (!fs.existsSync(jos)) {
      throw new Error('site.json not found.')
    }
    if (path.basename(jos) !== 'site.json') {
      throw new Error('file was not of type site.json')
    }
    // check to make sure we have a destination
    if (!fs.existsSync(destination)) {
      throw new Error('destination not found.')
    }

    // import the outline from the site.json
    const outline = fs.readJSONSync(jos)
    // loop over and create files
    if (outline.items && outline.items.length > 0) {
      // run our magic batch process
      outline.items = await batchConvertOutline({
        jos,
        destination,
        items: outline.items,
        self: this
      })
    }
  }
}

const batchConvertOutline = ({ items, destination, jos, self }) => {
  return new Promise((resolve, reject) => {
    progressBar.start(items.length, 0)
    items.forEach(item => {
      batch.push((done) => {
        convertOutlineItem({ item, destination, jos, self }, done)
      })
    })

    batch.on('progress', e => {
      progressBar.update(e.complete);
    })
    batch.end((err, items) => {
      progressBar.stop()
      if (err) reject(err)
      resolve(items)
    })
  })
}

/**
 * Converts an gitbook outline item into haxcms
 */
const convertOutlineItem = ({ item, destination, jos, self }, done) => {
  if (fs.pathExistsSync(item.location)) {
    // get file contents
    const html = fs.readFileSync(item.location, 'utf8')
    // convert the item one at a time
    const convertedContent = convert({ src: item.location })
    // write it to the destination
    const outputFileLocation = path.join(destination, path.dirname(item.location), '_index.md')
    fs.ensureFileSync(outputFileLocation)
    fs.writeFileSync(outputFileLocation, convertedContent, 'utf8')
    done(null)
  }
}



RunCommand.description = `Search and replace regex patterns in a HAXcms site.`

RunCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  jos: flags.string({ char: 'j', description: 'location of site.json file.', required: true }),
  destination: flags.string({ char: 'd', description: 'destination of the output.', required: true }),
}

module.exports = RunCommand
