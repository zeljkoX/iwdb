var mongoose = require('mongoose'),
    Document = mongoose.Document,
    LogSchema = require('./models/log.js'),
    Log = mongoose.model('Log'),
    attachMiddleware = require('attach-middleware');


function Update(operation, cb) {
    var doc = this;
    doc.log = new Log();
    doc.log.getAction = function(name){
        return new Action(name);
    };
    doc.log.operation = operation;

    doc.obj = {};
    attachMiddleware(doc.obj, {
        runName: 'runMiddleware'
    });

    function done(doc) {
        doc.emit('update');
       // cb(doc.log);
        /* log.save(function(err) {
            if (err) {
                console.log(err);
            }
            cb();
        });*/
    };


    this.obj.run = function(rawDoc) {
        doc.obj.runMiddleware(rawDoc, doc.log, done);
    };

};

   var Action = function(name){
    this.data = {
            name: '',
            success: 0,
            failure: 0,
            err: []
    };
    if(name){
        this.data.name = name;
    }
};

    Action.prototype.setName = function(name){
        if(name){
           this.data.name = name;
        }
        return this;
    };
    Action.prototype.resolve = function(number){
        if(number && Number.isInteger(number)){
            this.data.success += number;
        }
        else {
        this.data.success +=1;
        }
        return this;
    };
    Action.prototype.reject = function(err){
        this.data.failure +=1;
        if(err){
        this.data.err.push(err);
        }
        return this;
    };
    Action.prototype.getData = function(){
        return this.data;
    };

/**
* Monkey patch for is modified method
*/
Document.prototype.isModCustom = function(field){
    if(!field){
        return false;
    }
    return !!~this.modified.indexOf(field);
}

module.exports = function(operation, cb) {
    var instance = new Update(operation, cb);
    return instance.obj;
};