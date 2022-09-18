const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require:true },
    idDesk: { type: mongoose.Schema.Types.ObjectId, ref: 'Desk', require:true },
    date: { type: String, require:true },
});

module.exports = mongoose.model('Booking', bookingSchema);