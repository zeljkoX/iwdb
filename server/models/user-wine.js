var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    subschema = require('./subschemes.js');

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
    id: {
        type: String
    },
    reviews: [subschema.UserReviewSchema],
    rating: [subschema.UserRatingSchema],
    favourites: [subschema.ShortWineSchema], //user favourite wines     ShortWineSchema
    banned: {
        type: Boolean
    },
    merchant: {
        type: Boolean,
        default: false
    },
    merhantId: {
        type: String
    }, //user created merchant
    tourist: {
        type: Boolean,
        default: false
    },
    touristId: {
        type: String
    }, // user created tourist

});

module.exports = mongoose.model('Account', UserSchema, 'accounts');