var mongoose = require('mongoose'),
    Country = mongoose.model('Country'),
    Promise = mongoose.Promise;




var promise = new Promise();
promise.onResolve(function(err, data) {
    console.log('Promise 1 resolve')
});


var another = new Promise();
another.onResolve(function(err, data) {
    console.log('Promise 2 resolve')
});

var p = new Promise();
var p2 = p.when(promise, another);

p.onResolve(function(err, data) {
    console.log('p all resolve')
});
p2.onResolve(function(err, data) {
    console.log('p2 all resolve')
});
another.fulfill();
promise.reject();





/*var promise = Country.find({}).exec();

promise.then(function(names) {
    console.log('success');
}, function(names) {
    console.log('error');
});

promise.chain(new Promise(function(err, doc) {
    console.log('second');
}));*/