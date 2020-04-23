const cp = require('child_process');

// Run an eleventy build

module.exports = () => {
  cp.spawn('eleventy', {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: {
      ...process.env,
      HAXCMS_ENABLED: false
    }
  })
};
