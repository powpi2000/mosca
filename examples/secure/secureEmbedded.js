var mosca = require('../../')

var SECURE_KEY = __dirname + '/myhost.key';
var SECURE_CERT = __dirname + '/myhost.crt';
var CA_CERT = __dirname + '/ca.crt';

var settings = {
  logger: {
    name: "secureExample",
    level: 30,
  },
  secure : {
    port: 8443,
    keyPath: SECURE_KEY,
    certPath: SECURE_CERT,
    requestCert: true,
    rejectUnauthorized:true,
    caPaths:[CA_CERT],
  },
  acl:{
        write:'device/%c/#',
        read:'device/%c/#',
    },
};
var server = new mosca.Server(settings);


var authorizePublish = function (client, topic, payload, callback) {
     if(this.opts.acl && this.opts.acl.write){
        var writeAcl = this.opts.acl.write.replace('%c',client.id).replace(/\//g,'\\/').replace(/\./g,'\\.').replace('#','.*');
        var aclRx = new RegExp('^'+writeAcl);
        if(!aclRx.test(topic)){
            callback({'msg':'can not publish'}, false);
            return;
        }
     }
    callback(null, true);
}

var authorizeSubscribe = function (client, topic, callback) {
    if(this.opts.acl && this.opts.acl.read){
        var readAcl = this.opts.acl.read.replace('%c',client.id).replace(/\//g,'\\/').replace(/\./g,'\\.').replace('#','.*');
        var aclRx = new RegExp('^'+readAcl);
        if(!aclRx.test(topic)){
            callback({'msg':'can not subscribe'}, false);
            return;
        }
     }

    callback(null, true);
}


server.on('ready', setup);

function setup() {
    server.authorizePublish = authorizePublish;
    server.authorizeSubscribe = authorizeSubscribe;
    console.log('Mosca server is up and running.');
}


