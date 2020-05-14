const fs = require('fs-extra')

/**
 * Convert legacy mathjax to lrn-math web component
 * @param {string} html
 * @param {string} destination
 * @return 
 */
module.exports = function ({ html, patterns }) {
  let convertedHTML = html

  // foreach pattern replace it!
  patterns.forEach(({pattern, replacement}) => {
    convertedHTML = convertedHTML.replace(RegExp(pattern, 'g'), replacement)
  });

  return convertedHTML
}