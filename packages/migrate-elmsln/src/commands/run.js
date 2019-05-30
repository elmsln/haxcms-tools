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

    // if we are downloading assets then we need a url
    if (flags.skipDownload === true) {
      if (typeof flags.url === 'undefined') {
        throw new Error('url must be provided')
      }
    }

    // import the outline from the site.json
    let outline = fs.readJSONSync(jos)
    // loop over and create files
    if (outline.items && outline.items.length > 0) {
      // run our magic batch process
      outline.items = await batchConvertOutline({
        items: outline.items,
        destination: path.dirname(jos),
        url: flags.url,
        download: !flags.skipDownload,
        self: this,
        targets: {
          tokens: flags.tokens,
          images: flags.images
        }
      })
    }
  }
}

const batchConvertOutline = (options) => {
  return new Promise((resolve, reject) => {
    const { items } = options
    progressBar.start(items.length, 0)
    items.forEach(i => {
      batch.push(async (done) => {
        convertOutlineItem({ ...options, item: i }, done)
      })
    })

    batch.on('progress', e => {
      progressBar.update(e.complete);
    })
    batch.end((err, items) => {
      progressBar.stop()
      if (err) reject(err)
      resolve(items)
      process.exit(0)
    })
  })
}

/**
 * Converts an gitbook outline item into haxcms
 */
const convertOutlineItem = async ({ item, destination, url, download, self, targets }, done) => {
  if (fs.pathExistsSync(item.location)) {
    // get file contents
    const fileContents = fs.readFileSync(item.location, 'utf8')
    // convert the item one at a time
    const newHTML = await convert({ html: fileContents, destination, url, download, targets })
    // save the file
    fs.writeFileSync(item.location, newHTML, 'utf8')
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
  url: flags.string({ char: 'u', description: 'url of the ELMS site that contains the assets.', required: false }),
  skipDownload: flags.boolean({ char: 's', description: 'skip downloading assets using puppeteer.', required: false, default: false}),
  images: flags.boolean({ char: 'i', description: 'convert images defined in img tags to local assets.', required: false, default: false}),
  tokens: flags.boolean({ char: 't', description: 'convert tokens defined in img tags to local assets.', required: false, default: false}),
}

module.exports = RunCommand