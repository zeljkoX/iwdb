var subscheme = require('./subschemes.js');
urlify = require('urlify').create({
    addEToUmlauts: false,
    toLower: true,
    trim: true,
    spaces: '-'
});

/**
 * Plugin used to publish
 */
exports.publish = function(schema) {
    schema.add({
        published: Boolean,
        default: false
    });

    schema.method('publish', function(cb) {
        this.published = !this.published;
        this.save(function(err) {
            if (err) {
                return cb(Error('Publish akcija neuspjesna'));
            }
            return cb(true);
        });
    })
};

/**
 * Plugin used to convert document name to url like string
 */
exports.urlify = function(schema) {
    schema.add({
        url: String
    });
    schema.pre('save', function(next) {
        var doc = this;
        var url = urlify(doc['name']);
        doc.url = url;
        next();
    })
};

/**
 * Add review fuctionality to schema
 */
exports.review = function(schema, options) {
    schema.add({
        reviews: [subscheme.ReviewSchema],
        review: String //top review
    });
    schema.methods = {
        reviewListing: function() {
            return this.reviews;
        },
        reviewAdd: function(review, cb) {
            this.reviews.push(review);
            this.save(function(err) {
                if (err) {
                    return cb(Error('Review neuspjesno sacuvan'));
                }
                return cb(null);
            });
        },
        reviewDelete: function(rid, cb) {
            var doc = this.reviews.id(rid).remove(function(err) {
                if (err) {
                    return cb(Error('Review neuspjesno sacuvan'));
                }
                return cb(null);
            });
        },
        reviewChange: function(rid, data, cb) {
            var doc = this.reviews.id(rid);
            doc.user = data.user;
            this.save(function(err) {
                if (err) {
                    return cb(Error('Azuriranje review-a neuspjesno'));
                }
                return cb(null);
            });
        },
        reviewRate: function(review, rate) {
            //TO DO
        }
    };
};