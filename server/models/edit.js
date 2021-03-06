var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EditSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    explanation: {
        type: String
    },
    category: {
        type: String
    },
    date: {
        type: Date
    },
    changes: {},
    viewed: { //json object of changes
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Edit', EditSchema, 'edit');