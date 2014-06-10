var mongoose = require('mongoose'),
	Wine = mongoose.model('Wine'),
	Winery = mongoose.model('Winery'),
	Country = mongoose.model('Country'),
	Region = mongoose.model('Region'),
	Tourist = mongoose.model('Tourist'),
	Offer = mongoose.model('Offer'),
	Merchant = mongoose.model('Wine'),
	wineries = require('./populate/winery.js'),
	wines = require('./populate/wine.js'),
	countries = require('./populate/country.js'),
	regions = require('./populate/region.js'),
	tourists = require('./populate/tourist.js'),
	offers = require('./populate/tourist-offer.js'),
	merchants = require('./populate/merchant.js');

	exports.removeAll = function(){
		Country.remove().exec();
		Region.remove().exec();
		Winery.remove().exec();
		Wine.remove().exec();
		Merchant.remove().exec();
		Offer.remove().exec();
		Tourist.remove().exec();
	};

	exports.populateWine = function(done){
		Wine.remove().exec();
		Wine.create(wines, function() {
    	console.log('finished populating wines');
    	done();
		});
	};

	exports.populateWinery = function(done){
		Winery.remove().exec();
		Winery.create(wineries, function() {
    	console.log('finished populating wineries');
    	done();
		});
	};

	exports.populateCountry = function(done){
		Country.remove().exec();
		Country.create(countries, function(err) {
			if(err){
				console.log(err);
			}
    	console.log('finished populating countries');
    	done();
		});
	};

	exports.populateRegion = function(done){
		Region.remove().exec();
		Region.create(regions, function(err) {
			if(err){
				console.log(err);
			}
    	console.log('finished populating regions');
    	done();
		});
	};

	exports.populateTourist = function(done){
		Tourist.remove().exec();
		Tourist.create(tourists, function() {
    	console.log('finished populating tourists');
    	done();
		});
	};

	exports.populateOffer = function(done){
		Offer.remove().exec();
		Offer.create(offers, function() {
    	console.log('finished populating tourist offers');
    	done();
		});
	};

	exports.populateMerchant = function(done){
		Merchant.remove().exec();
		Merchant.create(merchants, function() {
    	console.log('finished populating merchants');
    	done();
		});
	};