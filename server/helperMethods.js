'use strict';
var paginationSize = [25, 50, 75, 100],
    paginationDefaultSize = 25;

exports.pagination = function(req, options) {
    var query = req.query;
    var result = {};
    if (options) {
        paginationSize = options.size !== 'undefined' ? options.size : paginationSize;
        paginationDefaultSize = options.defaultSize !== 'undefined' ? options.defaultSize : paginationDefaultSize;
    }
    result.start = query.start !== 'undefined' ? query.start : 0;
    result.size = query.size !== 'undefined' && paginationSize.indexOf(query.size) === 1 ? query.size : 25;

    return result;
};

exports.filter = function(req, allowed) {
    var result = {};
    var provjera = function(name) {
        if (req.query[name] && req.query[name] !== 'undefined') {
            result[name] = req.query[name];
        }
    };
    if (Array.isArray(allowed)) {
        allowed.forEach(function(name) {
            provjera(name);
        });
        return result;
    } else if (typeof allowed === 'string') {
        provjera(allowed);
        return result;
    } else {
        return {};
    }
};

exports.getArrayId = function(arr){
    var start = arr.length + 1,
    id,
    iterate = true;
    while(iterate){
        if(arr.every(function(item){
            if(item._id != id){
                return true;
            }
            return false;
        })){
            id = start;
            iterate = false;
        }
        else{
            start++;
        }
    }
    return id;
 };