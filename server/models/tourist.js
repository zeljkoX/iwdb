var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    urlifyPlugin = require('./plugins.js').urlify,
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
        type: String
    },
    city: {
        type: String
    },
    tel: [],
    email: {
        type: String
    },
    www: {
        type: String
    },
    plans: [subschema.TouristPlanSchema],
    rss: {
        type: String
    },
    map: {},
    reviews: [subschema.ReviewSchema],
    rating: [subschema.RatingSchema], //score. number of votes
    article: {
        type: String
    },
    created: {
        type: Date
    },
    modified: {
        type: Date
    }

});

virtual = TouristSchema.virtual('idurl');
virtual.get(function() {
    return this._id + '/' + this.url;
});

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
TouristSchema.plugin(urlifyPlugin);
module.exports = mongoose.model('Tourist', TouristSchema, 'tourist');