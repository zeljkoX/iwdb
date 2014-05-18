var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    subschema = require('./subschemes.js'),
    urlifyPlugin = require('./plugins.js').urlify,
    autoIncrement = require('mongoose-auto-increment');


var CountrySchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    url: {
        type: String //Calculated based on name field
    },
    continent: {
        type: String
    },
    published: {
        type: Boolean
    },
    abbr: {
        type: String
    },
    wineRegions: [],
    republic: {
        type: String
    },
    article: {
        type: String
    },
    autohtoneSorte: [subschema.ShortGrapeSchema],
    media: [subschema.MediaSchema],
    wineries: [subschema.ShortWinerySchema] // how to implement, where to store grapes???
});
CountrySchema.statics.searchByName = function(name, cb) {
    this.find({
        name: name
    }, cb);
};
CountrySchema.plugin(urlifyPlugin);
module.exports = mongoose.model('Country', CountrySchema, 'countries');