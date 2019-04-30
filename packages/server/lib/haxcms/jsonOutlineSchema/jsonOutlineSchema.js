module.exports = function buildJsonOutlineSchema ({ uuid }) {
  return function makeJsonOutlineSchema ({
    file = '',
    id = uuid(),
    title = 'New site',
    author = '',
    description = '',
    license = 'by-sa',
    metadata = {},
    items = [],
  }) {
    return Object.freeze({
      getFile: () => file,
      getId: () => id,
      getTitle: () => title,
      getAuthor: () => author,
      getDescription: () => description,
      getLicense: () => license,
      getMetadata: () => metadata,
      getItems: () => items
    })
  }
}