const fs = require("fs");
const express = require('express');
const app = express();
 
app.use(express.json({limit: "250mb"}));
app.use(require("express-all-allow")())
 
if (!fs.existsSync("sleuthfs/")) {
  fs.mkdirSync("sleuthfs");
}
 
app.post('/sleuthfs/send', (req, res) => {
  var file = decodeURIComponent(escape(atob(req.body.file)));
  fs.writeFileSync("sleuthfs/" + file.split("|")[0], Buffer.from(Uint8Array.from(eval("[" + file.split("|")[1] + "]")).buffer));
  res.send({success: true});
});
 
app.listen(3000, () => {
  console.log('server started');
});
