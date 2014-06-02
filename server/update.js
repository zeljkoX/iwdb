var mongoose = require('mongoose'),
    LogSchema = require('./models/log.js'),
    Log = mongoose.model('Log'),
    attachMiddleware = require('attach-middleware');

function Update(operation, cb) {
    var doc = this;
    doc.log = new Log();
    doc.log.operation = operation;

    doc.obj = {};
    attachMiddleware(doc.obj, {
        runName: 'runMiddleware'
    });

    function done() {
        cb(doc.log);
        /* log.save(function(err) {
            if (err) {
                console.log(err);
            }
            cb();
        });*/
    };


    this.obj.run = function(rawDoc, fields) {
        doc.obj.runMiddleware(rawDoc, fields, doc.log, done);
    };

};

module.exports = function(operation, cb) {
    var instance = new Update(operation, cb);
    return instance.obj;
};