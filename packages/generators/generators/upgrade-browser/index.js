const Generator = require("yeoman-generator");
const fs = require('fs-extra')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.answers = opts
  }

  writing() {
    this.props = this.answers

    this.fs.copyTpl(
      this.templatePath('upgrade-browser.html'),
      this.destinationPath('upgrade-browser.html'),
      this.props
    );

  }

  end() {
    this.log(`
Place the following html in your index.html. Preferably just after the legacy browser check. If you are unsure about this, paste it just above your closing </body> tag.

// @haxcms-generator/upgrade-browser
if (old) {
  window.location.href = "upgrade-browser.html";
}`)
  }
};