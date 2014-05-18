var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    subschema = require('./subschemes.js');

var TouristSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    published: {
        type: Boolean
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
    profil: {
        type: String
    },
    rss: {
        type: String
    },
    map: {},
    review: [],
    rating: {}, //score. number of votes
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
    prefix: 't',
    prepend: 7
});
module.exports = mongoose.model('Tourist', TouristSchema, 'tourist');