var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProblemSchema = new Schema({
    user: {
        _id: {
            type: String
        },
        name: {
            type: String
        }
    }, //    user id and name
    explanation: {
        type: String
    },
    page: {
        type: String
    },
    date: {
        type: Date
    },
    viewed: { //viwed by admin
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Problem', ProblemSchema, 'problem');