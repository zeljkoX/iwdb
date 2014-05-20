var subscheme = require('./subschemes.js');
var User = require('./user-wine.js');
var helpers = require('../helperMethods.js');
var first;
var sortedReviews = function() {
    if (review != this.review) {
        first = this.reviews.sort(function(one, two) {
            return two.plus - one.plus;
        });
        if (first !== this.review) {
            this.review = first;
        }
    };
};

/**
 *  Plugin to populate url field
 */
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

    schema.methods.publish = function(cb) {
        this.published = !this.published;
        this.save(function(err) {
            if (err) {
                return cb(Error('Publish akcija neuspjesna'));
            }
            return cb(true);
        });
    }
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
        review: {
            type: String
        } //top review
    });

    schema.methods.reviewListing = function() {
        return this.reviews;
    };
    schema.methods.reviewAdd = function(userId, pageId, review, cb) {
        //TODO implement this cheking
        /*  var user = User.findById(userId, function(err, user){
             if (err){
                cb(Error('User not found'));
            }
            var alreadyPosted = user.reviews.reviews.every(function(item){
                if (item.pid != pageId){
                    return true;
                }
                return false;
            });
            if(alreadyPosted){
                return cb(Error('User already posted a review'))
            }
        });*/
        //TO DO check if user already reviewed
        if (!this.reviews.length) {
            this.review = review;
        }
        this.reviews.push(review);
        this.stats.numberOfReviews += 1;
        this.save(function(err) {
            if (err) {
                return cb(Error('Review neuspjesno sacuvan'));
            }
            return cb(null);
        });
    };
    schema.methods.reviewDelete = function(rid, cb) {
        var review = this.reviews.id(rid);
        review.remove();
        //update statistics
        this.stats.numberOfReviews -= 1;
        if (review == this.review) {
            this.review = '';
        }
        this.save(function(err) {
            if (err) {
                return cb(Error('Review neuspjesno obrisane'));
            }
            return cb(null);
        });
    };
    schema.methods.reviewChange = function(rid, data, cb) {
        var doc = this.reviews.id(rid);
        doc.user = data.user;
        this.save(function(err) {
            if (err) {
                return cb(Error('Azuriranje review-a neuspjesno'));
            }
            return cb(null);
        });
    };
    schema.methods.reviewRate = function(userId, rid, rate, cb) {

        var doc = this;
        //Check user

        /*
        var user = User.findById(userId, function(err, user){
            if (err){
                cb(Error('User not found'));
            }
            var userRanked = user.reviews.liked.every(function(item){
                if(item.rid =! rid){
                    return true;
                }
                else {
                    return false;
                }
            });
            if(userRanked){
                //TODO rewrite rank
                return cb(Error('User already rated'))
            }
            user.reviews.liked.push({
                rid: rid,
                pid: req.params.id,
                like: rate
            });
            user.save();

            
        });*/

        //Write to page
        var review = doc.reviews.id(rid);
        if (rate == 1) {
            review.plus += 1;
        }
        if (rate == -1) {
            review.minus += 1;
        }
        //sort reviews
        doc.reviews.sort(function(first, second) {
            if ((first.plus - first.minus) > (second.plus - second.minus)) {
                return 1;
            }
            return -1;
        });
        //set parent review fild
        if (doc.review != doc.reviews[0]) {
            doc.review = doc.reviews[0];
        }
        //sace document
        doc.save(function(err, doc) {
            if (err) {
                return cb(Error('Rating not succeded'));
            }
            return cb(null);
        });
    };
};


/**
 * Add picture fuctionality to schema
 */
exports.picture = function(schema, options) {
    schema.add({
        picture: {
            type: String //default picture
        },
        pictures: [subscheme.PictureSchema]
    });


    schema.methods.pictureAdd = function(picture, cb) {
        picture._id = helpers.getArrayId(this.pictures);
        this.pictures.push(picture);
        this.save(function(err) {
            if (err) {
                return cb(Error('Slika neuspjesno sacuvan'));
            }
            return cb(null);
        });
    };
    schema.methods.pictureDelete = function(pid, cb) {
        var isDefault;
        isDefault = (pid == this.picture);

        this.pictures.id(pid).remove(function(err) {
            if (err) {
                return cb(Error('Slika neuspjesno sacuvan'));
            }
            if (isDefault) {
                this.picture = '';
            }
            return cb(null);
        });
    };
    schema.methods.pictureDefault = function(pid, cb) {
        var picture = this.pictures.id(pid);
        var index;
        if (index = this.pictures.indexOf(picture) !== undefined) {
            this.pictures.push(this.picture);
            this.picture = picture;
        }
        this.save(function(err) {
            if (err) {
                return cb(Error('Azuriranje slike neuspjesno'));
            }
            return cb(null);
        });
    };

};

/**
 * Add map fuctionality to schema
 */
exports.map = function(schema, options) {
    schema.add({
        map: {
            type: [],
            index: '2d'
        }
    });
    schema.method('mapAdd', function(lat, lon) {
        if (!this.hasOwnProperty('map')) {
            this.map = [];
        }
        this.map = [lat, lon];
    });
};

exports.notify = function(schema, options) {
    schema.add({
        notified: {
            type: Boolean,
            dafault: false
        }
    });
    schema.method('notify', function() {
        this.notified = true;
        this.save();
    });
};

exports.pageView = function(schema, options) {
    schema.method('pageView', function() {
        this.stats.pageViews += 1;
        this.save();
    });
};