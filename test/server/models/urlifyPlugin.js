'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Winery = mongoose.model('Winery');

var winery;


describe('Urlify plugin', function() {
    before(function(done) {
        winery = new Winery({
            name: 'Vukoje vinarija',
            published: false
        });

        // Clear users before testing
        Winery.remove().exec();
        done();
    });

    afterEach(function(done) {
        Winery.remove().exec();
        done();
    });

    it('creating winery model', function(done) {
        winery.save(done);
    });
    it('shoud have url field', function(done) {
        winery.should.have.property('url');
        done();
    });

    it('should set up url field properlu', function(done) {
        winery.url.should.eql('vukoje-vinarija');
        done();
    });
});