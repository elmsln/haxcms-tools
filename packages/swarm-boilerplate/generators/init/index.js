const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.answers = opts
  }

  writing() {
    this.props = this.answers
   
    this.fs.copyTpl(
      this.templatePath('.gitlab-ci.yml'),
      this.destinationPath('.gitlab-ci.yml'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('custom/Dockerfile'),
      this.destinationPath('custom/Dockerfile'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('docker-compose-dev.yml'),
      this.destinationPath('docker-compose-dev.yml'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('docker-compose.yml'),
      this.destinationPath('docker-compose.yml'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('migrate.json'),
      this.destinationPath('migrate.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('services/haxcms/apache2.conf'),
      this.destinationPath('services/haxcms/apache2.conf'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('dev.Dockerfile'),
      this.destinationPath('dev.Dockerfile'),
      this.props
    );

  }

};