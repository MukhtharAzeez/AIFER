const mongoose = require("mongoose");

const readingSchema = new mongoose.Schema({
    time: {
        type: Number,
        required: true,
    },
    reading: {
        type: Number,
        required: true,
    },
});

const meterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    electricityReadings: {
        type: [readingSchema],
        required: true,
    }
});

module.exports = mongoose.model("meters", meterSchema)