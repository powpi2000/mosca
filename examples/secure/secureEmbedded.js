var mosca = require('../../')

var SECURE_KEY = __dirname + '/../../../myhost.key';
var SECURE_CERT = __dirname + '/../../../myhost.crt';
var CA_CERT = __dirname + '/../../../ca.crt';


var settings = {
  logger: {
    name: "secureExample",
    level: 20,
  },
  secure : {
    port: 8443,
    keyPath: SECURE_KEY,
    certPath: SECURE_CERT,
    requestCert: true,
  },
  acl:{
        write:'device/%c/#',
        read:'device/%c/#',
    },
};
var server = new mosca.Server(settings);
server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca secure server is up and running')
}
