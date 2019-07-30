const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.answers = opts
  }

  writing() {
    this.props = this.answers
   
    // transition into that directory
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationRoot(),
      this.props,
      { globOptions: { dot: true } }
    );

  }

};