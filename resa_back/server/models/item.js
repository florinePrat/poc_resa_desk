const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    name: { type: String, require: true },
    serialNumber: { type: String},
});

module.exports = mongoose.model('Item', itemSchema);