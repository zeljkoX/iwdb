var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    plugin = require('./plugins.js'),
    subschema = require('./subschemes.js');



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
    location: {
        city: {
            type: String
        },
        address: {
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
    wines: [subschema.ListOfWinesSchema], //listOfWinesSchema
    media: [subschema.MediaSchema],
    selling: {
        type: String
    },
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
    },
    grapes: [subschema.ShortGrapeSchema],
    pictures: [subschema.PictureSchema],
    awards: [subschema.AwardPerWineSchema],
    wineriesLocations: [subschema.LocationSchema], //definition of wineyards   WineriesLocationSchema
    rss: {
        type: String
    },
    news: [], //news related to this document TO DO
    lastModified: {
        type: Date,
        default: Date.now
    },
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
});
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
    this.save(function(err, doc) {
        if (err) {
            return cb(Error('Wine not added'));
        }
        return cb(null);
    });
};
/**
 *  Add wine to winerie
 *
 *  @param {Array} wines
 */
WinerySchema.methods.addAwards = function(awards, cb) {
    this.awards.addToSet(awards);
    this.save(function(err, doc) {
        if (err) {
            return cb(Error('Award/s not added'));
        }
        return cb(null);
    });
};

/**
 *  Add media
 *
 *  @param {Array} wines
 */
WinerySchema.methods.addAwards = function(media, cb) {
    this.media.addToSet(media);
    this.save(function(err, doc) {
        if (err) {
            return cb(Error('Media not added'));
        }
        return cb(null);
    });
};

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

WinerySchema.plugin(autoIncrement.plugin, {
    model: 'Winery',
    startAt: 0,
    incrementBy: 1,
    prepend: 7
});

/***************
 *  PLUGINS
 ***************/

/**
 * Add url field and write to it url based name
 */
WinerySchema.plugin(plugin.urlify);

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