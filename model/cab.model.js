var mongoose = require('mongoose');

var cabSchema = mongoose.Schema({
        name: {
           type: String,
           required: true
        },
        type: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        cabNumber: {
             type: String,
             required: true
        }
}, {
    timestamps: true
});





module.exports = mongoose.model('Cab', cabSchema);