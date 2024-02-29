const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    country: String,
    description: String,
    cost: Number,
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
