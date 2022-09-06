const express = require('express');
const router = express.Router();

router.use('/booking', require("./bookings"));
router.use('/desk', require("./desks"));
router.use('/item', require("./items"));
router.use('/user', require("./users"));

module.exports =  router;