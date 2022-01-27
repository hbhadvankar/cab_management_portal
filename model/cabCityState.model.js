var mongoose = require('mongoose');

var cabCityStateSchema = mongoose.Schema({
        cabId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'cab'
        },
        cityId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'city'
        },
        state: {
            type: String,
            required: true
        },
        idleAt: {
            type: Date,
            default: null
        }
}, {
    timestamps: true
});

module.exports = mongoose.model('cabCityState', cabCityStateSchema);