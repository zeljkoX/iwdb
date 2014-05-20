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
        type: Number
    },
    country: {}, // {name , republic}
    contact: {}, // {tel:[], email, www}
    touristInfo: {}, //{restaurant, hotel}
    location: {}, // street adress, city
    description: {
        type: String
    },
    profil: {
        type: String
    }, //picture
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
    notified: {
        type: Boolean
    }, //email nootification to winery
    grapes: [subschema.ShortGrapeSchema],
    pictures: [subschema.PictureSchema],
    awards: [subschema.AwardPerWineSchema],
    wineriesLocations: [subschema.LocationSchema], //definition of wineyards   WineriesLocationSchema
    rss: {
        type: String
    },
    map: {},
    news: [], //news related to this document TO DO
    lastModified: {
        type: Date,
        default: Date.now
    }
});

/**
 *  Transform function used to transform document for public use
 */
if (!WinerySchema.options.toObject) WinerySchema.options.toObject = {};
WinerySchema.options.toObject.transform = function(doc, ret, options) {
    delete ret._id;
    delete ret.publish;
    delete reviews;
    delete news;

}


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


module.exports = mongoose.model('Winery', WinerySchema, 'winery');