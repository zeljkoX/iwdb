var urlify = require('urlify').create({
    addEToUmlauts: false,
    toLower: true,
    trim: true,
    spaces: '-'
});



/**
 * Plugin used to convert document name to url like string
 */
exports.urlify = function(schema) {
    schema.pre('save', function(next) {
        var doc = this;
        var url = urlify(doc['name']);
        doc.url = url;
        next();
    })
};