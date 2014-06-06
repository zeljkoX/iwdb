'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Wine = mongoose.model('Wine'),
    Log = mongoose.model('Log'),
    Winery = mongoose.model('Winery');

/**
 * Populate database with sample application data
 */
var wineries = [{
    name: 'Vukoje',
    established: 1987,
    country: {
        name: 'BiH',
        republic: 'RS',
        _id: 'ddddd'
    },
    region: {
        name: 'Hercegovina',
        _id: 'hercegovina'
    }

}, {
    name: 'Zupa',
    established: 1987,
    country: {
        name: 'Serbia',
        _id: 'sdfsdf'
    },
    region: {
        name: 'Raska',
        _id: 'raska'
    }
}, {
    name: 'Rubin',
    established: 1960,
    country: {
        name: 'Serbia',
        _id: 'ddddddfsdf'
    },
    region: {
        name: 'Krusevac',
        _id: 'hercegsdfsdfovina'
    }
}, {
    name: 'Kutjevo',
    established: 1987,
    country: {
        name: 'CRO',
        _id: 'ddfgdfg'
    },
    region: {
        name: 'Slavonija',
        _id: 'slavonija'
    }
}];

var wines = [{
    name: 'Zilavka',
    vintage: 2010,
    winery: {
        name: 'Vukoje',
        country: 'BIH'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
}];
//Clear old things, then add things in

Winery.create(wineries, function() {
    console.log('finished populating wineries');
});



Wine.create(wines, function() {
    console.log('finished populating wines');
});

setTimeout(function() {
    Winery.findOne({
        name: 'Vukoje'
    }, function(err, doc) {
        console.log(err);
        doc.wines.push({
            name: 'Traminac'
        }, {
            name: 'Pinot'
        });
        doc.save(function(err) {
            console.log(err);
            console.log('saved');
            console.log(doc);
        });
    });
}, 2000);


setTimeout(function() {
    Winery.findOne({
        name: 'Vukoje'
    }, function(err, doc) {


        console.log(doc);

    });
}, 5000);


var log = new Log({
    operation: 'test'
});

log.save(function(err) {
    if (err) {
        console('Log err');
        Log.find({
            operation: 'test'
        }, function(err, log) {
            log.operation = 'zeljko';
            log.save(function(err) {
                console.log(err);
            });
        });
    }
});