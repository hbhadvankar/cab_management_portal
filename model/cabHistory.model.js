var mongoose = require('mongoose');

var cabHistorySchema = mongoose.Schema({
        cabId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cab'
        },
        state: {
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
        startTime: {
            type: Date
        },
        endTime: {
             type: Date
        },
        active: {
            type: Boolean,
            default: true
        }
}, {
    timestamps: true
});

module.exports = mongoose.model('CabHistory', cabHistorySchema);