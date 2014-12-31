var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser')
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: function(str, path) {
        return stylus(str).set('filename', path);
    }
}));
app.use(express.static(__dirname + '/public'));

var db;
if (env === 'dev') {
    db = mongoose.connect('mongodb://localhost/multivision').connection;
}
else {
    db = mongoose.connect('mongodb://David:Password1*@ds029831.mongolab.com:29831/multivision').connection;
}
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function() {
    console.log('connected to multivision');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
    mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
    res.render('index', { mongoMessage: mongoMessage});
});

var port = process.env.PORT || 3030;
app.listen(port);

console.log('Listening on port ' + port);