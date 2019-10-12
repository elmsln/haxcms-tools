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
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_config/.htaccess'),
      this.destinationPath('_config/.htaccess'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_config/config.json'),
      this.destinationPath('_config/config.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_config/config.php'),
      this.destinationPath('_config/config.php'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_config/my-custom-elements.js'),
      this.destinationPath('_config/my-custom-elements.js'),
      this.props
    );

    // modify the rollup configs
    this.changeRollupConfig('custom/rollup.config.js')
    this.changeRollupConfig('custom/rollup.amd.config.js')
  }

  async changeRollupConfig(path) {
    if (path) {
      const rollupConfig = await this.fs.read(path, 'UTF8')
      this.fs.write(path, rollupConfig.replace(`path.resolve('../../../package.json`, `path.resolve('/haxcms/package.json`))
    }
  }
};