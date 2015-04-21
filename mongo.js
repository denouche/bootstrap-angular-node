'use strict';

var mongoose = require('mongoose'),
    url = 'mongodb://xxxxxxxxxxxxxx',
    logger = require('util');

function mongo() {
    mongoose.connection.on('error', function (err) {
        logger.log('MongoDB error: ' + err);
        if (err) {throw err;}
    });

    mongoose.connection.once('open', function () {
        logger.log('Connected to MongoDB');
    });

    mongoose.connect(url);
}

module.exports = mongo;

