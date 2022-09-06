const express = require('express');
const router = express.Router();

router.post('/login', require('./login'));
router.post('/signup', require('./signup'));
router.post('/forgetPassword', require('./forgetPassword'));

module.exports = router;