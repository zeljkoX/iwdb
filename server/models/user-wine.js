var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    subschema = require('./subschemes.js'),
    helper = require('../helperMethods.js');

var UserError = helper.Error('User');

var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reviews: {
        reviews: [subschema.UserReviewSchema],
        liked: [subschema.LikedReviewsSchema]
    },
    rating: [subschema.UserRatingSchema],
    favourites: [subschema.ShortWineSchema], //user favourite wines     ShortWineSchema
    recently: [subschema.ShortWineSchema], //recently viewed wines
    banned: {
        type: Boolean,
        default: false
    },
    merchant: {
        type: Boolean,
        default: false
    },
    merchantInfo: {
        _id: {
            type: String
        },
        name: {
            type: String
        }
    }, //user created merchant
    tourist: {
        type: Boolean,
        default: false
    },
    touristInfo: {
        _id: {
            type: String
        },
        name: {
            type: String
        }
    }, // user created tourist
    addedItems: [subschema.PageMiniSchema] //TODO item added by user

});

UserSchema.set('versionKey', false);

/***************************
 *  Methods
 ***************************/

/**
 *  Add rating entry to user db
 *
 *  @param {Object} rating
 *  @param {Function} cb
 */
UserSchema.methods.addRating = function(rating, cb) {
    this.rating.push(rating);
    this.save(function(err, doc) {
        if (err) {
            return cb(UserError('Rating not added'));
        }
        return cb(null);
    });
};
/**
 *  Delete rating
 *
 *  @param {rid} String
 *  @param {Function} cb
 */
UserSchema.methods.removeRating = function(rid, cb) {
    var doc = this;
    doc.rating.id(rid).remove(function(err) {
        if (err) {
            return cb(UserError('Rating not removed'));
        }
        doc.save(function(err, doc) {
            if (err) {
                return cb(UserError('Rating not removed'));
            }
            return cb(null);
        });
    });

};
/**
 *  Add review to user db
 *
 *  @param {Object} review
 *  @param {Function} cb
 */
UserSchema.methods.addReview = function(review, cb) {
    this.reviews.reviews.push(review);
    this.save(function(err, doc) {
        if (err) {
            console.log(err);
            return cb(UserError('Review not added'));
        }
        return cb(null);
    });
};
/**
 *  Remove review from user db
 *
 *  @param {String} rid
 *  @param {Function} cb
 */
UserSchema.methods.removeReview = function(rid, cb) {
    var doc = this;
    doc.reviews.reviews.id(rid).remove(function(err) {
        if (err) {
            return cb(UserError('Review not removed'));
        }
    });
    doc.save(function(err, doc) {
        if (err) {
            return cb(UserError('Review not removed'));
        }
        return cb(null);
    });

};

/**
 *  Add review to user db
 *
 *  @param {Object} review
 *  @param {Function} cb
 */
UserSchema.methods.addLikedReview = function(review, cb) {
    this.reviews.liked.push(review);
    this.save(function(err, doc) {
        if (err) {
            console.log(err);
            return cb(UserError('Review not added'));
        }
        return cb(null);
    });
};
/**
 *  Remove review from user db
 *
 *  @param {String} rid
 *  @param {Function} cb
 */
UserSchema.methods.removeLikedReview = function(rid, cb) {
    var doc = this;
    doc.reviews.liked.id(rid).remove(function(err) {
        if (err) {
            return cb(UserError('Review not removed'));
        }
    });
    doc.save(function(err, doc) {
        if (err) {
            return cb(UserError('Review not removed'));
        }
        return cb(null);
    });

};

/**
 *  Add favourite
 *
 *  @param {Object} wines
 *  @param {Function} cb
 */
UserSchema.methods.addFavourite = function(wine, cb) {
    this.favourites.push(wine);
    this.save(function(err) {
        if (err) {
            return cb(UserError('Wine not added to favourites'));
        }
        return cb(null);
    });
};
/**
 *  Delete favourite
 *
 *  @param {String} id
 *  @param {Function} cb
 */
UserSchema.methods.removeFavourite = function(id, cb) {
    var doc = this;
    doc.favourites.id(id).remove(function(err) {
        if (err) {
            return cb(UserError('Favourite not removed'));
        }
        doc.save(function(err, doc) {
            if (err) {
                return cb(UserError('Favourite not removed'));
            }
            return cb(null);
        });
    });
};

/**
 *  Add to history
 *
 *  @param {Oblect} page
 *  @param {Function} cb
 */
UserSchema.methods.addToHistory = function(page, cb) {
    this.recently.push(page);
    this.save(function(err, doc) {
        if (err) {
            return cb(UserError('Page not added'));
        }
        return cb(null);
    });
};


/**
 *  Add Merchant
 *
 *  @param {Object} Merchant
 *  @param {Function} cb
 */
UserSchema.methods.addMerchant = function(wines, cb) {

};

/**
 *  Add wine to winerie
 *
 *  @param {Array} wines
 *  @param {Function} cb
 */
UserSchema.methods.removeMerchant = function(wines, cb) {

};

/**
 *  Add wine to winerie
 *
 *  @param {Array} wines
 *  @param {Function} cb
 */
UserSchema.methods.addTourist = function(wines, cb) {

};

/**
 *  Add wine to winerie
 *
 *  @param {Array} wines
 *  @param {Function} cb
 */
UserSchema.methods.addTourist = function(wines, cb) {

};

module.exports = mongoose.model('Account', UserSchema, 'accounts');