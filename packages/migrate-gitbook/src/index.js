const { Command, flags } = require('@oclif/command')
const { join, parse } = require('path')
const parseGitbookOutline = require('@haxcms/gitbook-2-outline-schema')
const markdown = require("markdown").markdown;
const { existsSync } = require('fs')
const memFs = require("mem-fs");
const editor = require("mem-fs-editor");
const store = memFs.create();
const fs = editor.create(store);

class HaxcmsMigrateGitbookCommand extends Command {

  async run() {
    const { flags, args } = this.parse(HaxcmsMigrateGitbookCommand)
    const { summaryFile } = args
    // get the count
    let outline = parseGitbookOutline(join(process.cwd(), summaryFile))
    const generator = new Generator()
    // // get the number of items
    // const count = outline.items.length
    // // loop over and create files
    // if (outline.items && outline.items.length > 0) {
    //   outline.items = outline.items.map(i => {
    //     const path = join(process.cwd(), i.location)
    //     if (existsSync(path)) {
    //       // get file contents
    //       const fileContents = fs.read(path, 'utf8')
    //       // convert from markdown to html
    //       const html = markdown.toHTML(fileContents)
    //       // define what the new location path should be and switch the extention to .html
    //       const newLocation = join('pages', parse(i.location).dir, parse(i.location).name + '.html', )
    //       // now define the final destination where the file will go on the machine
    //       const destination = join(process.cwd(), flags.destination, newLocation)
    //       // create the file
    //       fs.write(destination, html)
    //       // update the outline
    //       return Object.assign({}, i, { location: newLocation })
    //     }
    //   })
    //   // save the new site.json
    //   fs.write(join(process.cwd(), flags.destination, 'site.json'), JSON.stringify(outline, null, 4))
    // }
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
