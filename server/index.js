function dataurl_to_file(dataurl) {
var regex = /^data:.+\/(.+);base64,(.*)$/;
var matches = dataurl.match(regex);
var data = matches[2];
return Buffer.from(data, 'base64');
}

const fs = require("fs");
const express = require('express');
const app = express();
 
app.use(express.json({limit: "250mb"}));
app.use(require("express-all-allow")())
 
if (!fs.existsSync("sleuthfs/")) {
  fs.mkdirSync("sleuthfs");
}
 
app.post('/sleuthfs/send', (req, res) => {
	var file = req.body.file;
	if (!fs.existsSync("sleuthfs/")) {
  fs.mkdirSync("sleuthfs");
  }

var data = dataurl_to_file(file.split("|")[1])

  fs.writeFileSync("sleuthfs/" + file.split("|")[0], data);
  res.send({success: true});
});
 
app.listen(3000, () => {
  console.log('server started');
});
