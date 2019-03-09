const glob = require('glob')
const { join, dirname, basename, relative } = require('path')
const { readFileSync, ensureDirSync, writeFileSync, removeSync, readJSONSync } = require('fs-extra')
const Batch = require('batch')
const batch = new Batch
batch.concurrency(1)
const _cliProgress = require('cli-progress');
const progressBar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);

module.exports = (josPath) => {
  let jos = readJSONSync(josPath, 'utf8')
  return batchConvertJos({ items: jos.items, josPath })
}

const batchConvertJos = ({ items, josPath }) => {
  return new Promise((resolve, reject) => {
    progressBar.start(items.length, 0)
    items.forEach(i => {
      batch.push(async (done) => {
        convertJosItem({ item: i, josPath }, done)
      })
    })

    batch.on('progress', e => {
      progressBar.update(e.complete);
    })
    batch.end((err, items) => {
      const currentJos = readJSONSync(josPath, 'utf8')
      // add the newley updated items
      const newJos = Object.assign({}, currentJos, { items })
      // save back to the jos
      writeFileSync(josPath, JSON.stringify(newJos, null, 2), 'utf8')
      // update the outline
      progressBar.stop()
      if (err) reject(err)
      resolve(items)
    })
  })
}

/**
 * Converts an gitbook Jos item into haxcms
 */
const convertJosItem = async ({ item, josPath }, done) => {
  let newItem = Object.assign({}, item)
  const path = join(dirname(josPath), newItem.location)
  const content = readFileSync(path, 'utf8')
  // if the basename is not index.html then we need to fix that
  if (basename(path) !== 'index.html') {
    const newDirectory = join(dirname(path), basename(path, '.html'))
    const newLocationAbsolute = join(newDirectory, 'index.html')
    console.log('newLocationAbsolute:', newLocationAbsolute)
    const newLocationRelative = newLocationAbsolute.replace(dirname(josPath) + '/', '')
    console.log('newLocationRelative:', newLocationRelative)
    // make sure the directory exists
    ensureDirSync(newDirectory)
    // create the new page
    writeFileSync(newLocationAbsolute, content, 'utf8')
    // delete old file
    removeSync(path)
    // re-write the item to update the jos with the new location that is relative
    // to the josPath
    newItem = Object.assign({}, newItem, { location: newLocationRelative })
  }
  done(null, newItem)
}
