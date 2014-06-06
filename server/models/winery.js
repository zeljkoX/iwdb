var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    //Region = mongoose.model('Region'),
    //Country = mongoose.model('Country'),
    autoIncrement = require('mongoose-auto-increment'),
    plugin = require('./plugins.js'),
    subschema = require('./subschemes.js'),
    helper = require('../helperMethods.js');
/*update = require('../update.js')('Update winery db', function(log) {
        console.log(log);
        console.log('Winery update fired');
    });*/

/** 
Fields edited by user
{name, established, country, region, location, contact, tourist info, description, media, details, awards, rss}
*/

/**
On change:
field: name, 
    -update every subdocument in wines field as every wine document
    -update every document for awards in awards db
    -update every document in tourist and merchant schema
    */
/**
 * Schemas definitions
 */


/**
Preposition: create after update method
check updated fields and react
*/

var WinerySchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        max: 50,
        min: 5
    },
    established: {
        type: Number,
        min: 1800 //validate: validateYear
    },
    country: {
        _id: {
            type: String
        },
        name: {
            type: String
        },
        republic: {
            type: String
        }
    },
    region: {
        name: {
            type: String
        },
        _id: {
            type: String
        }
    },
    location: {
        city: {
            type: String
        },
        address: {
            type: String
        }
    },
    contact: {
        tel: {
            type: String
        },
        email: {
            type: String
        },
        www: {
            type: String
        }
    },
    touristInfo: {
        restaurant: {
            type: Boolean,
            default: false
        },
        rooms: {
            type: Boolean,
            default: false
        },
        shop: {
            type: Boolean,
            default: false
        },
        delivery: {
            type: Boolean,
            default: false
        } //world wide delivery
    },
    description: {
        type: String
    },
    wines: [subschema.ShortWineSchema],
    media: [subschema.MediaSchema],
    details: {
        literPerYear: {
            type: Number
        },
        altitude: {
            type: Number
        },
        owner: {
            type: String
        },
        povrsina: {
            type: Number
        }
    },
    grapes: [subschema.ShortGrapeSchema],
    awards: [subschema.AwardPerWineSchema],
    wineriesLocations: [subschema.LocationSchema], //definition of wineyards   WineriesLocationSchema
    rss: {
        type: String
    },
    news: [], //news related to this document TO DO
    stats: {
        numberOfReviews: {
            type: Number,
            default: 0
        },
        pageViews: {
            type: Number,
            default: 0
        }
    }
}, {
    strict: true
});

WinerySchema.set('versionKey', false);

/***************************
 *  Methods
 ***************************/


/**
 *  Add wine to winerie
 *
 *  @param {Array} wines
 */
WinerySchema.methods.addWine = function(wines, cb) {
    this.wines.addToSet(wines);

    this.save(function(err) {
        if (err) {
            console.log(err);
            return cb(Error('Wine not added'));
        }
        return cb(null);
    });
};

/**
 *  Add media
 *
 *  @param {Array} wines
 */
WinerySchema.methods.addMedia = function(media, cb) {
    this.media.addToSet(media);
    this.save(function(err, doc) {
        if (err) {
            return cb(Error('Media not added'));
        }
        return cb(null);
    });
};
/************************
 *UPDATE definitions
 *
 ************************/


/**
 * on NAME change
 */
/*
update.use(function(doc, log, next) {
    if (doc.isModified('name')) {
        var action = {
            name: 'Update on field: name change',
            success: 0,
            failure: 0,
            err: []
        };
        doc.wines.forEach(function(wine) {
            Wine.findByID(wine._id, function(wine) {
                wine.winery.name = name;
                wine.save(function(err) {
                    if (err) {
                        action.failure += 1;
                        action.err.push({
                            _id: wine._id,
                            name: wine.name,
                            err: err
                        });
                    }
                    action.success += 1;
                });
            });
        });
        log.actions.push(action);
    }
    next();
});

/**
 * on PUBLISHED change
 */
