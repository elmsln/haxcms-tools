require('dotenv').config()

module.exports = {
  JWT_SECRET: (process.env.JWT_SECRET) ? process.env.JWT_SECRET : 'haxcms_secret'
}