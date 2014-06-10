'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Wine = mongoose.model('Wine'),
    Log = mongoose.model('Log'),
    Winery = mongoose.model('Winery');

/**
 * Populate database with sample application data
 */
var vukoje = [{
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

}];


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
},
{
    name: 'Vranac',
    vintage: 2010,
    winery: {
        name: 'Vukoje',
        country: 'BIH'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Merlot',
    vintage: 2010,
    winery: {
        name: 'Vukoje',
        country: 'BIH'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Souvignone',
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
/*Winery.find({}).remove(function() {
Winery.create(vukoje, function() {
    console.log('finished populating wineries');
});
});

setTimeout(function() {
Wine.find({}).remove(function() {   
Wine.create(wines, function() {
    console.log('finished populating wines');
});
});
}, 1000);
*/
/*setTimeout(function() {
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
}, 2000);*/


/*setTimeout(function() {
    Winery.findOne({
        name: 'Vukoje'
    }, function(err, doc) {
        console.log(doc);
    });
}, 5000);*/

