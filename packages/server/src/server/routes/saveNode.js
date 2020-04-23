const { URL } = require('url');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

  function saveNode(ctx, next) {
    try {
      const siteJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), '_site', 'site.json'), 'utf8'));
      const { referer } = ctx.headers
      const refererUrl = new URL(referer).pathname;
      // get the item from siteJSON
      const activeItem = siteJSON.items.find(i => i.location === refererUrl);
      const currentFile = matter.read(path.join(process.cwd(), activeItem.id));
      const newFile = { ...currentFile, ...{ content: ctx.request.body.node.body }}
      // write back to the file
      fs.writeFileSync(path.join(process.cwd(), activeItem.id), matter.stringify(newFile));
      // save file
      ctx.status = 200;
    } catch (error) {
      ctx.status = 304;
      ctx.body = error;
      console.log(error)
    }
  }
  function countWords(str) {
    return str.trim().split(/\s+/).length;
  }
  module.exports = saveNode;