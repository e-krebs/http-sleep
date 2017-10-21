# http-sleep (windows only)
## introduction

> **Important:** this a *personal project* and has only been tested on a single Windows 10 PC as far as I know.

However, this is a very simple node.js app.

It's only purpose is to create a Windows service that listens for a specific http request, *by default* on port **3101**, with an url parameter *secret=azertyuiop*.

When that request is received, the node server (*server.js*) will put the PC into suspended state (depending on Windows default : sleep (*default*) or hibernate).

## content
There are only 3 files, here:
* server.js - node server that listens to the correct request and put the PC into suspended state
* install.js - node app to install the node server as a windows service
* uninstall.js - node app to uninstall the service

## settings
You can change both default port and secret value.

You can even change the command that is called, if you want.

To do so, edit **server.js** before installing and change the settings object:
```javascript
const settings = {
  port: 3101, // the port the server listens to
  secret: 'azertyuiop', // the secret the request must contain
  command: 'rundll32.exe PowrProf.dll,SetSuspendState' // the command the server will execute (windows sleep mode)
};
```

## install
```shell
node .\service.js
```

and it's installed!

To call it, just send a request to your PC like :

> http://<your_pc_ip>:3101?request=azertyuiop

## troubleshooting
If your request is ok, you'll receive a *'ok'* message along with a 200 status.

If not, you'll receive either a *'bad request'* message with a 400 status (if your secret is wrong) or a *'not found'* message with a 404 status (if no secret is provided).

If you notice after some time that the service is not running anymore, just [uninstall](#uninstall) it then re-[install](#install) it.

## uninstall
To uninstall, just run 
```shell
node .\service.js
```
you should see the following output:
```shell
Uninstall complete.
The service exists:  false
```