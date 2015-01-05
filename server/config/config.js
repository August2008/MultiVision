var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    dev: {
        rootPath: rootPath,
        db: 'mongodb://localhost/multivision',
        port: process.env.port || 3030,
        pretty: true
    },
    prod: {
        rootPath: rootPath,
        db: 'mongodb://David:Password1*@ds029831.mongolab.com:29831/multivision',
        port: process.env.port || 80,
        pretty: false
    }
}