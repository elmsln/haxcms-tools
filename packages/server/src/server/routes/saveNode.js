const { URL } = require('url');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

  function saveNode(req, res) {
    try {
      const siteJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), '_site', 'site.json'), 'utf8'));
      const { referer } = req.headers
      const refererUrl = new URL(referer).pathname;
      // get the item from siteJSON
      const activeItem = siteJSON.items.find(i => i.id === refererUrl);
      const currentFile = matter.read(path.join(process.cwd(), activeItem.location));
      const newFile = { ...currentFile, ...{ content: req.body.node.body }}
      // write back to the file
      fs.writeFileSync(path.join(process.cwd(), activeItem.location), matter.stringify(newFile));
      // save file
      res.sendStatus(200);
    } catch (error) {
      res.status(304);
      res.send(error);
    }
  }
  function countWords(str) {
    return str.trim().split(/\s+/).length;
  }
  module.exports = saveNode;