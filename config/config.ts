var config = {
	port:3000,
    apiUrl: 'http://localhost:3000/',
    mongo: {
        hostname: 'localhost',
        port: '27017',
        db: 'ecomm'
    },
    // filePath:'/home/am-13/Devlopement/Node/bank-reconsile-api/public/',
    // secret: "My Super Secret KeyGbt3fC79ZmMEFUFJ",
}
config.mongo.url = 'mongodb://' + config.mongo.hostname + ':' + config.mongo.port + '/' + config.mongo.db;

module.exports = config;