const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    mail: { type: String, require: true },
    password: { type: String, require: true },
    bookingList: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    notification: { type: Boolean, default: false },
    resp: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    avatar: { type: String, require: true },
});
console.log('user model created')
module.exports = mongoose.model('User', userSchema);