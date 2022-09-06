const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    name: { type: String, require: true },
    nb: { type: Number, default: 1, min: 0},
    serialNumber: { type: String},
});

module.exports = mongoose.model('Item', itemSchema);