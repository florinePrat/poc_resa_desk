const express = require('express');
const router = express.Router();

router.get('/', require("./getBookingByUserByDate"));
router.post('/', require("./createBooking"));
// router.put('/', require("./updateBooking"))
// router.delete('/', require("./deleteBooking"))

module.exports = router;