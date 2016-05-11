var mosca = require('../../');

module.exports = {
  id: 'mymosca', // used to publish in the $SYS/<id> topicspace
  stats: false, // publish stats in the $SYS/<id> topicspace
  logger: {
    level: 'debug'
  },
  backend: {
    type: 'mongodb',
    url: "mongodb://192.168.99.100:27017/mosca"
  },
  persistence: {
    factory: mosca.persistence.Mongo,
    url: "mongodb://localhost:27017/mosca"
  }
};
