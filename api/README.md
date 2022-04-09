# Sleuth API
The Sleuth API to connect to another computer and upload a file.

# Example
```js
var host = new Sleuth({
    host: "127.0.0.1"
});
host.send({
    file: document.getElementById("file_input").files[0],
    filename: "file.txt"
})
```
# Documentation
## `new Sleuth(options)` - Constructor
- Options
    - protocol (string): Protocol for connecting to computer, such as "http" and "https". (Optional, defaults to "http").
    - host (string): IP address/host of computer/website, such as "127.0.0.1". (Required)
    - port (integer/string) Port of the Sleuth server, such as 3000. (Optional, defaults to 3000).
## `sleuth.send(options)` - Function
- Options
    - filename (string): Name of the file to upload, such as "file.txt". (Required)
    - file (file): File to upload. Example is: `document.getElementById("fileupload").files[0]`. (Required)
