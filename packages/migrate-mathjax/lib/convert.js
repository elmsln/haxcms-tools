const fs = require('fs-extra')

/**
 * Convert legacy mathjax to lrn-math web component
 * @param {string} html
 * @param {string} destination
 */
module.exports = function ({ html, destination }) {
  // convert the html
  const newHTML = convert(html)
  // write the new html back to the file
  fs.writeFileSync(destination, newHTML, 'utf8')
  return
}

/**
 * Convert replace legacy mathjax with new lrn-math tags
 * @param {string} html 
 */
const convert = (html) => {
  let convertedHTML = html
  // regex for the tokens
  const ptrn = RegExp(/(\$\$)([^\$\$]*)(\$\$)/g);
  let matches = []
  let match;
  while ((match = ptrn.exec(html)) != null) {
    matches.push(match)
  }
  // loop over matches and replace them with
  // the correct tags
  matches.map(i => {
    convertedHTML = convertedHTML.replace(i[0], `<lrn-math>${i[2]}</lrn-math>`)
  })

  return convertedHTML
}