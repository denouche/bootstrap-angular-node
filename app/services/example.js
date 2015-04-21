var q = require('q');

function func1 () {
    var deferred = q.defer();
    deferred.resolve();
    return deferred.promise;
}

function func2 () {
    var deferred = q.defer();
    deferred.resolve();
    return deferred.promise;
}

exports.func1 = func1;
exports.func2 = func2;

