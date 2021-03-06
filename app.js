'use strict';

var path = require('path'),
    express = require('express'),
    mongo = require('./mongo'),
    webApp = express(),
    apiApp = require('./app/api'),
    logger = require('util'),
    errorhandler = require('errorhandler');
    
mongo();

webApp.set('port', process.env.PORT || 3000);
//    webApp.use(express.static(path.resolve(__dirname, 'public')));
webApp.use(apiApp);

var env = process.env.NODE_ENV || 'development';
if ('production' == env) {
    webApp.use(errorhandler({dumpExceptions: false, showStack: false}));
}
else if ('development' == env) {
    webApp.use(errorhandler({dumpExceptions: true, showStack: true}));
}


webApp.listen(webApp.get('port'), '127.0.0.1');
logger.log("Started in " + webApp.settings.env + " on port " + webApp.get('port'));

