/*************************************************
*   Used to lod errors in db for admin to handle
*************************************************/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ErrorSchema = new Schema({
    action: {
        type: String,
        required: true
    },
    msg: {
        type: String
    },
    err: {
        type: String
    },
    date: {
        type: Date
    },
    viewed: { //json object of changes
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Error', ErrorSchema, 'errors');