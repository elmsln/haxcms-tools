const uuid = require('uuid/v1');
const buildMakeNode = require('../services/Node')

// export the new node from our factory
const makeNode = buildMakeNode({ uuid })
module.exports = makeNode