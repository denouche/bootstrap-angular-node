'use strict';

var express = require('express'),
    apiApp = express(),
    requireDir = require('require-dir'),
    logger = require('util'),
    bodyParser = require('body-parser'),
    User = require(__dirname + '/models/User');

apiApp.use(bodyParser.json());
apiApp.all('/api/*', function (req, res, next) {
    User.findOne({name: req.get('X-FORWARDED-USER')}, function (err, user) {
        if(err) { return next(err); }
        else if (!user) {
            var error = new Error("User not found [" + req.get('X-FORWARDED-USER') + "]");
            error.status = 100;
            logger.log(req.method + ' ' + req.url);
            return next(error);
        }
        req.loggedUser = user;
        logger.log('[' + req.loggedUser.name + '] ' + req.method + ' ' + req.url);
        next();
    });
});

apiApp.all('/private/*', function (req, res, next) {
    logger.log(req.method + ' ' + req.url);
    next();
});

apiApp.use(function(err, req, res, next) {
    logger.error(err.status);
    logger.error(err.stack);
    switch(err.status) {
        case 100:
            res.send(400);
            break;
        default:
            res.send(500);
            break;
    }
});

var controllers = requireDir(__dirname + '/controllers', {recurse: true});

for(var controller in controllers) {
    controllers[controller](apiApp);
}

module.exports = apiApp;