/*update.use(function(doc, log, next) {
    if (doc.isModified('published')) {
        var action = {
            name: 'Update on publish/unpublish',
            success: 0,
            failure: 0,
            err: []
        };
        //TO DO something with wines
        var promises = [];

        /*  doc.wines.forEach(function(wine) {
                var promise = Promise();
                wine.unpublish(function(err) {
                    if (err) {
                        promise.reject(err);
                    }
                    promise.fulfill();
                });
                
                return promises.push(promise);
            });

            var winePromise = new Promise().when().apply(this, promises);


            //update region statistics
            var regionPromise = Region.findByID(doc.region._id).exec();

            regionPromise.then(function(region) {
                var prevPublished = !doc.published;
                if (prevPublished) {
                    region.stats.published -= 1;
                    region.stats.unpublished += 1;
                } else {
                    region.stats.published += 1;
                    region.stats.unpublished -= 1;
                }
                region.save(function(err) {
                    if (err) {
                        regionPromise.reject(err);
                    }
                    regionPromise.fulfill();
                });
            }); //TODO
        });

    var countryPromise = Country.findByID(doc.country._id).exec();

    var all = new Promise().when(winesPromise, regionPromise, countryPromise);*/

//update country statistics
/* log.actions.push(action);
    }
    next();
});


/**
 *  Method to remove winery and all its dependecies
 *  @param
 */
WinerySchema.methods.removeFromDb = function(cb) {

};
/***************************
 *  Statics
 ***************************/
/**
 *  Transform function used to transform document for public use
 */
if (!WinerySchema.options.toObject) WinerySchema.options.toObject = {};
WinerySchema.options.toObject.transform = function(doc, ret, options) {
    delete ret._id;
    delete ret.publish;
    delete reviews;
    delete news;

};

virtual = WinerySchema.virtual('idurl');
virtual.get(function() {
    return this._id + '/' + this.url;
});

WinerySchema.statics.searchByCountry = function(name, cb) {
    this.find({
        name: name //country.name
    }, cb);
};

WinerySchema.statics.searchByCountryAndName = function(country, name, cb) {
    this.find({
        name: country, //country.name
        name: name
    }, cb);
};



/***************
 *  PLUGINS
 ***************/

/**
 * increment _id field
 */
WinerySchema.plugin(autoIncrement.plugin, {
    model: 'Winery',
    startAt: 0,
    incrementBy: 1,
    prepend: 7
});

/**
 * Add url field and write to it url based name
 */
WinerySchema.plugin(plugin.urlify);

/**
 * Add awards field and addAwards method
 */
WinerySchema.plugin(plugin.awards);
/**
 * Add reviews and topReview fields.
 */
WinerySchema.plugin(plugin.review);

/**
 * Add publish field and method
 */
WinerySchema.plugin(plugin.publish);

/**
 * Add picture field an picture methods
 */
WinerySchema.plugin(plugin.picture);

/**
 * Add map field an map methods
 */
WinerySchema.plugin(plugin.map);

/**
 * Add notified field an notified methods
 */
WinerySchema.plugin(plugin.notify);

/**
 * Add page view mehod
 */
WinerySchema.plugin(plugin.pageView);

/**
 * Add addedBy field
 */
WinerySchema.plugin(plugin.addedBy);

/**
 * Add modified field
 */
WinerySchema.plugin(plugin.modified);

/**
 * Update middleware
 */
//WinerySchema.plugin(plugin.updateMiddleware, update);

/************************
 * Validate definitions
 ***********************/

/**
 *Validate year
 */
var validateYearFunc = function(year) {
    if (year <= new Date().getFullYear()) {
        return true;
    }
    return false;
};

var validateYear = [{
    validator: validateYearFunc,
    msg: 'Year is not set up properly'
}];


module.exports = mongoose.model('Winery', WinerySchema, 'winery');