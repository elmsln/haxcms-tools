const cp = require('child_process');
const path = require("path");

module.exports = () => {
  cp.spawn('eleventy', ['--watch'], {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: {
      ...process.env,
      HAXCMS_ENABLED: true
    }
  })
};
