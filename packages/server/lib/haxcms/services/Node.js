const uuid = require('uuid/v1');
const josService = require('./JsonOutlineSchema')

const NodeService = Object.freeze({
  load: ({ id }) => {
    const item = josService.getItem({ id })
    console.log(item)
  }
})

module.exports = NodeService;

/**
 * Node factory
 */
// module.exports = function buildMakeNode ({ uuid }) {
//   return function makeNode ({
//     id = uuid(),
//     file = null,
//     title = 'New node',
//     author = '',
//     description = '',
//     metadata = {},
//     items = []
//   }) {
//     return Object.freeze({
//       getID: () => id,
//       getFile: () => file,
//       getAuthor: () => author,
//       getTitle: () => title,
//       getDescription: () => description,
//       getMetadata: () => metadata,
//       getItems: () => items,
//       save: () => {}
//     })
//   }
// }