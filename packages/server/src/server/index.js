// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const fileUpload = require('express-fileupload');
// const path = require('path');
// const app = express();
// const port = 3000

// module.exports = () => {
//   app.use(bodyParser.json());
//   app.use(bodyParser.text());
//   app.use(cors());
//   app.use(fileUpload());
//   app.post('/system/api/saveFile', require('./routes/saveFile.js'));
//   app.post('/system/api/saveNode', require('./routes/saveNode.js'));
//   app.use("/", express.static(path.join(process.cwd(), "_site")));

//   app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
// }

const eleventyServer = require("./eleventy.js")
const esDevServer = require("./es-dev-server.js")

module.exports = () => {
  eleventyServer();
  esDevServer();
}