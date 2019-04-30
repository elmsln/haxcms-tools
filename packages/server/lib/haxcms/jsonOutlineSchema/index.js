const uuid = require('uuid/v1');
const buildJsonOutlineSchema = require('./jsonOutlineSchema')

// create a new JSON instance
const makeJsonOutlineSchema = buildJsonOutlineSchema({ uuid })
module.exports = makeJsonOutlineSchema