var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    CountrySchema = require('./country.js'),
    Country = mongoose.model('Country'),
    subschema = require('./subschemes.js'),
    plugin = require('./plugins.js'),
    autoIncrement = require('mongoose-auto-increment'),
    helper = require('../helperMethods.js'),
    update = require('../update.js')('Add region', function(log) {
        console.log(log);
        console.log('Region update fired');
    });

var Region = helper.Error('Region');


var RegionSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    country: {
        name: {
            type: String,
            required: true
        },
        _id: {
            type: String
        },
        test: {
            type: String
        }
    },
    article: {
        type: String
    },
    media: [subschema.MediaSchema],
    stats: {
        numberOfWineries: {
            type: Number,
            default: 0
        }
    }
}, {
    strict: true
});

RegionSchema.set('versionKey', false);

/***************************
 *  Methods
 ***************************/

/**
 *  Add winery to country db
 *
 *  @param {Array} wines
 */
RegionSchema.methods.addWinery = function(cb) {
    this.stats.numberOfWineries += 1;
    this.save(function(err) {
        if (err) {
            return cb(RegionError('Winery not added'));
        }
        return cb(null);
    });
};
/*
RegionSchema.methods.removeWinery = function(published, cb) {
      if(published){
            this.stats.numberOfWineries.published +=1;
        }
        else{
            this.stats.numberOfWineries.unpublished +=1;
        }
        this.save(function(err) {
            if (err) {
                return cb(RegionError('Winery not deleted'));
            }
            return cb(null);
        });
    });

};
*/

/***************************
 *  Statics
 ***************************/
RegionSchema.statics.findByName = function(name) {
    return this.find({
        name: name
    }).exec();
};


RegionSchema.pre('save', function(next) {
    var doc = this;
    if (doc.isNew) {
        if (doc.country && doc.country.name && !doc.country._id) {
            Country.findOne({
                name: doc.country.name
            }, function(err, country) {
                if (err) {
                    console.log(err);
                    return next(Error('Country not found'));
                }
                doc.country._id = country._id;
                next();
            });
        }
    } else {
        next();
    }
});

/************************
 *UPDATE definitions
 *
 ************************/

/**
 * On create
 */
update.use(function(doc, log, next) {
    if (doc.isNew) {
        statsName = doc.published ? 'published' : 'unpublished';
        var action = new log.getAction('Create new Region');

        var countryPromise = Country.findByID(doc.country._id, function(err, country) {
            if (err) {
                action.reject(err);
                return countryPromise.reject(err);
            }
            country.addRegion({
                name: doc.name,
                _id: doc._id
            }, function(err) {
                if (err) {
                    action.reject(err);
                    return countryPromise.reject(err);
                }
                action.resolve();
                countryPromise.resolve();
            });
        }).exec();


        countryPromise.addBack(function(err) {
            console.log('Add region success');
            log.actions.push(action);
            log.save();
            next();
        });
    } else {
        next();
    }
});

/**
 * On name change
 */
update.use(function(doc, log, next) {
    if (doc.isModified('name')) {
        console.log('name update not fired');
        var action = new log.getAction('Region: change name');

        var countryPromise = Country.findByID(doc.country._id).exec();

        countryPromise.then(function(country) {
            if (!country) {
                return new Error('Country not found');
            }
            region = country.region.id(doc._id);
            region.name = doc.name;
            region.save(function() {
                if (err) {
                    action.reject(err);
                    countryPromise.reject(err);
                }
                action.resolve();
                countryPromise.resolve();
            });
        });

        var winePromise = Wine.update({
            region: {
                _id: doc._id
            }
        }, {
            region: {
                name: doc.region.name
            }
        }, {
            multi: true
        }).exec();

        winePromise.then(function(err, numberAffected, raw) {
            if (err) {
                action.reject(err);
                winePromise.reject(err);
            }
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from Mongo was ', raw);
            action.resolve(numberAffected);
            winePromise.resolve();
        });

        var all = new Promise().when(countryPromise, winePromise);
        all.addBack(function(err) {
            console.log('Add region success');
            log.actions.push(action);
            log.save();
            next(doc);
        });
    } else {
        next();
    }
});

/***************
 *  PLUGINS
 ***************/

/**
 * increment _id field
 */
RegionSchema.plugin(autoIncrement.plugin, {
    model: 'Region',
    startAt: 0,
    incrementBy: 1,
    prepend: 7
});

/**
 * Add url field and write to it url based name
 */
RegionSchema.plugin(plugin.urlify);

/**
 * Add page view mehod
 */
RegionSchema.plugin(plugin.pageView);

/**
 * Add picture field an picture methods
 */
RegionSchema.plugin(plugin.picture);

/**
 * Add publish field and method
 */
RegionSchema.plugin(plugin.publish);

/**
 * Add modified field
 */
RegionSchema.plugin(plugin.modified);


module.exports = mongoose.model('Region', RegionSchema, 'region');