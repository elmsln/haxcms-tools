const { Command, flags } = require('@oclif/command')
const { join, parse } = require('path')
const { pathExistsSync, readFileSync, outputFileSync } = require('fs-extra')
const parseGitbookOutline = require('@haxcms/gitbook-2-outline-schema')
const md = require('markdown-it')();
const Batch = require('batch')
const batch = new Batch
batch.concurrency(1)
const _cliProgress = require('cli-progress');
const progressBar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);

class RunCommand extends Command {

  async run() {
    const { flags, args } = this.parse(RunCommand)
    const { summaryFile } = args
    const summaryLocation = join(process.cwd(), summaryFile)
    const gitbookLocation = parse(summaryLocation).dir
    // get the count
    let outline = parseGitbookOutline(summaryLocation)
    // get the number of items
    const count = outline.items.length

    // loop over and create files
    if (outline.items && outline.items.length > 0) {
      // run our magic batch process
      outline.items = await batchConvertOutline({
        items: outline.items,
        destination: flags.destination,
        gitbookLocation,
        self: this
      })
      // save it to site.json
      const siteJsonLocation = join(process.cwd(), flags.destination, 'site.json')
      // see if we should merge it
      if (pathExistsSync(siteJsonLocation)) {
        // get the current one
        const currentOutline = readFileSync(siteJsonLocation, 'utf8')
        // merge it with the new one
        outline = Object.assign({}, JSON.parse(currentOutline), outline)
      }
      // update site.json
      outputFileSync(siteJsonLocation, JSON.stringify(outline, null, 4))
    }
  }
}

const batchConvertOutline = ({ items, gitbookLocation, destination, self }) => {
  return new Promise((resolve, reject) => {
    progressBar.start(items.length, 0)
    items.forEach(i => {
      batch.push(async (done) => {
        convertOutlineItem({ item: i, destination, gitbookLocation, self }, done)
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
const convertOutlineItem = async ({ item, gitbookLocation, destination, self }, done) => {
  const path = join(gitbookLocation, item.location)
  if (pathExistsSync(path)) {
    // get file contents
    const fileContents = readFileSync(path, 'utf8')

    // convert from markdown to html
    let html = md.render(fileContents)

    // define what the new location path should be and switch the extention to .html
    const newLocation = join('pages', parse(item.location).dir, parse(item.location).name, 'index.html')
    // now define the final destination where the file will go on the machine
    const absoluteDestination = join(process.cwd(), destination, newLocation)
    // create the file
    outputFileSync(absoluteDestination, html)
    // update the outline
    const newItem = Object.assign({}, item, { location: newLocation })
    /**
     * Hook run-convert-item-post
     */
    await self.config.runHook('run-convert-item-post', { html, item: newItem, absoluteDestination })
    done(null, newItem)
  }
}

RunCommand.description = `Describe the command here`

RunCommand.args = [
  {
    name: 'summaryFile',               // name of arg to show in help and reference with args[name]
    required: true,            // make the arg required with `required: true`
    description: 'summary.md gitbook file', // help description
  }
]

RunCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
  destination: flags.string({ char: 'd', description: 'destination directory.', default: './' }),
}

module.exports = RunCommand
