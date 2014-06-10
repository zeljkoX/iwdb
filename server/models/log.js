/*************************************************
 *   Used to lod errors in db for admin to handle
 *************************************************/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LogSchema = new Schema({
    operation: {
        type: String,
        required: true
    },
    actions: [{
        name: {
            type: String
        },
        success: {
            type: Number
        },
        failure: {
            type: Number
        },
        err: []
    }],
    date: {
        type: Date,
        default: Date.now
    },
    viewed: { //json object of changes
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Log', LogSchema, 'log');