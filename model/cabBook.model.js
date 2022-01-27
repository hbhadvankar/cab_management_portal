var mongoose = require('mongoose');

var cabBookSchema = mongoose.Schema({
        cabId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cab'
        },
        status: {
            type: String,
            required: true
        },
        srcCity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'city',
            default: null
        },
        destCity: {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'city',
             default: null
        },
        bookingTime: {
            type: Date,
            default: null
        }
}, {
    timestamps: true
});





module.exports = mongoose.model('cabBook', cabBookSchema);