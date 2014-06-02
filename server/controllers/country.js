var mongoose = require('mongoose'),
	Country = mongoose.model('Country'),
    events = require('events'),
    event = new events.EventEmitter();










/*********************
*   Respond to events
*
*********************/

event.on('region:add', function(merchant){
    Country.findById(region.country._id, function(err, country){
        if (err){
            //implement adding to db errors
        }
        country.addRegion(region, function(err){
          if (err){
            //implement adding to db errors
        }  
        });
    });
});

event.on('region:remove', function(merchant){
    Country.findById(region.country._id, function(err, country){
        if (err){
            //implement adding to db errors
        }
        country.removeRegion(region, function(err){
          if (err){
            //implement adding to db errors
        }  
        });
    });
});

event.on('winery:add', function(winery){
    Country.findById(winery.country._id, function(err, country){
        if (err){
            //implement adding to db errors
        }
        country.addWinery(winery, function(err){
          if (err){
            //implement adding to db errors
        }  
        });
    });
});

event.on('winery:remove', function(winery){
    Country.findById(winery.country._id, function(err, country){
        if (err){
            //implement adding to db errors
        }
        country.removeWinery(winery, function(err){
          if (err){
            //implement adding to db errors
        }  
        });
    });
});

event.on('tourist:add', function(tourist){
    Country.findById(tourist.country._id, function(err, country){
        if (err){
            //implement adding to db errors
        }
        country.addTourist(tourist, function(err){
          if (err){
            //implement adding to db errors
        }  
        });
    });
});

event.on('tourist:remove', function(tourist){
    Country.findById(tourist.country._id, function(err, country){
        if (err){
            //implement adding to db errors
        }
        country.removeTourist(tourist, function(err){
          if (err){
            //implement adding to db errors
        }  
        });
    });
});


event.on('merchant:add', function(merchant){
    Country.findById(merchant.country._id, function(err, country){
        if (err){
            //implement adding to db errors
        }
        country.addMerchant(merchant, function(err){
          if (err){
            //implement adding to db errors
        }  
        });
    });
});

event.on('merchant:remove', function(merchant){
    Country.findById(merchant.country._id, function(err, country){
        if (err){
            //implement adding to db errors
        }
        country.removeMerchant(merchant, function(err){
          if (err){
            //implement adding to db errors
        }  
        });
    });
});