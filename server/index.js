var cli2json = require("cli2json");
var colors = require('@colors/colors');
var options = cli2json.parse(process.argv.slice(2).join(" "), {
    readCommandAfter: ["-p", "--port", "-l", "--limit"]
})
const fs = require("fs");
const express = require('express');
const app = express();

var arrayFindIncludes = function(r, n) {
    var u;
    var a = null;
    n.forEach(function(n) {
        if (n.includes(r)) {
            u = n;
            a = n
        } else {
            u = a
        }
    });
    return u
}

function dataurl_to_file(dataurl) {
    var regex = /^data:.+\/(.+);base64,(.*)$/;
    var matches = dataurl.match(regex);
    var data = matches[2];
    return Buffer.from(data, 'base64');
}

var limit = {
    limit: arrayFindIncludes("-l", options.flags) || arrayFindIncludes("--limit", options.flags) || "250mb"
};

if (limit.limit.startsWith("-l") || limit.limit.startsWith("--limit")) {
    limit = limit.limit.split(" ")[1];
}


app.use(express.json({
    limit: limit
}));


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
    console.log(file.split("|")[0].green + " is being added to your Sleuth directory.\nCheck C:\\Program Files\\sleuth\\sleuthfs to see the file.")
    res.send({
        success: true
    });
});

var port = arrayFindIncludes("-p", options.flags) || arrayFindIncludes("--port", options.flags) || 3000

if (port.startsWith) {
    if (port.startsWith("-p") || port.startsWith("--port")) {
        port = port.split(" ")[1];
    }
}

app.listen(port, () => {
    console.log(`  ${'Sleuth v1.1.3'.yellow}
  ${'Server started!'.green} 
  To let people connect to your server, link them here with your port-forwarded public IP address along with
  the port, which is ${port.toString().cyan}:
  ${"(like \"127.0.0.1:3000\")".grey}
  
  ${'sleuth-connect.glitch.me'.underline.blue}
  
  ${`WARNING! Sleuth is not an antivirus, and if you trust the wrong person, they can put a virus on the 
  Sleuth directory! Be cautious	about who you trust, and only open the file if you know it is safe!`.red}
  
  ${`Tip: you can change the port by adding -p or --port along with a port number 
  to the command, and you can change the limit of the maximum file size that 
  people can upload to by adding -l or --limit to the command, along with 
  a file size, such as 1mb.`.grey}`);
});
