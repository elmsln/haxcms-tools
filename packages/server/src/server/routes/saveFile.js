const path = require('path');

function saveFile(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Use the mv() method to place the file somewhere on your server
  req.files['file-upload'].mv(path.join(process.cwd(), 'assets', req.files['file-upload'].name), function(err) {
    if (err)
      return res.status(500).send(err);
    res.send('File uploaded!');
  });
}
module.exports = saveFile;