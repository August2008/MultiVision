var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {
    var db = mongoose.connect(config.db).connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function() {
        console.log('connected to multivision db');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        password: String
    });

    userSchema.methods = {
      authenticate: function(password2match) {
          return hashPwd(this.salt, password2match) === this.password;
      }
    };

    var user = mongoose.model('User', userSchema);

    user.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'david');
            user.create({firstName: 'David', lastName: 'Mumladze', username: 'david', salt: salt, password: hash});
            salt = createSalt();
            hash = hashPwd(salt, 'mzia');
            user.create({firstName: 'Mzia', lastName: 'Chikviladdze', username: 'mzia', salt: salt, password: hash});
            salt = createSalt();
            hash = hashPwd(salt, 'cici');
            user.create({firstName: 'Cici', lastName: 'Chaladze', username: 'cici', salt: salt, password: hash});
        }
    });
}

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, password) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(password).digest('hex');
}