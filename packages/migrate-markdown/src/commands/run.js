const { Command, flags } = require("@oclif/command");
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt({ html: true });
const path = require("path");
const fs = require("fs");
const recursive = require("recursive-readdir");
const replaceExt = require("replace-ext");

class RunCommand extends Command {
  async run() {
    const { flags } = this.parse(RunCommand);
    const { search, output, dir, ignore = "" } = flags;
    const _dir = path.join(process.cwd(), dir);
    const _search = search
      .split(",")
      .map((i) => i.trim())
      .map((i) => `.${i}`);
    const _ignore = ignore.split(",").map((i) => i.trim());

    recursive(_dir, _ignore, (err, files) => {
      // loop over asyncronously
      files.forEach((file) => {
        // if the file is one of the file extensions we are searching for.
        console.log(_search.includes(path.extname(file)))
        if (_search.includes(path.extname(file))) {
          // open file
          const fileContents = fs.readFileSync(file, "utf8");
          // convert it
          const convertedFile = md.render(fileContents);
          // new file dir
          // make sure we account for the new file extension.
          let newFilePath = file;
          // if we are switching extension then switch it
          if (output) {
            newFilePath = replaceExt(file, `.${output}`);
          }
          // save it
          fs.writeFileSync(newFilePath, convertedFile, "utf8");
        }
      });
    });
  }
}

RunCommand.description = `Search for files that contain markdown and convert them to html.`;

RunCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: "v" }),
  // add --help flag to show CLI version
  help: flags.help({ char: "h" }),
  // input
  search: flags.string({
    description: `specify the file extensions to search for. Comma separated values.`,
    default: ".md",
  }),
  output: flags.string({
    description: `specify the file extension to convert to. Defaults to current extension.`,
  }),
  dir: flags.string({
    description: `specify the root directory to search through`,
    default: ".",
  }),
  ignore: flags.string({
    description: `specify ignore patterns based no the recuresive-readdir. Comma separated values. https://www.npmjs.com/package/recursive-readdir`,
  }),
};

module.exports = RunCommand;
