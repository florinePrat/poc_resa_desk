const mongoose = require("mongoose");

const deskSchema = mongoose.Schema({
    name: { type: String, require: true },
    location: { 
        department: { type: String },
        room: { type: Number },
        number: { type: String },
    },
    itemList: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        nb: { type: Number },
    }],
});

module.exports = mongoose.model('Desk', deskSchema);