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

exports.getArrayId = function(arr) {
    var start = arr.length + 1,
        id,
        iterate = true;
    while (iterate) {
        if (arr.every(function(item) {
            if (item._id != id) {
                return true;
            }
            return false;
        })) {
            id = start;
            iterate = false;
        } else {
            start++;
        }
    }
    return id;
};

exports.isObject = function(obj) {
    return obj === Object(obj);
};

exports.isArray = process.nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
};

exports.Error = function(domain) {
    return function(message) {
        return Error(domain + ':' + message);
    };
};

function update(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function(source) {
        Object.getOwnPropertyNames(source).forEach(function(propName) {
            Object.defineProperty(target, propName,
                Object.getOwnPropertyDescriptor(source, propName));
        });
    });
    return target;
};

exports.clone = function(obj) {
    var copy = Object.create(Object.getPrototypeOf(obj));
    update(copy, obj);
    return copy;
};