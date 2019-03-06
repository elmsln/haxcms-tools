const { Command, flags } = require('@oclif/command')
const { join, parse } = require('path')
const { pathExistsSync, readFileSync, outputFileSync } = require('fs-extra')
const parseGitbookOutline = require('@haxcms/gitbook-2-outline-schema')
const markdown = require("markdown").markdown;

class HaxcmsMigrateGitbookCommand extends Command {

  async run() {
    const { flags, args } = this.parse(HaxcmsMigrateGitbookCommand)
    const { summaryFile } = args
    const summaryLocation = join(process.cwd(), summaryFile)
    const gitbookLocation = parse(summaryLocation).dir
    // get the count
    let outline = parseGitbookOutline(summaryLocation)
    // get the number of items
    const count = outline.items.length
    // loop over and create files
    if (outline.items && outline.items.length > 0) {
      outline.items = outline.items.map(i => {
        const path = join(gitbookLocation, i.location)
        if (pathExistsSync(path)) {
          // get file contents
          const fileContents = readFileSync(path, 'utf8')
          // convert from markdown to html
          let html = markdown.toHTML(fileContents)

          // allow middleware to alter page
          html = this.convertPage(html)

          // define what the new location path should be and switch the extention to .html
          const newLocation = join('pages', parse(i.location).dir, parse(i.location).name + '.html', )
          // now define the final destination where the file will go on the machine
          const destination = join(process.cwd(), flags.destination, newLocation)
          // create the file
          outputFileSync(destination, html)
          // update the outline
          return Object.assign({}, i, { location: newLocation })
        }
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

  convertPage(html) {
    // see if there is a middleware
    return html
  }
}

HaxcmsMigrateGitbookCommand.description = `Describe the command here`

HaxcmsMigrateGitbookCommand.args = [
  {
    name: 'summaryFile',               // name of arg to show in help and reference with args[name]
    required: true,            // make the arg required with `required: true`
    description: 'summary.md gitbook file', // help description
  }
]

HaxcmsMigrateGitbookCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
  destination: flags.string({ char: 'd', description: 'destination directory.', default: './' }),
}

module.exports = HaxcmsMigrateGitbookCommand
