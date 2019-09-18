var mongoose = require('../services/dbconnect');

var distanceSchema = new mongoose.Schema({
    distance: mongoose.Schema.Types.Decimal128,
    created: {
        type: Date,
        default: Date.now
    }
});

var Distances = mongoose.model('distances', distanceSchema);

module.exports = Distances;