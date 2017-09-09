const service = require('node-windows').Service;

const svc = new service({
  name:'http-sleep',
  description: 'Put PC to sleep through an http call.',
  script: './server.js'
});

svc.on('install',function(){
  svc.start();
});

svc.install();
