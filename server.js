const express = require("express");
const cmd = require('node-cmd');
const app = express();
const port = 'port';

const settings = {
  port: 3101,
  secret: 'azertyuiop',
  command: 'rundll32.exe PowrProf.dll,SetSuspendState'
};


app.set(port, process.env.PORT || settings.port);
app.get('/', function (req, res) {
  if (typeof (req.query.secret) === typeof (undefined)) {
    res.status(404).send('not found');
    return;
  }
  if (req.query.secret !== settings.secret) {
    res.status(400).send('bad request');
    return;
  }
  res.status(200).send('ok');
  cmd.run(settings.command);
});
app.listen(app.get(port));
