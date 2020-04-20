const fs = require('fs-extra')
const nodePandoc = require('node-pandoc');

/**
 * Convert legacy mathjax to lrn-math web component
 * @param {string} html
 * @param {string} destination
 * @return 
 */
module.exports = async function ({ src, destination }) {
  return await new Promise((res, rej) => {
    const args = '-f html -t markdown';
    nodePandoc(html, args, (err, content) => {
      if (err) rej(err)
      res(content)
    })
  })
}