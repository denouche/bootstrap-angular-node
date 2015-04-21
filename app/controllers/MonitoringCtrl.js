'use strict';

module.exports = function (app) {
	
    app.get('/private/monitoring/ping', function(req, res) {
        res.send(200);
    });

};
