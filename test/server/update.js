'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Winery = mongoose.model('Winery'),
    update = require('../../server/update.js');

var obj = update('Testiranje', function(err) {
    callback = true;
});
var count = 0,
    callback = false,
    winery;


xdescribe('Update function', function() {
    before(function(done) {
        winery = new Winery({
            name: 'Vukoje vinarija',
        });

        // Clear users before testing
        Winery.remove().exec();
        done();
    });

    afterEach(function(done) {
        Winery.remove().exec();
        done();
    });
    it('should have properties use and run', function() {
        obj.should.have.property('use');
        obj.should.have.property('runMiddleware');
        obj.should.have.property('run');
    });

    it('should add to stack function', function() {
        obj.use(function(doc, log, next) {
            count++;
            count.should.equal(1)
            next();
        });
        obj.use(function(doc, log, next) {
            count++;
            count.should.equal(2)
            next();
        });
        obj.use(function(doc, log, next) {
            count++;
            count.should.equal(3)
            next();
        });

    });

    it('shoud execute run function with parameters and execute cb', function() {
        obj.run('1', '2');
        callback.should.be.ok;
    });

    it('should create and save winery doc', function(done) {
        winery.save(done);
    });

    it('should change winery doc and execute update', function(done) {
        winery.name = 'Jovana';
        winery.isModified('name').should.be.ok;
        winery.save(function(err) {
            should.not.exists(err);
            done();
        });
    });

});