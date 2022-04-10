<p align="center">
<img src="sleuth_logo.png" width="700" />
  <br>
  A project that lets you upload files to a computer using only IP addresses/websites.
  </p>

# How to set up server
You can download the Sleuth installer from the releases, add "C:\Program Files\sleuth" to your PATH and run "sleuth" in an administrative terminal, but you can also build it, here is how:
```
git clone https://github.com/Unzor/sleuth
cd sleuth
npm i
node server
```

# How to connect
You can either:
- Use the GUI (Visit https://sleuth-connect.glitch.me to connect to a Sleuth server. (Make sure to add port 3000 if it is a port-forwarded public IP address))
- Use the JavaScript [Sleuth API](https://github.com/Unzor/sleuth/tree/main/api)
