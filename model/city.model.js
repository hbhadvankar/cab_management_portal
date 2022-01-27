var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
        name: {
           type: String,
           required: true
        },
        state: {
           type: String,
           required: true
        },
        country: {
            type: String,
            required: true
        }
}, {
    timestamps: true
});





module.exports = mongoose.model('City', citySchema);