var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config) {
    app.locals.pretty = config.pretty;
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(session({secret: 'multivision', resave: true, saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: function (str, path) {
            return stylus(str).set('filename', path);
        }
    }));
    app.use(express.static(config.rootPath + '/public'));
}