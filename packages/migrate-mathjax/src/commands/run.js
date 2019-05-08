const { Command, flags } = require('@oclif/command')
const path = require('path')
const fs = require('fs-extra')
const Batch = require('batch')
const batch = new Batch
batch.concurrency(1)
const _cliProgress = require('cli-progress');
const progressBar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
const convert = require('../../lib/convert')
// const convert = require('../../lib/convert')

class RunCommand extends Command {

  async run() {
    const { flags } = this.parse(RunCommand)
    const jos = path.join(process.cwd(), flags.jos)
    
    // check to make sure we have a jos
    if (!fs.existsSync(jos)) {
      throw new Error('site.json not found.')
    }
    if (path.basename(jos) !== 'site.json') {
      throw new Error('file was not of type site.json')
    }

    // import the outline from the site.json
    const outline = fs.readJSONSync(jos)
    // loop over and create files
    if (outline.items && outline.items.length > 0) {
      // run our magic batch process
      outline.items = await batchConvertOutline({
        items: outline.items,
        self: this
      })
    }
  }
}

const batchConvertOutline = ({ items, self }) => {
  return new Promise((resolve, reject) => {
    progressBar.start(items.length, 0)
    items.forEach(i => {
      batch.push((done) => {
        convertOutlineItem({ item: i, self }, done)
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
const convertOutlineItem = ({ item, self }, done) => {
  if (fs.pathExistsSync(item.location)) {
    // get file contents
    const fileContents = fs.readFileSync(item.location, 'utf8')
    // convert the item one at a time
    convert({
      destination: item.location,
      html: fileContents
    })
    done(null)
  }
}

RunCommand.description = `Convert ELMSLN content to HAXcms.`

RunCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
  jos: flags.string({ char: 'j', description: 'location of site.json file.', required: true }),
}

module.exports = RunCommand