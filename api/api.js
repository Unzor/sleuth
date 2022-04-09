class Sleuth {
    constructor(settings) {
        this.protocol = settings.protocol || "http";
        this.host = settings.host
        this.port = settings.port ? ":" + settings.port : ":3000"
    }
    send(settings) {
        var the = this;
        var fs;
        var GetFile = new FileReader();

        GetFile.onload = function() {
            fetch(the.protocol + "://" + the.host + the.port + "/sleuthfs/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    file: settings.filename + "|" + GetFile.result
                })
            })
        }
        GetFile.readAsDataURL(settings.file);
    }
}

// Example:
/*
var host = new Sleuth({
    host: "127.0.0.1"
});
host.send({
    file: document.querySelector("#file").files[0],
    filename: "file.exe"
})
*/
