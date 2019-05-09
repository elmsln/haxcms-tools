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
    
    // check to make sure we have a jos
    if (!fs.existsSync(jos)) {
      throw new Error('site.json not found.')
    }
    if (path.basename(jos) !== 'site.json') {
      throw new Error('file was not of type site.json')
    }

    // load migrate file
    const migrateFile = (typeof flags.migrateFile === 'undefined') ? path.join(path.dirname(jos), 'migrate.json') : flags.migrateFile
    // make sure the migrate file is there
    if (!fs.existsSync(migrateFile)) {
      throw new Error(`migrate file not found at ${migrateFile}`)
    }
    const migrateSettings = fs.readJSONSync(migrateFile)

    // import the outline from the site.json
    const outline = fs.readJSONSync(jos)
    // loop over and create files
    if (outline.items && outline.items.length > 0) {
      // run our magic batch process
      outline.items = await batchConvertOutline({
        jos,
        items: outline.items,
        patterns: migrateSettings.regex,
        self: this
      })
    }
  }
}

const batchConvertOutline = ({ items, patterns, jos, self }) => {
  return new Promise((resolve, reject) => {
    progressBar.start(items.length, 0)
    items.forEach(item => {
      batch.push((done) => {
        convertOutlineItem({ item, patterns, jos, self }, done)
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
const convertOutlineItem = ({ item, patterns, jos, self }, done) => {
  if (fs.pathExistsSync(item.location)) {
    // get file contents
    const html = fs.readFileSync(item.location, 'utf8')
    // convert the item one at a time
    const convertedHTML = convert({
      html,
      patterns
    })
    // write it back to the file
    fs.writeFileSync(path.join(path.dirname(jos), item.location), convertedHTML, 'utf8')
    done(null)
  }
}



RunCommand.description = `Search and replace regex patterns in a HAXcms site.`

RunCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
  jos: flags.string({ char: 'j', description: 'location of site.json file.', required: true }),
  migrateFile: flags.string({ char: 'm', description: 'location of the .migrate file that contains patterns'})
}

module.exports = RunCommand
