var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    plugin = require('./plugins.js'),
    subschema = require('./subschemes.js');

var TouristSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        max: 50,
        min: 5
    },
    country: {
        type: String,
        required: true
    },
    region: {
        name: {
            type: String,
            required: true
        },
        _id: {
            type: String,
            required: true
        }
    },
    city: {
        type: String,
        required: true
    },
    tel: [],
    email: {
        type: String,
        required: true
    },
    www: {
        type: String
    },
    payment: {
        type: String
    },
    onlineBooking: {
        type: Boolean
    },
    plans: [subschema.TouristPlanSchema],
    rss: {
        type: String
    },
    article: {
        type: String
    },
    modified: {
        type: Date
    }

}, {
    strict: true
});

virtual = TouristSchema.virtual('idurl');
virtual.get(function() {
    return this._id + '/' + this.url;
});
/***************************
 *  Methods
 ***************************/
/**
 *  Method to invoke after document is updated
 *  fix dependencies
 *  @param 
 */
WinerySchema.methods.onUpdate = function(cb) {
    //name
    function name(){
         //update every field in wines

    };

};

/***************************
 *  Statics
 ***************************/
TouristSchema.statics.searchByCountry = function(name, cb) {
    this.findOne({
        country: name
    }, cb);
};

TouristSchema.statics.searchByCountryAndName = function(country, name, cb) {
    this.findOne({
        country: country,
        name: name
    }, cb);
};
TouristSchema.plugin(autoIncrement.plugin, {
    model: 'Tourist',
    prepend: 7 //TO DO maybe smaller numbuer
});

/***************
 *  PLUGINS
 ***************/
/**
 * increment _id field
 */
TouristSchema.plugin(autoIncrement.plugin, {
    model: 'Tourist',
    prepend: 7
});

TouristSchema.plugin(plugin.urlify);

/**
 * Add publish field and method
 */
TouristSchema.plugin(plugin.publish);

/**
 * Add picture field an picture methods
 */
TouristSchema.plugin(plugin.picture);

/**
 * Add page view mehod
 */
TouristSchema.plugin(plugin.pageView);

/**
 * Add addedBy field
 */
TouristSchema.plugin(plugin.addedBy);

/**
 * Add modified field
 */
TouristSchema.plugin(plugin.modified);

module.exports = mongoose.model('Tourist', TouristSchema, 'tourist');