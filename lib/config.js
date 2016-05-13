var SECURE_KEY = __dirname + '/../examples/secure/myhost.key';
var SECURE_CERT = __dirname + '/../examples/secure/myhost.crt';
var CA_CERT = __dirname + '/../examples/secure//ca.crt';


module.exports = {
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
