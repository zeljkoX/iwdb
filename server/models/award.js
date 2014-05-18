var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    urlifyPlugin = require('./plugins.js').urlify,
    subschema = require('./subschemes.js');

var AwardSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        max: 50,
        min: 3
    },
    url: {
        type: String //Calculated based on name field
    },
    published: {
        type: Boolean
    },
    prizes: [subschema.AwardPrizeSchema], //fields: [name, descriptio, picture, rank]
    years: [], //year schema
    location: {
        type: String
    },
    article: {
        type: String
    },
    region: [subschema.locationSchema], //fields: [{name, id}]
    profil: {
        type: String
    },
    picture: {
        type: String
    },
    rss: {
        type: String
    }
});

AwardSchema.statics.searchByName = function(name, cb) {
    this.findOne({
        name: id
    }, cb)
};

AwardSchema.statics.searchByNameAndYear = function(name, year, cb) {
    this.findOne({
        name: id
    }, function(err, result) {
        if (err) {
            return;
        }
        return cb(false, result.years.id(year));
    });

};
AwardSchema.methods = {
    filterYear: function(year) {
        return this.years.id(year);
    }
};

AwardSchema.plugin(autoIncrement.plugin, {
    model: 'Award',
    prepend: 7
});
AwardSchema.plugin(urlifyPlugin);
module.exports = mongoose.model('Award', AwardSchema, 'awards');